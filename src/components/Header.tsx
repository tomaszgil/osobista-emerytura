import React from 'react'
import PageContainer from './PageContainer'
import { Flex, useBreakpointValue } from '@chakra-ui/react'
import Logo from './Logo'
import { Link as RouterLink } from 'react-router-dom'
import Nav from './Nav'
import MobileNav from './MobileNav'

const Header: React.FC = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <PageContainer>
      <Flex py={6} justifyContent="space-between" alignItems="center">
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        {isMobile ? <MobileNav /> : <Nav />}
      </Flex>
    </PageContainer>
  )
}

export default Header
