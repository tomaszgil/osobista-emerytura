type NumberInputValue = number | ''

type PlanFormValues = {
  age: NumberInputValue
  retirementAge: NumberInputValue
  monthlyRetirement: NumberInputValue
  returnOnInvestment: string
}

type RetirementPlanValues = {
  totalSavings: number
  payment: number
  series: Array<{ year: number; equity: number; interest: number }>
}
