interface CustomerData {
    firstName: string;
    lastName: string;
    email: string;
    type: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    dateOfBirth: string; // YYYY-MM-DD
    ssn: string;
}

interface FundingSource {
    routingNumber: string;
    accountNumber: string;
    bankAccountType: string;
    name: string;
}

export { CustomerData, FundingSource };