import React from 'react'
import { render } from '../test-utils'
import { screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Plan from './Plan'

const step1Heading = 'Ile masz lat?'
const step2Heading = 'W jakim wieku chcesz przejść na emeryturę?'
const step3Heading = 'Jaką chcesz mieć miesięczną emeryturę?'
const step4Heading = 'Jak chcesz pomnażać swoje oszczędności?'

jest.setTimeout(10000)

test('allows user to fullfil the form with validation for each step', async () => {
  act(() => {
    render(<Plan />)
  })

  // Step 1 - Age
  const ageInput = screen.getByPlaceholderText('Wiek')
  expect(ageInput).toBeVisible()
  expect(screen.getByText(step1Heading)).toBeVisible()
  expect(screen.queryByText(step2Heading)).not.toBeVisible()
  expect(screen.queryByText(step3Heading)).not.toBeVisible()
  expect(screen.queryByText(step4Heading)).not.toBeVisible()

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
  await waitFor(() => expect(ageInput).not.toBeVisible())
  expect(retirementAgeInput).toBeVisible()
  expect(screen.getByText(step1Heading)).not.toBeVisible()
  expect(screen.queryByText(step2Heading)).toBeVisible()
  expect(screen.queryByText(step3Heading)).not.toBeVisible()
  expect(screen.queryByText(step4Heading)).not.toBeVisible()

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
  await waitFor(() => expect(retirementAgeInput).not.toBeVisible())
  expect(monthlyRetirementInput).toBeVisible()
  expect(screen.getByText(step1Heading)).not.toBeVisible()
  expect(screen.queryByText(step2Heading)).not.toBeVisible()
  expect(screen.queryByText(step3Heading)).toBeVisible()
  expect(screen.queryByText(step4Heading)).not.toBeVisible()

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
  await waitFor(() => expect(monthlyRetirementInput).not.toBeVisible())
  expect(screen.getByText(step1Heading)).not.toBeVisible()
  expect(screen.queryByText(step2Heading)).not.toBeVisible()
  expect(screen.queryByText(step3Heading)).not.toBeVisible()
  expect(screen.queryByText(step4Heading)).toBeVisible()

  // Step 4 - Default values
  expect(screen.getByLabelText(/bankowe produkty inwestycyjne/i)).toBeChecked()
  expect(
    screen.getByLabelText(/fundusze inwestycyjne oraz obligacje/i)
  ).not.toBeChecked()
  expect(
    screen.getByLabelText(/fundusze indeksowe oraz akcje indywidualne/i)
  ).not.toBeChecked()

  // Step 4 - success
  jest.spyOn(console, 'log')
  await act(async () => {
    userEvent.click(screen.getByText('Fundusze inwestycyjne oraz obligacje'))
    userEvent.click(screen.getByRole('button', { name: 'Wygeneruj plan' }))
  })

  expect(console.log).toHaveBeenCalledWith(
    'submit',
    {
      age: '24',
      retirementAge: '60',
      monthlyRetirement: '2000',
      returnOnInvestment: '5',
    },
    expect.any(Object)
  )
})
