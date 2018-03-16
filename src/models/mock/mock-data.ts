import { Product } from "./../product.model";

export const PRODUCTS: Product[] = [{
    name : 'Home Loan',
    desc: 'Some spiel goes here decribing product details and other supper dupper stuff.',
    type: 'loan',
    productType: 'mortgage',
    category: 'personal',
    id: 1,
    cost: {
      currency: 'euro',
      interestRate: 0.00,
      annualFee: 0.00
    },
    creditLimit: {
      min: 0.00,
      max: 0.00
    },
    terms: 'By choosing this product, you consent to FSI disclosing your information to Credit Bureau; and any such bureau to transfer and disclose to FSI, any information relating to you and/or any of your account(s) (and for such purpose) as may be permitted under or pursuant to the Banking Act.',
    requiredDocuments: {
      id: 'Passport/Driving License',
      address: 'Utility Bill',
      other: 'Latest 3 months Bank Statement'
    }
  },{
    name : 'Ready Credit',
    desc: 'Some spiel goes here decribing product details and other supper dupper stuff.',
    type: 'credit',
    productType: 'commerical loan',
    category: 'retail',
    id: 2,
    cost: {
      currency: 'euro',
      interestRate: 0.00,
      annualFee: 0.00
    },
    creditLimit: {
      min: 0.00,
      max: 0.00
    },
    terms: 'By choosing this product, you consent to FSI disclosing your information to Credit Bureau; and any such bureau to transfer and disclose to FSI, any information relating to you and/or any of your account(s) (and for such purpose) as may be permitted under or pursuant to the Banking Act.',
    requiredDocuments: {
      id: 'Passport/Driving License',
      address: 'Utility Bill',
      other: 'Latest 3 months Bank Statement'
    }
  },{
    name : 'Ready Credit SmartCash',
    desc: 'Some spiel goes here decribing product details and other supper dupper stuff.',
    type: 'credit',
    category: 'personal',
    productType: 'Internet Banking',
    id: 3,
    cost: {
      currency: 'euro',
      interestRate: 0.00,
      annualFee: 0.00
    },
    creditLimit: {
      min: 0.00,
      max: 0.00
    },
    terms: 'By choosing this product, you consent to FSI disclosing your information to Credit Bureau; and any such bureau to transfer and disclose to FSI, any information relating to you and/or any of your account(s) (and for such purpose) as may be permitted under or pursuant to the Banking Act.',
    requiredDocuments: {
      id: 'Passport/Driving License',
      address: 'Utility Bill',
      other: 'Latest 3 months Bank Statement'
    }
  },{
    name : 'DIVIDEND Visa Card',
    desc: 'Some spiel goes here decribing product details and other supper dupper stuff.',
    category: 'personal',
    type: 'card',
    productType: 'Debit Card',
    id: 4,
    cost: {
      currency: 'euro',
      interestRate: 0.00,
      annualFee: 0.00
    },
    creditLimit: {
      min: 0.00,
      max: 0.00
    },
    terms: 'By choosing this product, you consent to FSI disclosing your information to Credit Bureau; and any such bureau to transfer and disclose to FSI, any information relating to you and/or any of your account(s) (and for such purpose) as may be permitted under or pursuant to the Banking Act.',
    requiredDocuments: {
      id: 'Passport/Driving License',
      address: 'Utility Bill',
      other: 'Latest 3 months Bank Statement'
    }
  },{
    name : 'Clear Card',
    desc: 'Some spiel goes here decribing product details and other supper dupper stuff.',
    category: 'personal',
    type: 'card',
    productType: 'mortgage',
    id: 5,
    cost: {
      currency: 'euro',
      interestRate: 0.00,
      annualFee: 0.00
    },
    creditLimit: {
      min: 0.00,
      max: 0.00
    },
    terms: 'By choosing this product, you consent to FSI disclosing your information to Credit Bureau; and any such bureau to transfer and disclose to FSI, any information relating to you and/or any of your account(s) (and for such purpose) as may be permitted under or pursuant to the Banking Act.',
    requiredDocuments: {
      id: 'Passport/Driving License',
      address: 'Utility Bill',
      other: 'Latest 3 months Bank Statement'
    }
  },{
    name : 'Clear Platinum Card',
    desc: 'Some spiel goes here decribing product details and other supper dupper stuff.',
    category: 'personal',
    type: 'card',
    productType: 'Credit Card',
    id: 6,
    cost: {
      currency: 'euro',
      interestRate: 0.00,
      annualFee: 0.00
    },
    creditLimit: {
      min: 0.00,
      max: 0.00
    },
    terms: 'By choosing this product, you consent to FSI disclosing your information to Credit Bureau; and any such bureau to transfer and disclose to FSI, any information relating to you and/or any of your account(s) (and for such purpose) as may be permitted under or pursuant to the Banking Act.',
    requiredDocuments: {
      id: 'Passport/Driving License',
      address: 'Utility Bill',
      other: 'Latest 3 months Bank Statement'
    }
  }, {
    name : 'Rewards Visa Card',
    desc: 'Some spiel goes here decribing product details and other supper dupper stuff.',
    category: 'personal',
    type: 'card',
    productType: 'Credit Card',
    id: 6,
    cost: {
      currency: 'euro',
      interestRate: 0.00,
      annualFee: 0.00
    },
    creditLimit: {
      min: 0.00,
      max: 0.00
    },
    terms: 'By choosing this product, you consent to FSI disclosing your information to Credit Bureau; and any such bureau to transfer and disclose to FSI, any information relating to you and/or any of your account(s) (and for such purpose) as may be permitted under or pursuant to the Banking Act.',
    requiredDocuments: {
      id: 'Passport/Driving License',
      address: 'Utility Bill',
      other: 'Latest 3 months Bank Statement'
    }
  }];

//   “applicationType” : “PERSONAL”,
//   “taskOwner” : “Bank”,
//   “userAlias” : “user1",
//   “Application” : {
//     “personalDetails” : {
//       “name” : {
//         “salutation” : “Mr”,
//         “givenName” : “Matthew”,
//         “middleName” : “Du”,
//         “surname” : “Hayden”
//       },
//       “demographics” : {
//         “gender” : “MALE”,
//         “dateOfBirth” : “1972-09-15",
//         “birthPlace” : “Sydney”,
//         “countryOfBirth” : “AU”,
//         “nationality” : “AU”
//       },
//       “address” : [ {
//         “addressType” : “HOME_ADDRESS”,
//         “addressLine1" : “40A Orchard Road”,
//         “addressLine2" : “#99-99 Macdonald House”,
//         “addressLine3" : “Orchard Avenue 2”,
//         “addressLine4" : “Street 65”
//       } ],
//       “email” : {
//         “emailAddress” : “matt.hayden@gmail.com”,
//         “okToEmail” : true
//       },
//       “phone” : {
//         “phoneNumber” : “64042321",
//         “okToSms” : true,
//         “okToCall” : true
//       }
//     },
//     “financialInformation” : {
//       “hasForeseeableFinancialChanges” : true,
//       “nonBankDebtObligationFlag” : true,
//       “expenseDetails” : [ {
//         “expenseType” : “COSTS_OF_LIVING”,
//         “expenseAmount” : 590.25,
//         “frequency” : “MONTHLY”
//       } ],
//       “incomeDetails” : [ {
//         “incomeType” : “DECLARED_FIXED”,
//         “fixedAmount” : 7590.25,
//         “variableAmount” : 1590.25,
//         “frequency” : “MONTHLY”,
//         “otherIncomeDescription” : “Rent”
//       } ],
//       “existingLoanDetails” : [ {
//         “loanType” : “STUDENT_LOAN”,
//         “otherDebtObligationType” : “Free text”,
//         “monthlyInstallmentAmount” : 250.25,
//         “outstandingBalanceAmount” : 5000.25,
//         “loanAmount” : 15000.89,
//         “debtOwnership” : “JOINT”,
//         “lenderName” : “KINROS CORPORATION”
//       } ]
//     },
//     “employmentDetails” : [ {
//       “employerName” : “Citi Bank”,
//       “jobTitle” : “ACCOUNTANT”,
//       “employmentDurationInYears” : 5,
//       “employmentStatus” : “EMPLOYED”
//     } ],
//     “creditDetails” : {
//       “creditAmount” : 23000.25,
//       “loanTakenIndicator” : true,
//       “monthlyRepaymentForAllExtLoans” : 5000.25
//     },
//     “companyDetails” : {
//       “companyName” : “RedHat”,
//       “tradingYears” : “5”,
//       “dunsNumber” : “123123123”
//     },
//     “mortgageDetails”:
//     {
//         “type”:“firstTime”,
//         “location”: “Sydney”,
//         “propertyValue”: 2222222.22,
//         “amount”: 999999.99,
//         “deposit”: 99999.95,
//         “term”: 25
//     },
//     “productType”: “Mortgage”
//   },
//   “additionalDocsRequired” : true,
//   “assignedTo” : “Unassigned”
// }
// }
