import React from 'react'
import { Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const NavLinks: React.FC = () => (
  <>
    <Link to="/" as={RouterLink}>
      Strona główna
    </Link>
    <Link to="/plan" as={RouterLink}>
      Plan oszczędzania
    </Link>
    <Link to="/emerytura" as={RouterLink}>
      Emerytura
    </Link>
  </>
)

export default NavLinks
