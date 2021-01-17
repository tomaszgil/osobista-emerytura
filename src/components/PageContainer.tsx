import React from 'react'
import { Container } from '@chakra-ui/react'

const PageContainer: React.FC = ({ children }) => {
  return (
    <Container maxWidth="80rem" px={6}>
      {children}
    </Container>
  )
}

export default PageContainer
