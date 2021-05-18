import * as finance from './finance'

function roundUp(value: number) {
  const num = Number(Math.ceil(value * 100) / 100)
  const rounded = num.toFixed(2)
  return Number(rounded)
}

function round(value: number) {
  const num = Number(value)
  const rounded = num.toFixed(2)
  return Number(rounded)
}

function calculateRetirementPlan({
  age,
  retirementAge,
  monthlyRetirement,
  returnOnInvestmentDuringSaving,
  returnOnInvestmentDuringRetirement,
  lifeExpectancy,
  currentSavings,
  inflationRate,
}: {
  age: number
  retirementAge: number
  monthlyRetirement: number
  returnOnInvestmentDuringSaving: number
  returnOnInvestmentDuringRetirement: number
  lifeExpectancy: number
  currentSavings: number
  inflationRate: number
}): RetirementPlanValues {
  const retirementMonthsNumber = (lifeExpectancy - retirementAge) * 12
  const preRetirementYearsNumber = retirementAge - age
  const preRetirementMonthsNumber = preRetirementYearsNumber * 12
  const monthlyRetirementAdjusted = finance.FV(
    inflationRate,
    0,
    preRetirementYearsNumber,
    monthlyRetirement * -1
  )
  const retirementSavings =
    finance.PV(
      returnOnInvestmentDuringRetirement / 12,
      monthlyRetirementAdjusted,
      retirementMonthsNumber
    ) * -1
  const payment = roundUp(
    finance.PMT(
      returnOnInvestmentDuringSaving / 12,
      preRetirementMonthsNumber,
      currentSavings * -1,
      retirementSavings
    ) * -1
  )

  const currentYear = new Date().getFullYear()
  const retirementYear = currentYear + retirementAge - age

  const series = []
  let equity = currentSavings
  let interest = 0

  for (let year = currentYear; year < retirementYear; year++) {
    for (let month = 0; month < 12; month++) {
      interest = round(
        interest + ((equity + interest) * returnOnInvestmentDuringSaving) / 12
      )
      equity = round(equity + payment)
    }
    series.push({
      year,
      equity,
      interest,
    })
  }

  return { totalSavings: round(equity + interest), payment, series }
}

export default calculateRetirementPlan
