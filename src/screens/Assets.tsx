import React from 'react'
import PageContainer from '../components/PageContainer'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Box, Heading, Link, Text, Divider, SimpleGrid } from '@chakra-ui/react'

type AttributionProps = {
  title: string
  children: React.ReactNode
}

const Attribution: React.FC<AttributionProps> = ({ title, children }) => (
  <Box flex="1">
    <Heading fontSize="2xl" mb={4}>
      {title}
    </Heading>
    <Text>{children}</Text>
  </Box>
)

const Home: React.FC = () => {
  return (
    <>
      <Box background="purple.50">
        <Header />
        <PageContainer>
          <Box pt={16} pb={24}>
            <Heading fontSize="4xl">Wykorzystane zasoby</Heading>
          </Box>
        </PageContainer>
      </Box>
      <Box py={24}>
        <PageContainer>
          <SimpleGrid
            columns={{ md: 2, lg: 4 }}
            spacing={8}
            alignItems="flex-start"
          >
            <Attribution title="Grafika">
              Money vector created by pch.vector -{' '}
              <Link
                target="_blank"
                href="https://www.freepik.com/vectors/money"
              >
                www.freepik.com
              </Link>
            </Attribution>
            <Attribution title="Ikony">
              Icons made by{' '}
              <Link
                href="https://www.freepik.com"
                target="_blank"
                title="Freepik"
              >
                Freepik
              </Link>{' '}
              from{' '}
              <Link
                href="https://www.flaticon.com/"
                target="_blank"
                title="Flaticon"
              >
                www.flaticon.com
              </Link>
            </Attribution>
          </SimpleGrid>
        </PageContainer>
      </Box>
      <Divider />
      <Footer />
    </>
  )
}

export default Home
