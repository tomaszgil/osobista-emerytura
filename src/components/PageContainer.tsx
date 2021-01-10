import React from 'react'
import { Container } from '@chakra-ui/react'

type PageContainerProps = {
  children: React.ReactNode
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <Container maxWidth="80rem" px={6}>
      {children}
    </Container>
  )
}

export default PageContainer
