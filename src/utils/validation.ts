function validateRequired(value: any) {
  if (!value) {
    return 'Pole wymagane'
  }
}

function validateAgeRange(value: number) {
  if (value < 18 || value > 100) {
    return 'Wartość powinna być z przedziału 18 - 100'
  }
}

export function validateAge(values: PlanFormValues): string | undefined {
  const { age } = values
  const requiredError = validateRequired(age)
  if (requiredError) {
    return requiredError
  }

  const ageRangeError = age && validateAgeRange(age)
  if (ageRangeError) {
    return ageRangeError
  }
}

export function validateRetirementAge(
  values: PlanFormValues
): string | undefined {
  const { age, retirementAge } = values
  const requiredError = validateRequired(retirementAge)
  if (requiredError) {
    return requiredError
  }

  const ageRangeError = retirementAge && validateAgeRange(retirementAge)
  if (ageRangeError) {
    return ageRangeError
  }

  if (retirementAge && retirementAge <= age) {
    return 'Wiek emerytalny musi być większy od aktualnego wieku'
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

  if (lifeExpectancy && lifeExpectancy <= retirementAge) {
    return 'Oczekiwana długość życia musi być większa od wieku emerytalnego'
  }
}

export function validateMonthlyRetirement(
  values: PlanFormValues
): string | undefined {
  const requiredError = validateRequired(values.monthlyRetirement)
  if (requiredError) {
    return requiredError
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

  if (Number(currentSavings) < 0) {
    return 'Aktualne oszczędności powinny być nieujemne'
  }
}

export function createStepValidator(steps: FormStepSchema[]) {
  return function (values: PlanFormValues, step: number) {
    let errors = {}
    const stepsToVerify = steps.slice(0, step + 1)
    stepsToVerify.forEach(({ name, validation }: FormStepSchema) => {
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
