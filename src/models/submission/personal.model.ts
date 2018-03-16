interface Name {
  salutation: string
  givenName: string
  middleName: string
  surname: string
}

interface Demographics {
  gender: string
  dateOfBirth: string
  birthPlace: string
  countryOfBirth: string
  nationality: string
}

interface Address {
  addressType: string
  addressLine1: string
  addressLine2: string
  addressLine3: string
  addressLine4: string
}

interface Email {
  emailAddress: string
  okToEmail: boolean
}

interface Phone {
  phoneNumber: string
  okToSms: boolean
  okToCall: boolean
}

export class Personal {
  public name: Name;
  public demographics: Demographics;
  public address: Address[] = [];
  public email: Email;
  public phone: Phone;

  constructor() {
    this.name = this.setNameDetails();
    this.demographics = this.setDemograhpicDetails();
    this.address.push(this.setAddressDetails())
    this.email = this.setEmailDetails();
    this.phone = this.setPhoneDetails()
  }

  private setNameDetails(): Name {
    return {
      salutation: "",
      givenName: "",
      middleName: "",
      surname: ""
    };
  }

  private setDemograhpicDetails(): Demographics {
    return {
      gender: "",
      dateOfBirth: "",
      birthPlace: "",
      countryOfBirth: "",
      nationality: "Irish"
    };
  }

  private setEmailDetails(): Email {
    return {
      emailAddress: "joebloggs@example.com",
      okToEmail: true
    };
  }

  private setPhoneDetails(): Phone {
    return {
      phoneNumber: "64042321",
      okToSms: true,
      okToCall: true
    };
  }

  private setAddressDetails(): Address {
    return {
      addressType: "HOME_ADDRESS",
      addressLine1: "40A Orchard Road",
      addressLine2: "#99-99 Macdonald House",
      addressLine3: "Orchard Avenue 2",
      addressLine4: "Street 65"
    };
  }
}


// useProfileData: boolean,
// product: any,
// productType: string,
// productName: string,
// personal: {
//   title: string
//   firstName: string
//   lastName: string
//   gender: string
//   dateOFBirth: string
//   placeOfBirth: string
//   countryOfBirth: string
// }
// financial: {
//   forseeableFinancialChanges: boolean
//   nonBackDebt: boolean
//   costOfLivingFrequency: string
//   costOfLivingAmount: number
// }
// income: {
//   type: string
//   fixedAmount: number
// }
// employment: {
//   employerName: string
//   employmentStatus: string
//   employmentDuration: string
// }
// files: any
