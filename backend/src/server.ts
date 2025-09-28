import cors from 'cors';
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import express, { Express, Request, Response } from 'express';
import User from './mongo/User.ts';
import Session from './mongo/Session.ts';
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
  try {
    const userId = req.cookies.sessionId
  } catch (error) {
    console.error(error)
  }

})
  
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