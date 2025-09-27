import { Client } from 'dwolla-v2';

const client = new  dwolla.Client({
    environment: "sandbox",
    key: process.env.DWOLLA_KEY,
    secret: process.env.DWOLLA_SECRET
});

module.exports = client;