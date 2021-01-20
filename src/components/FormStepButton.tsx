import * as React from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Text, Box, Flex, FlexProps } from '@chakra-ui/react'
import CheckIconBox from '../components/CheckIconBox'

const FormStepButton: React.FC<
  {
    disabled: boolean
    checked: boolean
    title: string
    onClick: React.MouseEventHandler<HTMLElement>
  } & FlexProps
> = ({ disabled, checked, title, onClick, ...props }) => (
  <Flex
    as="button"
    textAlign="left"
    disabled={disabled}
    onClick={onClick}
    {...props}
  >
    <Box>
      <CheckIconBox checked={checked} />
    </Box>
    <Text
      as="span"
      fontWeight="bold"
      fontSize="1.125em"
      color="brand.900"
      ml={4}
      opacity={disabled ? 0.4 : 1}
      transition="0.2 all ease"
    >
      {title}
    </Text>
  </Flex>
)

export default FormStepButton
