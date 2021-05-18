import React from 'react'
import PageContainer from '../components/PageContainer'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ClippedHero from '../components/ClippedHero'
import InfoIconBox from '../components/InfoIconBox'
import {
  Box,
  Heading,
  Text,
  Divider,
  ListItem,
  OrderedList,
  Alert,
  AlertIcon,
  Container,
  VStack,
  Link,
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
        <ClippedHero imgSrc={retirement}>
          <Heading fontSize="4xl" mb={4}>
            Osobista emerytura
          </Heading>
          <Text fontSize="xl">
            Dlaczego warto stworzyć swój własny plan emerytalny. Dowiedz się
            więcej na temat sposobu, w jaki taki plan powstaje.
          </Text>
        </ClippedHero>
      </Box>
      <Box py={24}>
        <PageContainer>
          <Container maxWidth="3xl">
            <VStack spacing={16}>
              <VStack as="article" spacing={8}>
                <InfoIconBox
                  icon={health}
                  title="Kondycja ubezpieczeń społecznych"
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
                >
                  W tak długim okresie, jakim może być oszczędzanie na
                  emeryturę, procent składany diametralnie zmienia obraz
                  zgromadzonego majątku. Może się okazać, że potrzebujesz
                  oszczędzać miesięcznie zaledwie ułamek emerytury, którą
                  będziesz chciał sobie w przyszłości wypłacać. Im wcześniej
                  zaczniesz oszczędzać, tym mniej będziesz musiał odkładać w
                  każdym miesiącu przed emeryturą. To tak proste.
                </InfoIconBox>
                <InfoIconBox icon={weather} title="Dbanie o własną przyszłość">
                  Określając własny plan emerytalny uświadamiasz sobie ile tak
                  naprawdę jesteś w stanie zgromadzić. Może się okazać, że
                  niewielkim kosztem i systematycznością możesz znacząco
                  zwiększyć swoją przyszłą emeryturę lub samemu podjąć decyzję o
                  momencie przejścia na emeryturę. Mając tę wiedzę, możesz wziąć
                  sprawy w swoje ręce.
                </InfoIconBox>
                <InfoIconBox icon={stock} title="Droga do wolności finansowej">
                  Gromadząc kapitał w określonej wysokości oraz inwestując go
                  zgodnie z obraną strategią można dojść do momentu, w którym
                  zwroty z inwestycji pokrywają koszty życia. Określ wartość
                  kapitału, który odpowiednio zainwestowany, pozwoli pokryć
                  twoje koszty życia. Od tej chwili praca zarobkowa jest
                  opcjonalna.
                </InfoIconBox>
              </VStack>
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
                    Następnie liczymy ile powinieneś odkładać miesięcznie, aby
                    do momentu przejścia na emeryturę zebrać kapitał wynikający
                    z poprzednich obliczeń.
                  </ListItem>
                </OrderedList>
                <Text mb={4}>
                  Aby dokonać tych kalkulacji potrzebujemy kilku istotnych
                  informacji. Dla punktu pierwszego będzie to wiek, w którym
                  chcesz przejść na emeryturę oraz długość życia (niestety,
                  musimy przyjąć jakieś założenie). Ta ostatnia to domyślnie 80
                  lat, co można zmienić po wygenerowaniu planu.
                </Text>
                <Text mb={4}>
                  Dla punktu drugiego potrzebujemy również wieku przejścia na
                  emeryturę oraz twojego obecnego wieku. Zakładamy, że zaczynasz
                  oszczędzać już teraz - nie ma na co czekać!
                </Text>
                <Text mb={4}>
                  W obu tych przypadkach potrzebujemy również średniej stopy
                  zwrotu z inwestycji. Domyślnie przyjmujemy taką samą stopę
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
              <Box as="article">
                <Heading fontSize="3xl" mb={8}>
                  Polecane materiały
                </Heading>
                <VStack spacing={8}>
                  <Box>
                    <Heading fontSize="2xl" mb={4}>
                      Finansowy ninja (i blog jakoszczedzacpieniadze.pl)
                    </Heading>
                    <Text mb={4}>
                      Książka, która powinna być podręcznikiem w nauczaniu
                      szkolnym i jednocześnie zainspirowała powstanie tej
                      strony. Solidna i kompletna podstawa finansów osobistych,
                      od podejścia do pieniędzy, przez poznanie i zrozumienie
                      produktów finansowych, aż do oszczędzania oraz
                      inwestowania. Michał Szafrański, autor książki, prowadzi
                      również bloga o tematyce finansów osobistych, który
                      stanowi prawdziwą skarbnicę wiedzy. Zarówno w książce jak
                      i na blogu można znaleźć rozdziały i artykuły dedykowane
                      tematowi osobistej emerytury i wolności finansowej.
                    </Text>
                    <Text mb={2}>
                      <Link target="_blank" href="https://finansowyninja.pl/">
                        Finansowy ninja
                      </Link>
                    </Text>
                    <Text mb={2}>
                      <Link
                        target="_blank"
                        href="https://jakoszczedzacpieniadze.pl/"
                      >
                        Blog Jak oszczędzać pieniądze
                      </Link>
                    </Text>
                  </Box>
                  <Box>
                    <Heading fontSize="2xl" mb={4}>
                      Finanse bardzo osobiste
                    </Heading>
                    <Text mb={4}>
                      Blog Marcina Iwucia, również o tematyce finansów
                      osobistych. Na stronie można znaleźć wiele artykułów
                      poruszających tematykę emerytury, zarówno dotyczących
                      państwowej emerytury oraz emerytury osobistej.
                    </Text>
                    <Text mb={2}>
                      <Link target="_blank" href="https://marciniwuc.com/">
                        Finanse bardzo osobiste
                      </Link>
                    </Text>
                  </Box>
                  <Box>
                    <Heading fontSize="2xl" mb={4}>
                      App Funds
                    </Heading>
                    <Text mb={4}>
                      Blog o tematyce związanej z inwestowaniem i pomnażaniem
                      oszczędności, autorstwa Zbyszka Papińskiego. Szerokie
                      spojrzenie na różne produkty finansowe, przez lokaty,
                      konta oszczędnościowe, giełdę czy surowce.
                    </Text>
                    <Text mb={2}>
                      <Link
                        target="_blank"
                        href="https://appfunds.blogspot.com/"
                      >
                        App Funds
                      </Link>
                    </Text>
                  </Box>
                </VStack>
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
