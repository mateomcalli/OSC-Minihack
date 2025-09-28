import 'dotenv/config'
import express, { Express, Request, Response } from 'express';
import User from './mongo/User.ts';
import mongoose from 'mongoose';
import { testCustomer, testFundingSource, testCustomer1, testFundingSource1 } from './test.ts';
import dwalloService from './services/dwollaService.ts'

const app: Express = express();
app.use(express.json());
const port = 3000;
const url = process.env.MONGO_URI

const getMongoUri = ():string => {
  if (url) return url;
  else return "null"
}

mongoose.connect(getMongoUri())
  .then(() => console.log('Connected to MongoDB!'))
  .catch(error => console.log('Error connecting to MongoDB:', error.message))
  

app.get('/', async (req: Request, res: Response) => {
  await dwalloService.initiateTransaction("550442dc-6a2e-42a7-9d62-e7f8c08f4354", "ab1e7048-c241-464e-8b18-89c6d7ad27fe", "2.01")

  const newUser = await User.create({
    email: req.params.email,
    password: req.params.password,
    userId: await dwalloService.createCustomer(testCustomer) // function that returns the userId from dwolla
  })
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});