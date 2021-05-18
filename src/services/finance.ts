export function PV(
  rate: number,
  payment: number,
  periods: number,
  futureValue: number = 0
): number {
  if (rate === 0) {
    return -payment * periods - futureValue
  }

  const pvif = (1 + rate) ** periods
  return (((1 - pvif) / rate) * payment - futureValue) / pvif
}

export function FV(
  rate: number,
  payment: number,
  periods: number,
  presentValue: number = 0
) {
  if (rate === 0) {
    return -payment * periods - presentValue
  }

  const pvif = (1 + rate) ** periods
  return (payment * (1 - pvif)) / rate - presentValue * pvif
}

export function PMT(
  rate: number,
  periods: number,
  presentValue: number,
  futureValue: number = 0
): number {
  if (rate === 0) {
    return -(presentValue + futureValue) / periods
  }

  const pvif = (1 + rate) ** periods
  return (rate / (pvif - 1)) * -(presentValue * pvif + futureValue)
}
