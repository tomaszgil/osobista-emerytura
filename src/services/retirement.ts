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
  returnOnInvestment,
  lifeExpectancy,
  currentSavings,
}: {
  age: number
  retirementAge: number
  monthlyRetirement: number
  returnOnInvestment: number
  lifeExpectancy: number
  currentSavings: number
}): RetirementPlanValues {
  const retirementMonthsNumber = (lifeExpectancy - retirementAge) * 12
  const preRetirementMonthsNumber = (retirementAge - age) * 12
  const retirementSavings =
    finance.PV(
      returnOnInvestment / 12,
      monthlyRetirement,
      retirementMonthsNumber
    ) * -1
  const payment = roundUp(
    finance.PMT(
      returnOnInvestment / 12,
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
        interest + ((equity + interest) * returnOnInvestment) / 12
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
