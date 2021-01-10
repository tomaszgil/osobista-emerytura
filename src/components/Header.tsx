import React from 'react'
import PageContainer from './PageContainer'
import { Flex } from '@chakra-ui/react'
import Logo from './Logo'
import { Link as RouterLink } from 'react-router-dom'
import Nav from './Nav'

const Header: React.FC = () => {
  return (
    <PageContainer>
      <Flex py={6} justifyContent="space-between">
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Nav />
      </Flex>
    </PageContainer>
  )
}

export default Header
