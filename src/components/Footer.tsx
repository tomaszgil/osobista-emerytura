import React from 'react'
import PageContainer from './PageContainer'
import Logo from './Logo'
import { Box, Stack, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import NavLinks from './NavLinks'

const Footer: React.FC = () => {
  return (
    <PageContainer>
      <Box py={12}>
        <Stack
          as="nav"
          direction={{ md: 'row', base: 'column' }}
          spacing={{ md: 12, base: 4 }}
        >
          <NavLinks />
        </Stack>
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
