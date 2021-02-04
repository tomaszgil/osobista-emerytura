import * as React from 'react'
import PlanPreview from './PlanPreview'
import PlanForm, { steps } from './PlanForm'
import useLocalStorageState from '../utils/useLocalStorageState'
import calculateRetirmentPlan from '../services/retirement'

const initialValues = {
  age: '',
  retirementAge: '',
  lifeExpectancy: '80',
  monthlyRetirement: '',
  returnOnInvestment: '3',
  currentSavings: '0',
}

const PlanScreen: React.FC = () => {
  const [values, setValues] = useLocalStorageState('plan:values', initialValues)
  const [step, setStep] = useLocalStorageState('plan:step', 0)

  const allStepsCompleted = step === steps.length

  if (allStepsCompleted) {
    const formValues = {
      age: Number(values.age),
      retirementAge: Number(values.retirementAge),
      lifeExpectancy: Number(values.lifeExpectancy),
      monthlyRetirement: Number(values.monthlyRetirement),
      returnOnInvestment: Number(values.returnOnInvestment) / 100,
      currentSavings: Number(values.currentSavings),
    }
    const plan = calculateRetirmentPlan(formValues)

    return (
      <PlanPreview
        plan={plan}
        values={values}
        setValues={setValues}
        resetPlan={() => {
          setStep(0)
          setValues(initialValues)
        }}
      />
    )
  }

  return (
    <PlanForm
      values={values}
      setValues={setValues}
      step={step}
      setStep={setStep}
    />
  )
}

export default PlanScreen
