import React from 'react'
import { render } from '../test-utils'
import { screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Plan from './Plan'
import calculateRetirementPlan from '../services/retirement'

const step1Heading = 'Ile masz lat?'
const step2Heading = 'W jakim wieku chcesz przejść na emeryturę?'
const step3Heading = 'Jaką chcesz mieć miesięczną emeryturę?'
const step4Heading = 'Jak chcesz pomnażać swoje oszczędności?'

jest.setTimeout(20000)

jest.mock('../services/retirement', () => jest.fn())

test('allows user to fullfil the form with validation for each step', async () => {
  act(() => {
    render(<Plan />)
  })

  // Step 1 - Age
  const ageInput = screen.getByPlaceholderText('Wiek')
  expect(ageInput).toBeVisible()
  expect(
    screen.getByRole('heading', { name: step1Heading })
  ).toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: step2Heading })
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: step3Heading })
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: step4Heading })
  ).not.toBeInTheDocument()

  // Step 1 - Required
  act(() => {
    userEvent.click(screen.getByRole('button', { name: 'Następny krok' }))
  })

  expect(await screen.findByText('Pole wymagane')).toBeInTheDocument()
  expect(ageInput).toBeVisible()

  // Step 1 - Incorrect value
  await act(async () => {
    await userEvent.type(ageInput, '14{enter}', { delay: 1 })
  })

  expect(
    await screen.findByText('Wartość powinna być z przedziału 18 - 100')
  ).toBeInTheDocument()
  expect(ageInput).toBeVisible()

  // Step 1 - success
  await act(async () => {
    await userEvent.type(ageInput, '{selectall}24{enter}', { delay: 1 })
  })

  // Step 2 - Retirement age
  const retirementAgeInput = screen.getByPlaceholderText('Wiek emerytalny')
  expect(ageInput).not.toBeInTheDocument()
  expect(retirementAgeInput).toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: step1Heading })
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: step2Heading })
  ).toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: step3Heading })
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: step4Heading })
  ).not.toBeInTheDocument()

  // Step 2 - Required
  act(() => {
    userEvent.click(screen.getByRole('button', { name: 'Następny krok' }))
  })

  expect(await screen.findByText('Pole wymagane')).toBeInTheDocument()
  expect(retirementAgeInput).toBeVisible()

  // Step 2 - Incorrect value
  await act(async () => {
    await userEvent.type(retirementAgeInput, '23{enter}', { delay: 1 })
  })

  expect(
    await screen.findByText(
      'Wiek emerytalny musi być większy od aktualnego wieku'
    )
  ).toBeInTheDocument()
  expect(retirementAgeInput).toBeVisible()

  // Step 2 - success
  await act(async () => {
    await userEvent.type(retirementAgeInput, '{selectall}60{enter}', {
      delay: 1,
    })
  })

  // Step 3 - Montly retirement
  const monthlyRetirementInput = screen.getByPlaceholderText(
    'Wysokość miesięcznej emerytury'
  )
  expect(retirementAgeInput).not.toBeInTheDocument()
  expect(monthlyRetirementInput).toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: step1Heading })
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: step2Heading })
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: step3Heading })
  ).toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: step4Heading })
  ).not.toBeInTheDocument()

  // Step 3 - Required
  act(() => {
    userEvent.click(screen.getByRole('button', { name: 'Następny krok' }))
  })

  expect(await screen.findByText('Pole wymagane')).toBeInTheDocument()
  expect(monthlyRetirementInput).toBeVisible()

  // Step 3 - success
  await act(async () => {
    await userEvent.type(monthlyRetirementInput, '2000{enter}', {
      delay: 1,
    })
  })

  // Step 4 - Return on investment
  expect(monthlyRetirementInput).not.toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: step1Heading })
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: step2Heading })
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: step3Heading })
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: step4Heading })
  ).toBeInTheDocument()

  // Step 4 - Default values
  expect(screen.getByLabelText(/bankowe produkty inwestycyjne/i)).toBeChecked()
  expect(
    screen.getByLabelText(/fundusze inwestycyjne oraz obligacje/i)
  ).not.toBeChecked()
  expect(
    screen.getByLabelText(/fundusze indeksowe oraz akcje indywidualne/i)
  ).not.toBeChecked()

  // Step 4 - success
  await act(async () => {
    userEvent.click(screen.getByText('Fundusze inwestycyjne oraz obligacje'))
    userEvent.click(screen.getByRole('button', { name: 'Wygeneruj plan' }))
  })

  expect(calculateRetirementPlan).toHaveBeenCalledWith({
    age: 24,
    retirementAge: 60,
    monthlyRetirement: 2000,
    returnOnInvestment: 0.05,
  })
})
