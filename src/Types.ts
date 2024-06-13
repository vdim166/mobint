export type CompanyType = {
  company: { companyId: string }
  customerMarkParameters: {
    loyaltyLevel: {
      cashToMark: number
      markToCash: number
      name: string
      number: number
      requiredSum: number
    }
    mark: number
  }

  mobileAppDashboard: {
    accentColor: string
    backgroundColor: string
    cardBackgroundColor: string
    companyName: string
    highlightTextColor: string
    logo: string
    mainColor: string
    textColor: string
  }
}
