import { dwolla } from '../config/dwolla.ts';
import type { CustomerData } from '../types/types.ts';

// Sends new customer creation request to the dwolla API, then returns the generated customerID.
// Responds with Error in case of error.
async function createCustomer(customerData: CustomerData) {
    const appToken = await dwolla.auth.client();
    const accessToken = appToken.access_token;


    try {
        console.log(`Adding Customer: ${customerData.firstName} ${customerData.lastName}`)
        const response = await appToken.post('customers',
            { ...customerData }, {
            headers: {
            Accept: 'application/vnd.dwolla.v1.hal+json',
            'Content-Type': 'application/vnd.dwolla.v1.hal+json'
            }
    });

        const responseUrl = response.headers.get('Location');

        const customerId = responseUrl.split('/')[responseUrl.split('/').length - 1];

        return customerId;

    } catch (error) {
        return "Error: Customer could not be created.";
    }
}
export { createCustomer };
