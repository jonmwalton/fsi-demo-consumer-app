export class Product {
  name: string
  desc: string
  type: string
  productType: string
  category: string
  id: number
  cost: {
    currency: string
    interestRate: number
    annualFee: number
  }
  creditLimit: {
    min: number
    max: number
  }
  terms: string
  requiredDocuments: {
    id: string
    address: string
    other: string
  }
}
