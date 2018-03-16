interface EmploymentDetails {
  employerName: string
  jobTitle: number
  employmentDurationInYears: number,
  employmentStatus: string
}

export class Employment {
  public employmentDetails: EmploymentDetails[] = [];

  constructor() {
    this.employmentDetails.push(this.setEmploymentDetails());
  }


  private setEmploymentDetails(): EmploymentDetails {
    return {
      employerName: null,
      jobTitle: null,
      employmentDurationInYears: 0,
      employmentStatus: null 
    }
  }

}
