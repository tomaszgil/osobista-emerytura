import {
  validateAge,
  validateRetirementAge,
  validateMonthlyRetirement,
} from '../../services/validation'
import AgeStep from './AgeStep'
import RetirementAgeStep from './RetirementAgeStep'
import MonthlyRetirementStep from './MonthlyRetirementStep'
import ReturnOnInvestmentStep from './ReturnOnInvestmentStep'

const steps: FormStepSchema[] = [
  {
    name: 'age',
    title: 'Ile masz lat?',
    validation: validateAge,
    component: AgeStep,
  },
  {
    name: 'retirementAge',
    title: 'W jakim wieku chcesz przejść na emeryturę?',
    validation: validateRetirementAge,
    component: RetirementAgeStep,
  },
  {
    name: 'monthlyRetirement',
    title: 'Jaką chcesz mieć miesięczną emeryturę?',
    validation: validateMonthlyRetirement,
    component: MonthlyRetirementStep,
  },
  {
    name: 'returnOnInvestment',
    title: 'Jak chcesz pomnażać swoje oszczędności?',
    component: ReturnOnInvestmentStep,
  },
]

export default steps
