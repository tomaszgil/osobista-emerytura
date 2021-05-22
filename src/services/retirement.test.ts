import calculateRetirementPlan from './retirement'

test.each([
  [
    {
      age: 28,
      retirementAge: 55,
      monthlyRetirement: 3000,
      returnOnInvestmentDuringSaving: 0.04,
      returnOnInvestmentDuringRetirement: 0.04,
      lifeExpectancy: 87,
      currentSavings: 22000,
      inflationRate: 0,
      taxRate: 0,
    },
    {
      payment: 1004.73,
      totalSavings: 649237.54,
    },
  ],
  [
    {
      age: 28,
      retirementAge: 67,
      monthlyRetirement: 3000,
      returnOnInvestmentDuringSaving: 0.04,
      returnOnInvestmentDuringRetirement: 0.04,
      lifeExpectancy: 87,
      currentSavings: 22000,
      inflationRate: 0,
      taxRate: 0,
    },
    {
      payment: 347.57,
      totalSavings: 495073.16,
    },
  ],
  [
    {
      age: 28,
      retirementAge: 67,
      monthlyRetirement: 2100,
      returnOnInvestmentDuringSaving: 0.04,
      returnOnInvestmentDuringRetirement: 0.04,
      lifeExpectancy: 87,
      currentSavings: 22000,
      inflationRate: 0,
      taxRate: 0,
    },
    {
      payment: 215.43,
      totalSavings: 346554.84,
    },
  ],
  [
    {
      age: 28,
      retirementAge: 67,
      monthlyRetirement: 3000,
      returnOnInvestmentDuringSaving: 0.065,
      returnOnInvestmentDuringRetirement: 0.065,
      lifeExpectancy: 87,
      currentSavings: 22000,
      inflationRate: 0.025,
      taxRate: 0,
    },
    {
      payment: 365.67,
      totalSavings: 1054068.16,
    },
  ],
  [
    {
      age: 28,
      retirementAge: 67,
      monthlyRetirement: 3000,
      returnOnInvestmentDuringSaving: 0.065,
      returnOnInvestmentDuringRetirement: 0.065,
      lifeExpectancy: 87,
      currentSavings: 22000,
      inflationRate: 0.025,
      taxRate: 0.19,
    },
    {
      payment: 645.31,
      totalSavings: 1649336,
    },
  ],
])('when passed %p returns %p', (args, result) => {
  expect(calculateRetirementPlan(args)).toMatchObject(result)
})

describe('correctly calculates series', () => {
  const result = calculateRetirementPlan({
    age: 25,
    retirementAge: 60,
    monthlyRetirement: 3000,
    returnOnInvestmentDuringSaving: 0.06,
    returnOnInvestmentDuringRetirement: 0.02,
    lifeExpectancy: 90,
    currentSavings: 100000,
    inflationRate: 0,
    taxRate: 0,
  })

  test('equity and interest', () => {
    expect(result).toMatchObject({
      series: [
        {
          equity: 99994.12,
          interest: 6167.61,
        },
        {
          equity: 99988.24,
          interest: 12715.28,
        },
        {
          equity: 99982.36,
          interest: 19666.42,
        },
        {
          equity: 99976.48,
          interest: 27045.93,
        },
        {
          equity: 99970.6,
          interest: 34880.24,
        },
        {
          equity: 99964.72,
          interest: 43197.37,
        },
        {
          equity: 99958.84,
          interest: 52027.12,
        },
        {
          equity: 99952.96,
          interest: 61401.12,
        },
        {
          equity: 99947.08,
          interest: 71352.92,
        },
        {
          equity: 99941.2,
          interest: 81918.17,
        },
        {
          equity: 99935.32,
          interest: 93134.7,
        },
        {
          equity: 99929.44,
          interest: 105042.66,
        },
        {
          equity: 99923.56,
          interest: 117684.73,
        },
        {
          equity: 99917.68,
          interest: 131106.16,
        },
        {
          equity: 99911.8,
          interest: 145355.05,
        },
        {
          equity: 99905.92,
          interest: 160482.39,
        },
        {
          equity: 99900.04,
          interest: 176542.41,
        },
        {
          equity: 99894.16,
          interest: 193592.6,
        },
        {
          equity: 99888.28,
          interest: 211694.05,
        },
        {
          equity: 99882.4,
          interest: 230911.59,
        },
        {
          equity: 99876.52,
          interest: 251314.09,
        },
        {
          equity: 99870.64,
          interest: 272974.59,
        },
        {
          equity: 99864.76,
          interest: 295970.69,
        },
        {
          equity: 99858.88,
          interest: 320384.79,
        },
        {
          equity: 99853,
          interest: 346304.33,
        },
        {
          equity: 99847.12,
          interest: 373822.19,
        },
        {
          equity: 99841.24,
          interest: 403036.93,
        },
        {
          equity: 99835.36,
          interest: 434053.19,
        },
        {
          equity: 99829.48,
          interest: 466982.11,
        },
        {
          equity: 99823.6,
          interest: 501941.64,
        },
        {
          equity: 99817.72,
          interest: 539057.04,
        },
        {
          equity: 99811.84,
          interest: 578461.27,
        },
        {
          equity: 99805.96,
          interest: 620295.51,
        },
        {
          equity: 99800.08,
          interest: 664709.63,
        },
        {
          equity: 99794.2,
          interest: 711862.74,
        },
      ],
    })
  })

  test('assigning consecutive year', () => {
    for (let i = 1; i < result.series.length; i++) {
      expect(result.series[i - 1].year + 1).toEqual(result.series[i].year)
    }
  })
})
