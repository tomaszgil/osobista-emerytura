import React from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { chakra, ChakraProps } from '@chakra-ui/react'
import * as imageCache from '../utils/imageCache'

const SuspenseImg: React.FC<{ src: string } & ChakraProps> = ({
  src,
  ...rest
}) => {
  return <chakra.img src={imageCache.read(src)} {...rest} />
}

export default SuspenseImg
