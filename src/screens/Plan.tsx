import React from 'react'
import PlanPreview from './PlanPreview'
import PlanForm from './PlanForm'
import steps from './planForm/steps'
import useLocalStorageState from '../utils/useLocalStorageState'
import { formatNumber } from '../utils/format'
import calculateRetirmentPlan from '../services/retirement'

const initialValues = {
  age: '',
  retirementAge: '',
  lifeExpectancy: '80',
  monthlyRetirement: '',
  returnOnInvestmentDuringSaving: '3',
  returnOnInvestmentDuringRetirement: '3',
  currentSavings: '0',
  advancedSettings: false,
  inflationRate: '2.5',
  taxRate: '19',
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
      monthlyRetirement: Number(formatNumber(values.monthlyRetirement)),
      returnOnInvestmentDuringSaving:
        Number(formatNumber(values.returnOnInvestmentDuringSaving)) / 100,
      returnOnInvestmentDuringRetirement:
        Number(formatNumber(values.returnOnInvestmentDuringRetirement)) / 100,
      currentSavings: Number(formatNumber(values.currentSavings)),
      inflationRate: values.advancedSettings
        ? Number(formatNumber(values.inflationRate)) / 100
        : 0,
      taxRate: values.advancedSettings
        ? Number(formatNumber(values.taxRate)) / 100
        : 0,
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
