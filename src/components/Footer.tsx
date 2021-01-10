import React from 'react'
import PageContainer from './PageContainer'
import Logo from './Logo'
import { Box, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import Nav from './Nav'

const Footer: React.FC = () => {
  return (
    <PageContainer>
      <Box py={12}>
        <Nav />
        <Box mb={4} mt={12}>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Box>
        <Text color="gray.500">© 2020 Osobista Emerytura</Text>
      </Box>
    </PageContainer>
  )
}

export default Footer
