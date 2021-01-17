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

export function validateMonthlyRetirement(
  values: PlanFormValues
): string | undefined {
  const requiredError = validateRequired(values.monthlyRetirement)
  if (requiredError) {
    return requiredError
  }
}
