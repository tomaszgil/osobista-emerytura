import React from 'react'
import PageContainer from '../components/PageContainer'
import { Box } from '@chakra-ui/react'

const PageBackground: React.FC = () => (
  <Box position="absolute" height="100vh" width="100%" zIndex="hide">
    <Box position="absolute" background="purple.50" width="50%" height="100%" />
    <PageContainer>
      <Box position="relative" width="100%">
        <Box
          position="absolute"
          background="purple.50"
          width="33%"
          height="100vh"
          zIndex="1"
        />
        <Box position="absolute" width="100%" height="100vh" bg="white"></Box>
      </Box>
    </PageContainer>
  </Box>
)

export default PageBackground
