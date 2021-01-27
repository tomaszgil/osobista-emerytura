const Button = {
  baseStyle: {
    fontWeight: 'medium',
  },
  variants: {
    primary: {
      backgroundColor: 'brand.800',
      color: 'white',
    },
    ghost: {
      color: 'brand.900',
      backgroundColor: 'purple.50',
      _hover: {
        backgroundColor: 'purple.100',
      },
    },
  },
  defaultProps: {
    variant: 'primary',
  },
}

export default Button
