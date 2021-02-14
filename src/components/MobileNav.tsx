import React from 'react'
import {
  Link,
  Stack,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useDisclosure,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router-dom'

const MobileNav: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef<HTMLButtonElement>(null)
  return (
    <>
      <IconButton
        aria-label="Navigation"
        variant="ghost"
        color="brand.800"
        ref={btnRef}
        icon={<HamburgerIcon />}
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />

            <DrawerBody>
              <Stack as="nav" py={4} spacing={6}>
                <Link to="/" as={RouterLink}>
                  Strona główna
                </Link>
                <Link to="/plan" as={RouterLink}>
                  Plan oszczędzania
                </Link>
                <Link to="/emerytura" as={RouterLink}>
                  Emerytura
                </Link>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default MobileNav
