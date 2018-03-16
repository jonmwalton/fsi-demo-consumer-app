interface Expense {
  expenseType: string
  expenseAmount: number
  frequency: string
}

interface Income {
  incomeType: string;
  fixedAmount: number
  variableAmount: number
  frequency: string
  otherIncomeDescription: string
}

export class Financial {
  public hasForeseeableFinancialChanges: boolean;
  public nonBankDebtObligationFlag: boolean;
  public expenseDetails: Expense[] = [];
  public incomeDetails: Income[] = [];
  public existingLonDetails: any;

  constructor() {
    this.hasForeseeableFinancialChanges = false;
    this.nonBankDebtObligationFlag = false;
    this.expenseDetails.push(this.setExpenseDetails());
    this.incomeDetails.push(this.setIncomeDetails());
    this.existingLonDetails = this.setLoanDetails();
  }

  private setExpenseDetails(): Expense {
    return {
      expenseType: "",
      expenseAmount: null,
      frequency: null
    };
  }

  private setIncomeDetails(): Income {
    return {
      incomeType: null,
      fixedAmount: null,
      variableAmount: null,
      frequency: null,
      otherIncomeDescription: null
    };
  }

  private setLoanDetails(): any {
    return  {
      loanType: "STUDENT_LOAN",
      otherDebtObligationType: "Free text",
      monthlyInstallmentAmount: 250.25,
      outstandingBalanceAmount: 5000.25,
      loanAmount: 15000.89,
      debtOwnership: "JOINT",
      lenderName: "KINROS CORPORATION"
    };
  }
}
