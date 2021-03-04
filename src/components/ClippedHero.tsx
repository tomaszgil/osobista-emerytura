import React from 'react'
import PageContainer from '../components/PageContainer'
import { Box, Stack, chakra } from '@chakra-ui/react'

const ClippedHero: React.FC<{ children: React.ReactNode; imgSrc?: string }> = ({
  children,
  imgSrc,
}) => {
  return (
    <PageContainer>
      <Box pt={16} pb={24}>
        <Stack direction={{ md: 'row', base: 'column' }} spacing={8}>
          <Box flex="1">{children}</Box>
          {imgSrc && (
            <Box flex="1" position="relative">
              <chakra.img
                src={imgSrc}
                position={{ md: 'absolute' }}
                top={{ lg: '-4em' }}
                width="100%"
              ></chakra.img>
            </Box>
          )}
        </Stack>
      </Box>
    </PageContainer>
  )
}

export default ClippedHero
