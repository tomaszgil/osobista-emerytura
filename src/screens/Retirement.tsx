import React from 'react'
import PageContainer from '../components/PageContainer'
import Header from '../components/Header'
import Footer from '../components/Footer'
import InfoIconBox from '../components/InfoIconBox'
import {
  Box,
  Heading,
  Stack,
  Text,
  Divider,
  ListItem,
  OrderedList,
  Alert,
  AlertIcon,
  chakra,
  Container,
  VStack,
} from '@chakra-ui/react'
import retirement from '../assets/retirement.svg'
import clock from '../assets/clock.svg'
import weather from '../assets/weather.svg'
import stock from '../assets/stock.svg'
import health from '../assets/health.svg'

const Home: React.FC = () => {
  return (
    <>
      <Box background="purple.50" overflow="hidden">
        <Header />
        <PageContainer>
          <Box pt={16} pb={24}>
            <Stack direction={{ md: 'row', base: 'column' }} spacing={8}>
              <Box flex="1">
                <Heading fontSize="4xl" mb={4}>
                  Emerytura
                </Heading>
                <Text fontSize="xl">
                  Dlaczego warto stworzyć swój własny plan emerytalny. Dowiedz
                  się więcej na temat sposóbu, w jaki taki plan powstaje.
                </Text>
              </Box>
              <Box flex="1" position="relative">
                <chakra.img
                  src={retirement}
                  position={{ md: 'absolute' }}
                  top={{ lg: '-4em' }}
                  width="100%"
                ></chakra.img>
              </Box>
            </Stack>
          </Box>
        </PageContainer>
      </Box>
      <Box py={24}>
        <PageContainer>
          <Container maxWidth="3xl">
            <VStack spacing={16}>
              <Box as="article">
                <Heading fontSize="3xl" mb={8}>
                  Dlaczego osobista emerytura?
                </Heading>
                <InfoIconBox
                  icon={health}
                  title="Kondycja ubezpieczeń społecznych"
                  mb={8}
                >
                  W 2015 roku na wypłatę emerytur z ZUS potrzebował dotacji ze
                  Skarbu Państwa w wysokości 42&nbsp;mld złotych (co stanowiło
                  ponad 20% świadczeń wypłaconych tego roku). Prognozuje się, że
                  za ok. 30 lat emerytura będzie wynosić nie więcej niż 30%
                  ostatniego wynagrodzenia. W takim scenariuszu osoba
                  zarabiająca 5&nbsp;000 złotych otrzyma około 1&nbsp;500
                  złotych emerytury.
                </InfoIconBox>
                <InfoIconBox
                  icon={clock}
                  title="Horyzont czasowy działa na twoją korzyść"
                  mb={8}
                >
                  W tak długim okresie, jakim może być oszczędzanie na
                  emeryturę, procent składany diametralnie zmienia obraz
                  zgromadzonego majątku. Może się okazać, że potrzebujesz
                  oszczędzać miesięcznie zaledwie ułamek emerytury, którą
                  będziesz chciał sobie w przyszłości wypłacać. Im wcześniej
                  zaczniesz oszczędzać, tym mniej będziesz musiał odkładać w
                  każdym miesiącu przed emeryturą. To tak proste.
                </InfoIconBox>
                <InfoIconBox
                  icon={weather}
                  title="Dbanie o własną przyszłość"
                  mb={8}
                >
                  Określając własny plan emerytalny uświadamiasz sobie ile tak
                  naprawdę jesteś w stanie zgromadzić. Może się okazać, że
                  niewielkim kosztem i systematycznością możesz znacząco
                  zwiększyć swoją przyszłą emeryturę lub samemu podjąć decyzję o
                  momencie przejścia na emeryturę. Mając tę wiedzę, możesz wziąć
                  sprawy w swoje ręce.
                </InfoIconBox>
                <InfoIconBox
                  icon={stock}
                  title="Droga do wolności finansowej"
                  mb={8}
                >
                  Gromadząc kapitał w określonej wysokości oraz inwestując go
                  zgodnie z obraną strategią można dojść do momentu, w którym
                  zwroty z inwestycji pokrywają koszty życia. Określ wartość
                  kapitału, który, odpowiednio zainwestowany, pozwoli porkyć
                  twoje koszty życia. Od tej chwili praca zarobkowa jest
                  opcjonalna.
                </InfoIconBox>
              </Box>
              <Box as="article">
                <Heading fontSize="3xl" mb={8}>
                  Model obliczeń
                </Heading>
                <Text mb={4}>
                  Stworzenie planu emerytalnego odbywa się w dwóch prostych
                  krokach.
                </Text>
                <OrderedList mb={4}>
                  <ListItem>
                    Najpierw liczymy ile kapitału będziesz potrzebować w dniu
                    przejścia na emeryturę, aby móc co miesiąc wypłacać
                    zadeklarowaną przez ciebie kwotę.
                  </ListItem>
                  <ListItem>
                    Następnie liczymy ile powinienieś odkładać miesięcznie, aby
                    do momentu przejścia na emeryturę zebrać kapitał wynikający
                    z poprzednich obliczeń.
                  </ListItem>
                </OrderedList>
                <Text mb={4}>
                  Aby dokonać tych kalkulacji potrzebujemy kilku istotnych
                  informacji. Dla punku pierwszego będzie to wiek, w którym
                  chcesz przejść na emeryturę oraz długość życia (niestety,
                  musimy przyjąć jakieś założenie). Ta ostatnia to domyślnie 80
                  lat, co można zmienić po wygenerowaniu planu.
                </Text>
                <Text mb={4}>
                  Dla punku drugiego potrzebujemy również wieku przejścia na
                  emeryturę oraz twojego obecnego wieku. Zakładamy, że zaczynasz
                  oszczędzędzać już teraz - nie ma na co czekać!
                </Text>
                <Text mb={4}>
                  W obu tych przypadkach potrzebujemy również średniej stopy
                  zwrotu z inwestycji. Domyślnie przyjemujemy taką samą stopę
                  inwestycji w okresie przed przejściem na emeryturę i po
                  przejściu na emeryturę. W późniejszym etapie możesz dostosować
                  każdą z tych wartości indywidualnie.
                </Text>
                <Alert colorScheme="purple">
                  <AlertIcon />
                  Symulacja nie uwzględnia dwóch istotnych elementów - inflacji
                  oraz podatku od zysków kapitałowych obowiązującego w Polsce.
                  Dlatego warto podać oczekiwane stopy zwrotu z inwestycji jako
                  procent ponad inflację oraz z uwzględnieniem podatku.
                </Alert>
              </Box>
            </VStack>
          </Container>
        </PageContainer>
      </Box>
      <Divider />
      <Footer />
    </>
  )
}

export default Home
