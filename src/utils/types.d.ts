type NumberInputValue = number | ''

type PlanFormValues = {
  age: NumberInputValue
  retirementAge: NumberInputValue
  lifeExpectancy: NumberInputValue
  monthlyRetirement: NumberInputValue
  returnOnInvestmentDuringSaving: NumberInputValue
  returnOnInvestmentDuringRetirement: NumberInputValue
  currentSavings: NumberInputValue
  advancedSettings: boolean
  inflationRate: NumberInputValue
}

type RetirementPlanValues = {
  totalSavings: number
  payment: number
  series: Array<{ year: number; equity: number; interest: number }>
}

type FormStepSchema = {
  name: string
  title: string
  validation?: Function
  component: React.FC<{ title: string }>
}
