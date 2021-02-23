import * as React from 'react'
import { Stack, useRadioGroup } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import FormStep from '../../components/FormStep'
import RadioTile from '../../components/RadioTile'
import bank from '../../assets/bank.svg'
import news from '../../assets/news.svg'
import stock from '../../assets/stock.svg'

const ReturnOnInvestmentStep: React.FC<{ title: string }> = ({ title }) => {
  const options = [
    {
      title: 'Bankowe produkty inwestycyjne',
      value: '3',
      icon: bank,
    },
    {
      title: 'Fundusze inwestycyjne oraz obligacje',
      value: '5',
      icon: news,
    },
    {
      title: 'Fundusze indeksowe oraz akcje indywidualne',
      value: '8',
      icon: stock,
    },
  ]

  const { setFieldValue } = useFormikContext()

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'returnOnInvestment',
    defaultValue: '3',
    onChange: (value: string) => {
      setFieldValue('returnOnInvestmentDuringSaving', value)
      setFieldValue('returnOnInvestmentDuringRetirement', value)
    },
  })

  const group = getRootProps()

  return (
    <FormStep
      title={title}
      description="Wybierz przykładowy sposób pomnażania oszczędności, którego stopa zwrotu najlepiej odzwierciedla twoje możliwości inwestycyjne. Dokładną stopę zwrotu będziesz mógł dostosować później."
    >
      <Stack
        spacing={6}
        direction={{ md: 'row', base: 'column' }}
        alignItems="stretch"
        {...group}
      >
        {options.map(({ title, value, icon }) => {
          const props = getRadioProps({
            value,
            enterKeyHint: value,
          })
          return <RadioTile key={value} title={title} icon={icon} {...props} />
        })}
      </Stack>
    </FormStep>
  )
}

export default ReturnOnInvestmentStep
