import * as React from 'react'
import PlanPreview from './PlanPreview'
import PlanForm from './PlanForm'

const PlanScreen: React.FC = () => {
  const [plan, setPlan] = React.useState<RetirementPlanValues | null>(null)

  if (plan) {
    return <PlanPreview plan={plan} resetPlan={() => setPlan(null)} />
  }

  return <PlanForm setPlan={setPlan} />
}

export default PlanScreen
