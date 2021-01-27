export function formatCurrency(value: number) {
  return Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  }).format(value)
}
