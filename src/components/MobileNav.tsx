import React from 'react'
import {
  Stack,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useDisclosure,
  Flex,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { AdditionalNavLinks, NavLinks } from './NavLinks'

const MobileNav: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef<HTMLButtonElement>(null)
  return (
    <>
      <IconButton
        aria-label="Navigation"
        variant="ghost"
        fontSize="lg"
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
              <Flex
                direction="column"
                justifyContent="space-between"
                height="100%"
              >
                <Stack as="nav" py={8} spacing={6}>
                  <NavLinks />
                </Stack>
                <Stack as="nav" py={8} spacing={6}>
                  <AdditionalNavLinks />
                </Stack>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default MobileNav
