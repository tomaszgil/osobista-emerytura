import { extendTheme } from '@chakra-ui/react'
import Button from './button'
import Link from './link'
import Heading from './heading'
import Input from './input'
import Alert from './alert'
import Skeleton from './skeleton'

const colors = {
  brand: {
    900: '#05074C',
    800: '#3E2093',
    700: '#8758FA',
    600: '#FA949D',
  },
}

const theme = extendTheme({
  colors,
  styles: {
    global: {
      'html, body': {
        color: 'gray.700',
      },
    },
  },
  fonts: {
    heading: 'Work Sans',
    body: 'Work Sans',
  },
  components: {
    Button,
    Link,
    Heading,
    Input,
    Alert,
    Skeleton,
  },
})

export default theme
