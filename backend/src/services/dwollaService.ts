import { dwolla } from '../config/dwolla.ts';
import type { CustomerData, FundingSource, Transfer } from '../types/types.ts';

// Sends new customer creation request to the dwolla API, then returns the generated customerID.
// Responds with Error in case of error.
async function createCustomer(customerData: CustomerData) {
    const appToken = await dwolla.auth.client();

    try {
        console.log(`Adding Customer: ${customerData.firstName} ${customerData.lastName}`)
        const response = await appToken.post('customers',
            { ...customerData }, {
            headers: {
            Accept: 'application/vnd.dwolla.v1.hal+json',
            'Content-Type': 'application/vnd.dwolla.v1.hal+json'
            }
    });
        const responseUrl = await response.headers.get('Location');

        const customerId = await responseUrl.split('/')[responseUrl.split('/').length - 1];

        return customerId;

    } catch (error) {

        return "Error: Customer could not be created.";
    }
}


//Adds funding source to user
async function addCustomerFundingSource(customerId: string, fundingSource: FundingSource) {
    const appToken = await dwolla.auth.client();

    try {
        const responst = await appToken.post(`customers/${customerId}/funding-sources`,
            {...fundingSource}, {
                headers: {
                    Accept: 'application/vnd.dwolla.v1.hal+json',
                    'Content-Type': 'application/vnd.dwolla.v1.hal+json'
                }
            });

        await verifyFundingSource(customerId);
        
        console.log('Funding source addition success!')
    } catch {
        console.log("Error: Funding source could not be added.")    
        return null;
    }
}

async function getFundingSource(customerId:string){
    const appToken = await dwolla.auth.client();
    try{ 
        const response = await appToken.get(`customers/${customerId}/funding-sources`,
            {}, {
                headers: {
                    Accept: 'application/vnd.dwolla.v1.hal+json',
                    'Content-Type': 'application/vnd.dwolla.v1.hal+json'
                }
            });
        const fundingSources = response.body._embedded['funding-sources'];

        if (fundingSources && fundingSources.length > 0)
            return fundingSources[0]._links.self.href;
        else {
            console.log('Error: User has no listed funding sources.')
            return null;
        }
    } catch {
        console.log('Error finding user funding source.')
    }
}

async function verifyFundingSource(customerId:string){
    const appToken = await dwolla.auth.client();
    
    const fundingSource = await getFundingSource(customerId);
    try {
        const response = await appToken.post(`${fundingSource}/micro-deposits`,{},
            {
                headers: {
                    Accept: 'application/vnd.dwolla.v1.hal+json',
                    'Content-Type': 'application/vnd.dwolla.v1.hal+json'
                }
            });
        const response2 = await appToken.post(`${fundingSource}/micro-deposits`,{
            "amount1": {
                "value": "0.01",
                "currency": "USD"
            },
            "amount2": {
                "value": "0.01",
                "currency": "USD"
            }},{
                headers: {
                    Accept: 'application/vnd.dwolla.v1.hal+json',
                    'Content-Type': 'application/vnd.dwolla.v1.hal+json'
                }
            });
        console.log("Success");
    } catch {
        console.log('Error verifying funding source.');
    }
}

async function initiateTransaction(recieverId:string, senderId:string, amount:string){
    const appToken = await dwolla.auth.client();

    const recieverFundingSource = await getFundingSource(recieverId);
    const senderFundingSource = await getFundingSource(senderId);

    if (!recieverFundingSource){
        console.log("Error Reciever has no funding source.")
        return;
    } else if (!senderFundingSource){
        console.log("Error: Sender has no funding source.")
        return;
    }
        const response = await appToken.post('transfers', {
            _links: {
                source: {
                    href: senderFundingSource
                },
                destination: {
                    href: recieverFundingSource
                }
            }, amount: {
                currency: 'USD',
                value: amount
            }}, {
                headers: {
                    Accept: 'application/vnd.dwolla.v1.hal+json',
                    'Content-Type': 'application/vnd.dwolla.v1.hal+json'
                }
            }
        );

        console.log("Transfer successfully initiated: " + response.headers.get('Location').split('/')[response.headers.get('Location').split('/').length - 1]);
        return response.headers.get('Location').split('/')[response.headers.get('Location').split('/').length - 1];
}

async function checkTransactionStatus(transactionId:string){
    const appToken = await dwolla.auth.client();

    try{
        const response = await appToken.get(`${transactionId}`,{},{
            headers: {
                Accept: 'application/vnd.dwolla.v1.hal+json',
                'Content-Type': 'application/vnd.dwolla.v1.hal+json'
                }
        });
        const status = response.body.status;
        return status;
    } catch {
        console.log('Error checking transaction status.')
    }
}

async function getCustomerTransfers(customerId:string) {
    const appToken = await dwolla.auth.client();

    try {
        const response = await appToken.get(`customers/${customerId}/transfers`,{},{
            headers: {
                Accept: 'application/vnd.dwolla.v1.hal+json',
                'Content-Type': 'application/vnd.dwolla.v1.hal+json'
                }
        });
        const transfers = response.body._embedded['transfers'];
        let transferObjs:Transfer[] = [];
        for(let i = 0; i < transfers.length; i++) {
            console.log('Transaction ID: ' + transfers[i].id + ' Status: ' + transfers[i].status)
            transferObjs.push({
                id: transfers[i].id,
                status: transfers[i].status,
                amount: transfers[i].amount.value,
                created: transfers[i].created
            });
        }
        
        return transferObjs;

    } catch {
        console.log('Error checking customer transactions.')
    }
}

export default { createCustomer, addCustomerFundingSource, getFundingSource, initiateTransaction, verifyFundingSource, getCustomerTransfers};
