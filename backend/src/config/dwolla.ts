import 'dotenv/config'
const Client = require('dwolla-v2');

const dwolla = new Client.Client({
    environment: "sandbox",
    key: process.env.DWOLLA_KEY as string ,
    secret: process.env.DWOLLA_SECRET as string
});

export { dwolla };