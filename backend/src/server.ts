import 'dotenv/config'
import express, { Express, Request, Response } from 'express';
import { testCustomer, testFundingSource } from './test.ts';
import { createCustomer, addCustomerFundingSource, getFundingSource } from './services/dwollaService.ts'

const app: Express = express();
const port = 3000;

app.get('/', async (req: Request, res: Response) => {
  console.log(await getFundingSource("ab1e7048-c241-464e-8b18-89c6d7ad27fe"));
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});