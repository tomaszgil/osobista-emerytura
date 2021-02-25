import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'
import theme from './styles/theme'

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <ChakraProvider theme={theme}>
    <Router>{children}</Router>
  </ChakraProvider>
)

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options })

export { customRender as render }
