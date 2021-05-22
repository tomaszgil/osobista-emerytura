function validateRequired(value: any) {
  if (!value) {
    return 'Pole wymagane'
  }
}

function validateNumber(value: any) {
  if (Number.isNaN(Number(value))) {
    return 'Wymagana wartość liczbowa'
  }
}

function validateInteger(value: any) {
  if (!Number.isInteger(Number(value))) {
    return 'Wymagana wartość całkowita'
  }
}

function validateAgeRange(value: any) {
  const integerError = validateInteger(value)
  if (integerError) {
    return integerError
  }

  if (Number(value) < 18 || Number(value) > 100) {
    return 'Wartość powinna być z przedziału 18 - 100'
  }
}

export function validateAge(values: PlanFormValues): string | undefined {
  const { age, lifeExpectancy } = values
  const requiredError = validateRequired(age)
  if (requiredError) {
    return requiredError
  }

  const ageRangeError = age && validateAgeRange(age)
  if (ageRangeError) {
    return ageRangeError
  }

  if (age && Number(lifeExpectancy) <= Number(age)) {
    return 'Wiek musi być mniejszy od oczekiwanej długości życia'
  }
}

export function validateRetirementAge(
  values: PlanFormValues
): string | undefined {
  const { age, retirementAge, lifeExpectancy } = values
  const requiredError = validateRequired(retirementAge)
  if (requiredError) {
    return requiredError
  }

  const ageRangeError = retirementAge && validateAgeRange(retirementAge)
  if (ageRangeError) {
    return ageRangeError
  }

  if (retirementAge && Number(retirementAge) <= Number(age)) {
    return 'Wiek emerytalny musi być większy od aktualnego wieku'
  }

  if (retirementAge && Number(lifeExpectancy) <= Number(retirementAge)) {
    return 'Wiek emerytalny musi być mniejszy od oczekiwanej długości życia'
  }
}

export function validateLifeExpectancy(
  values: PlanFormValues
): string | undefined {
  const { retirementAge, lifeExpectancy } = values
  const requiredError = validateRequired(lifeExpectancy)
  if (requiredError) {
    return requiredError
  }

  const ageRangeError = lifeExpectancy && validateAgeRange(lifeExpectancy)
  if (ageRangeError) {
    return ageRangeError
  }

  if (lifeExpectancy && Number(lifeExpectancy) <= Number(retirementAge)) {
    return 'Oczekiwana długość życia musi być większa od wieku emerytalnego'
  }
}

export function validateMonthlyRetirement(
  values: PlanFormValues
): string | undefined {
  const { monthlyRetirement } = values
  const requiredError = validateRequired(monthlyRetirement)
  if (requiredError) {
    return requiredError
  }

  const numberError = validateNumber(monthlyRetirement)
  if (numberError) {
    return numberError
  }

  if (Number(monthlyRetirement) < 0) {
    return 'Wysokość miesięcznej emerytury powinna być nieujemna'
  }
}

export function validateReturnOnInvestmentDuringSaving(
  values: PlanFormValues
): string | undefined {
  const { returnOnInvestmentDuringSaving } = values
  const requiredError = validateRequired(returnOnInvestmentDuringSaving)
  if (requiredError) {
    return requiredError
  }

  const numberError = validateNumber(returnOnInvestmentDuringSaving)
  if (numberError) {
    return numberError
  }

  if (Number(returnOnInvestmentDuringSaving) < 0) {
    return 'Zwrot z inwestycji powinien być nieujemny'
  }
}

export function validateReturnOnInvestmentDuringRetirement(
  values: PlanFormValues
): string | undefined {
  const { returnOnInvestmentDuringRetirement } = values
  const requiredError = validateRequired(returnOnInvestmentDuringRetirement)
  if (requiredError) {
    return requiredError
  }

  const numberError = validateNumber(returnOnInvestmentDuringRetirement)
  if (numberError) {
    return numberError
  }

  if (Number(returnOnInvestmentDuringRetirement) < 0) {
    return 'Zwrot z inwestycji powinien być nieujemny'
  }
}

export function validateCurrentSavings(
  values: PlanFormValues
): string | undefined {
  const { currentSavings } = values
  const requiredError = validateRequired(currentSavings)
  if (requiredError) {
    return requiredError
  }

  const numberError = validateNumber(currentSavings)
  if (numberError) {
    return numberError
  }

  if (Number(currentSavings) < 0) {
    return 'Aktualne oszczędności powinny być nieujemne'
  }
}

export function validateInflationRate(
  values: PlanFormValues
): string | undefined {
  const { inflationRate } = values
  const requiredError = validateRequired(inflationRate)
  if (requiredError) {
    return requiredError
  }

  const numberError = validateNumber(inflationRate)
  if (numberError) {
    return numberError
  }
}

export function validateTaxRate(values: PlanFormValues): string | undefined {
  const { taxRate } = values
  const requiredError = validateRequired(taxRate)
  if (requiredError) {
    return requiredError
  }

  const numberError = validateNumber(taxRate)
  if (numberError) {
    return numberError
  }

  if (Number(taxRate) < 0 || Number(taxRate) > 100) {
    return 'Wartość powinna być z przedziału 0 - 100'
  }
}

export function createStepValidator<Values>(
  steps: Array<{ name: string; validation?: Function }>
) {
  return function (values: Values, step: number) {
    let errors = {}
    const stepsToVerify = steps.slice(0, step + 1)
    stepsToVerify.forEach(({ name, validation }) => {
      if (validation) {
        const error = validation(values)
        if (error) {
          errors = { ...errors, [name]: error }
        }
      }
    })
    return errors
  }
}

export function combineValidators(
  validators: Array<{ name: string; validation: Function }>
) {
  return function (values: PlanFormValues) {
    return validators.reduce((errors, { name, validation }) => {
      const error = validation(values)
      if (error) {
        errors = { ...errors, [name]: error }
      }
      return errors
    }, {})
  }
}
