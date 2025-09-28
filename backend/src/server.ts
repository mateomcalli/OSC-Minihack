import cors from 'cors';
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import express, { Express, Request, Response } from 'express';
import User from './mongo/User.ts';
import Session from './mongo/Session.ts';
import Transaction from './mongo/Transaction.ts';
import mongoose from 'mongoose';
import { testCustomer, testFundingSource, testCustomer1, testFundingSource1 } from './test.ts';
import {CustomerData} from './types/types.ts'
import dwollaService from './services/dwollaService.ts'

const app: Express = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

app.use(express.json());
app.use(cookieParser())

const port = 3000;
const url = process.env.MONGO_URI

const getMongoUri = ():string => {
  if (url) return url;
  else return "null"
}

mongoose.connect(getMongoUri())
  .then(() => console.log('Connected to MongoDB!'))
  .catch(error => console.log('Error connecting to MongoDB:', error.message))

app.post('/api/transaction', async (req: Request, res: Response) => {
  const userId = req.cookies.session;
  const collaborators = req.body.collaborators;
  const amountPaid = req.body.amountPaid;
  const transactionName = req.body.paymentName;

  for(let i = 0; i < collaborators.length; i++) {

    let userAmount = amountPaid / collaborators.length;
    const match = await User.findOne({ email: collaborators[i]});

    let otherId = "";
    if (match)
      otherId = match.userId;
    else
      otherId = "null"
    console.log(`Creating transaction with ${otherId} and ${userId}}`)
    const transactionId = await dwollaService.initiateTransaction(userId, otherId, userAmount.toFixed(2));
    if (transactionId)
      await Transaction.create({
        name: transactionName,
        transactionId: transactionId,
        collaborators: collaborators.join(','),
        amount: amountPaid.toFixed(2)
      });
  }
  return res.status(201);
});

app.get('/api/auth', async (req: Request, res: Response) => {
  try {
    const sessionCookie = req.cookies.session
    const match = await Session.findOne({ sessionId : sessionCookie })
    if (!sessionCookie || !match) {
      return res.status(401).json({ error: 'invalid session, login again' })
    }
    console.log(`authorized with id: ${sessionCookie}`)
    res.json({ message: "authorized with id: `${sessionCookie}`"})
  } catch (error) {
    console.error(error)
  }
})

app.get('/api/transactions', async (req: Request, res: Response) => {
  const userId = req.cookies.session;
  const transactions = await dwollaService.getCustomerTransfers(userId);
  let transactionIds= [];
  if (transactions) {
    for (let i = 0; i < transactions.length; i++) {
      let match = await Transaction.findOne({ transactionId: transactions[i].id });
      if (match)
        transactionIds.push({name: match.name, collaborators: match.collaborators, amount: match.amount});
    }
    return res.status(200).json(transactionIds);
  }
  return res.status(404);
});

app.post('api/create-transaction', async (req: Request, res: Response) => {
  const userId = req.cookies.sessionId;

});

app.post('/api/signup', async (req: Request, res: Response) => {

  const customerData:CustomerData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    type: req.body.type,
    address1: req.body.address1,
    city: req.body.city,
    state: req.body.state,
    postalCode: req.body.postalCode,
    dateOfBirth: req.body.dateOfBirth,
    ssn: req.body.ssn
  }

  Object.entries(customerData).forEach(([key, value]) => {
    console.log(`${key}: ${value}`)
  })
  
  const id = await dwollaService.createCustomer(customerData);
  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password,
    userId: id // function that returns the userId from dwolla
  })

  const sessionId = id
  const currentDate = new Date()
  const expiryDate = new Date(currentDate)
  expiryDate.setHours(expiryDate.getHours() + 24)

  await dwollaService.addCustomerFundingSource(id, testFundingSource);

  console.log('Setting cookie with sessionId:', sessionId)
  res.cookie('session', sessionId, { 
    expires: expiryDate,
    httpOnly: true,
    secure: false, // set to true in deployment as well
    sameSite: 'lax' // set to strict in deployment
  })

  const session = await Session.create({
    sessionId: sessionId,
    expiryDate: expiryDate
  })

  return res.status(201).json(newUser)
});

app.post('/api/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const match = await User.findOne({ email: email, password: password });
    if (!match) {
      return res.status(401).json({ error: 'credentials not found in database' })
    }
    const sessionId = match.userId
    const currentDate = new Date()
    const expiryDate = new Date(currentDate)
    expiryDate.setHours(expiryDate.getHours() + 24)

    console.log('Setting cookie with sessionId:', sessionId)
    res.cookie('session', sessionId, { 
      expires: expiryDate,
      httpOnly: true,
      secure: false, // set to true in deployment as well
      sameSite: 'lax' // set to strict in deployment
    })

    const session = await Session.create({
      sessionId: sessionId,
      expiryDate: expiryDate
    })
    
    return res.status(201).json(session)
  } catch (error) {
    console.error(error)
  }
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});