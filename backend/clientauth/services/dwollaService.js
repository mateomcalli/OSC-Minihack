import { client } from 'dwolla.js'

let applicationToken = null;

async function getAccessToken() {

    if (applicationToken && applicationToken.expires > Date.now())
        return applicationToken.access_token;

    const auth = Buffer.from(`${process.env.DWOLLA_KEY}:${process.env.DWOLLA_SECRET}`).toString('base64');

    const response = await client.post('/token', 
        {
            grant_type: 'client_credentials'

        }, {
            Authorization: `Basic ${auth}`
        }
    );
    applicationToken = {
        access_token: response.data.access_token,
        expires: Date.now() + (response.data.expires_in * 1000) - 60000
    }
    return applicationToken.access_token;
}

async function createCustomer(customerData) {
    const accessToken = await getAccessToken();

    client.post('/customers', 
        {
            customerData
        },

        {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/vnd.dwolla.v1.hal+json'
        });

    return response.headers.get('Location');
}

module.exports = { getAccessToken, createCustomer};

