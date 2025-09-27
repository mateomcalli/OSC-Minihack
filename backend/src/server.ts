import 'dotenv/config'
import express, { Express, Request, Response } from 'express';
import { testCustomer } from './test.ts';
import { createCustomer } from './services/dwollaService.ts'

const app: Express = express();
const port = 3000;

app.get('/', async (req: Request, res: Response) => {
  console.log(await createCustomer(testCustomer));
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});