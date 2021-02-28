import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import RouteChangeTracker from './components/RouteChangeTracker'
import ScrollRestore from './components/ScrollRestore'
import FullPageSpinner from './components/FullPageSpinner'
import theme from './styles/theme'
import { initialize } from './utils/analytics'

const HomeScreen = React.lazy(
  () => import(/* webpackPrefetch: true */ './screens/Home')
)
const PlanScreen = React.lazy(
  () => import(/* webpackPrefetch: true */ './screens/Plan')
)
const NotFoundScreen = React.lazy(() => import('./screens/NotFound'))
const AssetsScreen = React.lazy(() => import('./screens/Assets'))
const RetirementScreen = React.lazy(() => import('./screens/Retirement'))

initialize()

export const App: React.FC = () => (
  <ChakraProvider theme={theme}>
    <React.Suspense fallback={<FullPageSpinner />}>
      <Router>
        <ScrollRestore>
          <Switch>
            <Route exact path="/">
              <HomeScreen />
            </Route>
            <Route path="/plan">
              <PlanScreen />
            </Route>
            <Route path="/zasoby">
              <AssetsScreen />
            </Route>
            <Route path="/emerytura">
              <RetirementScreen />
            </Route>
            <Route>
              <NotFoundScreen />
            </Route>
          </Switch>
          <RouteChangeTracker />
        </ScrollRestore>
      </Router>
    </React.Suspense>
  </ChakraProvider>
)
