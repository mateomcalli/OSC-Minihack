import type {CustomerData, FundingSource} from './types/types.ts';

const testCustomer: CustomerData = {
    firstName: "John",
    lastName: "Doe",
    email: "joe@gmail.com",
    type : "personal",
    address1: "123 Main St",
    city: "Miami",
    state: "FL",
    postalCode: "33126",
    dateOfBirth: "1990-01-01",
    ssn: "6789"
}
const testFundingSource: FundingSource = {
    routingNumber: "222222226",
    accountNumber: "987654321",
    bankAccountType: "checking",
    name: "John Doe's Guap Account"
}



const testCustomer1: CustomerData = {
    firstName: "Jane",
    lastName: "Doe",
    email: "evilkiller@gmail.com",
    type : "personal",
    address1: "123 Main St",
    city: "Miami",
    state: "FL",
    postalCode: "33126",
    dateOfBirth: "1990-01-01",
    ssn: "9999"
}
const testFundingSource1: FundingSource = {
    routingNumber: "222222226",
    accountNumber: "88888888888",
    bankAccountType: "checking",
    name: "Account of Evil"
}


export {testCustomer, testFundingSource, testCustomer1, testFundingSource1}

