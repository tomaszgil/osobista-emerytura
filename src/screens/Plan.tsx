import * as React from 'react'
import PlanPreview from './PlanPreview'
import PlanForm, { steps } from './PlanForm'
import useLocalStorageState from '../utils/useLocalStorageState'
import calculateRetirmentPlan from '../services/retirement'

const initialValues = {
  age: '',
  retirementAge: '',
  monthlyRetirement: '',
  returnOnInvestment: '3',
}

const PlanScreen: React.FC = () => {
  const [values, setValues] = useLocalStorageState('plan:values', initialValues)
  const [step, setStep] = useLocalStorageState('plan:step', 0)

  const allStepsCompleted = step === steps.length

  if (allStepsCompleted) {
    const formValues = {
      age: Number(values.age),
      retirementAge: Number(values.retirementAge),
      monthlyRetirement: Number(values.monthlyRetirement),
      returnOnInvestment: Number(values.returnOnInvestment) / 100,
    }
    const plan = calculateRetirmentPlan(formValues)

    return (
      <PlanPreview
        plan={plan}
        resetPlan={() => {
          setStep(0)
          setValues(initialValues)
        }}
      />
    )
  }

  return <PlanForm {...{ values, setValues, step, setStep }} />
}

export default PlanScreen
