import React from 'react'
import {
  Text,
  Alert,
  AlertTitle,
  AlertDescription,
  chakra,
} from '@chakra-ui/react'
import { formatCurrency } from '../../utils/format'
import profit from '../../assets/profit.svg'

const PlanAlert: React.FC<{
  payment: number
}> = ({ payment }) => {
  return (
    <Alert
      bg="purple.50"
      status="success"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      pt={0}
      pb={8}
      px={8}
    >
      <chakra.img src={profit} maxWidth="md"></chakra.img>
      <AlertTitle mb={4} fontSize="2xl">
        Nie musisz oszczędzać na emeryturę!
      </AlertTitle>
      <AlertDescription maxWidth="xl">
        Przy zadanych parametrach symulacji nie musisz odkładać dodatkowych
        środków, aby móc wypłacać sobie osobistą emeryturę. Co więcej, możesz
        już od teraz wypłacać{' '}
        <Text as="span" fontWeight="bold">
          {formatCurrency(payment)}
        </Text>{' '}
        co miesiąc aż do momentu przejścia na emeryturę.
      </AlertDescription>
    </Alert>
  )
}

export default PlanAlert
