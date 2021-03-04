import React from 'react'
import {
  Text,
  Alert,
  AlertTitle,
  AlertDescription,
  Skeleton,
  AspectRatio,
} from '@chakra-ui/react'
import { formatCurrency } from '../../utils/format'
import profit from '../../assets/profit.svg'
import SuspenseImg from '../../components/SuspenseImg'

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
      p={8}
    >
      <React.Suspense
        fallback={
          <AspectRatio width="md" ratio={4 / 2} mb={4}>
            <Skeleton width="100%" height="100%" colorScheme="orange" />
          </AspectRatio>
        }
      >
        <SuspenseImg src={profit} maxWidth="md" mt={-8} />
      </React.Suspense>
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
