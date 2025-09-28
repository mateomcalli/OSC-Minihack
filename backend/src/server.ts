import 'dotenv/config'
import express, { Express, Request, Response } from 'express';
import { testCustomer, testFundingSource, testCustomer1, testFundingSource1 } from './test.ts';
import { createCustomer, addCustomerFundingSource, getFundingSource, initiateTransaction, verifyFundingSource } from './services/dwollaService.ts'

const app: Express = express();
const port = 3000;

app.get('/', async (req: Request, res: Response) => {
  await verifyFundingSource("550442dc-6a2e-42a7-9d62-e7f8c08f4354");
  await verifyFundingSource("ab1e7048-c241-464e-8b18-89c6d7ad27fe");
  await initiateTransaction("550442dc-6a2e-42a7-9d62-e7f8c08f4354", "ab1e7048-c241-464e-8b18-89c6d7ad27fe", "2.01");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});