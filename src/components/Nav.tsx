import React from 'react'
import { HStack, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Nav: React.FC = () => (
  <HStack as="nav" spacing={12}>
    <Link to="/" as={RouterLink}>
      Strona główna
    </Link>
    <Link to="/plan" as={RouterLink}>
      Plan oszczędzania
    </Link>
    <Link to="/emerytura" as={RouterLink}>
      Emerytura
    </Link>
  </HStack>
)

export default Nav
