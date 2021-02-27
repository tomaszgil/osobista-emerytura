import React from 'react'
import { HStack } from '@chakra-ui/react'
import { NavLinks } from './NavLinks'

const Nav: React.FC = () => (
  <HStack as="nav" spacing={12}>
    <NavLinks />
  </HStack>
)

export default Nav
