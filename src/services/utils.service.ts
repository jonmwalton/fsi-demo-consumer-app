import { Injectable } from "@angular/core";
import * as _ from 'lodash';

/*
  Generated class for the Auth Service.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UtilsService {

  constructor() {

  }

  // parse data from sycn framework into format for cases table
  parseSyncData(data:any): any {

    var casesArr = [];

    _.forOwn(data, function(value, key) {
      value.data.guid = key; //add guid to object so we can update 
      casesArr.push(value.data);   
    })
    console.log(casesArr);
    return _.sortBy(casesArr, ['dateCreated']);
    
  };

  addDefaults(payload: any):any{
    let defaults = {
      "applicationType": payload.applicationType || "PERSONAL",
      "taskOwner": "Bank",
      "userAlias": payload.userAlias || "user1",
      "pushAlias": payload.pushAlias || "",
      "Application": {
        "personalDetails": {
          "name": {
            "salutation": payload.Application.personalDetails.name.salutation || "Mr",
            "givenName": payload.Application.personalDetails.name.givenName || "Timmy",
            "middleName": payload.Application.personalDetails.name.middleName || "O",
            "surname": payload.Application.personalDetails.name.surname || "TestCustomer"
          },
          "demographics": {
            "gender": payload.Application.personalDetails.demographics.gender || "MALE",
            "dateOfBirth": payload.Application.personalDetails.demographics.dateOfBirth || "1972-09-15",
            "birthPlace": payload.Application.personalDetails.demographics.birthPlace || "Sydney",
            "countryOfBirth": payload.Application.personalDetails.demographics.countryOfBirth || "AU",
            "nationality": payload.Application.personalDetails.demographics.nationality || "AU"
          },
          "address": [
            {
              "addressType":  "HOME_ADDRESS",
              "addressLine1": "40A Orchard Road",
              "addressLine2":  "#99-99 Macdonald House",
              "addressLine3":  "Orchard Avenue 2",
              "addressLine4":  "Street 65"
            }
          ],
          "email": {
            "emailAddress": payload.userAlias + '@gmail.com' ,
            "okToEmail": true
          },
          "phone": {
            "phoneNumber": "64042321",
            "okToSms": true,
            "okToCall": true
          }
        },
        "financialInformation": {
          "hasForeseeableFinancialChanges": payload.Application.financialInformation.hasForeseeableFinancialChanges  || true,
          "nonBankDebtObligationFlag": payload.Application.financialInformation.nonBankDebtObligationFlag  || true,
          "expenseDetails": [
            {
              "expenseType":  "COSTS_OF_LIVING",
              "expenseAmount": 590.25,
              "frequency":  "MONTHLY"
            }
          ],
          "incomeDetails": [
            {
              "incomeType": payload.Application.financialInformation.incomeDetails[0].incomeType || "DECLARED_FIXED",
              "fixedAmount": payload.Application.financialInformation.incomeDetails[0].fixedAmount || 7590.25,
              "variableAmount":  payload.Application.financialInformation.incomeDetails[0].variableAmount ||1590.25,
              "frequency":  payload.Application.financialInformation.incomeDetails[0].frequency ||"MONTHLY",
              "otherIncomeDescription":  payload.Application.financialInformation.incomeDetails[0].otherIncomeDescription || "Rent"
            }
          ],
          "existingLoanDetails": [
            {
              "loanType": "STUDENT_LOAN",
              "otherDebtObligationType": "Free text",
              "monthlyInstallmentAmount": 250.25,
              "outstandingBalanceAmount": 5000.25,
              "loanAmount": 15000.89,
              "debtOwnership": "JOINT",
              "lenderName": "KINROS CORPORATION"
            }
          ]
        },
        "employmentDetails": [
          {
            "employerName": payload.Application.employmentDetails[0].employerName || "Citi Bank",
            "jobTitle": payload.Application.employmentDetails[0].jobTitle || "ACCOUNTANT",
            "employmentDurationInYears": payload.Application.employmentDetails[0].employmentDurationInYears || 5,
            "employmentStatus": payload.Application.employmentDetails[0].employmentStatus || "EMPLOYED"
          }
        ],
        "creditDetails": {
          "creditAmount": payload.Application.creditDetails.creditAmount || 23000.25,
          "loanTakenIndicator": payload.Application.creditDetails.loanTakenIndicator || true,
          "monthlyRepaymentForAllExtLoans": payload.Application.creditDetails.monthlyRepaymentForAllExtLoans || 5000.25
        },
        "companyDetails": {
          "companyName": payload.Application.companyDetails.companyName || "RedHat",
          "tradingYears": payload.Application.companyDetails.tradingYears || "5",
          "dunsNumber": payload.Application.companyDetails.dunsNumber || "123123123"
        },
        "mortgageDetails": {
          "type":  payload.Application.mortgageDetails.type || "firstTime",
          "location":  payload.Application.mortgageDetails.location || "Sydney",
          "propertyValue":  payload.Application.mortgageDetails.propertyValue || 2222222.22,
          "amount":  payload.Application.mortgageDetails.amount || 999999.99,
          "deposit":  payload.Application.mortgageDetails.deposit || 99999.95,
          "term":  payload.Application.mortgageDetails.term || 25
        },
        "productId": payload.Application.productId || 1
      },
      "additionalDocsRequired": true,
      "assignedTo": "Unassigned"
    }

    return defaults;

  }

}
