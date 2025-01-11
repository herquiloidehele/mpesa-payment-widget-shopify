import { MPESA_TAX } from '@/utils/Constants'

export function getValueWithTax(value: number) {
  const valueAmount = Number(value)
  return formatCurrency(Math.ceil(Math.round(valueAmount) / (1 - MPESA_TAX)))
}

export const formatCurrency = (price: number) => {
  return Intl.NumberFormat(['pt-PT'], {
    currency: 'MZN',
    style: 'currency',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    useGrouping: true
  }).format(price)
}
