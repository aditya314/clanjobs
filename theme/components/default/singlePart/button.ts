export const Button = {
  baseStyle: {
    // fontWeight: 'bold',
    // textTransform: 'uppercase',
    borderRadius: 'md',
  },
  sizes: {},
  variants: {
    variantSolid: {
      color: 'whiteAlpha.900',
      bgColor: 'gray.900',
      borderWidth: '1px',
      borderColor: 'black',
      _hover: {
        color: 'gray.900',
        bgColor: 'whiteAlpha.900',
        borderColor: 'black',
      },
    },
    variantGhost: {
      color: 'gray.500',
      _hover: {
        color: 'black',
      },
    },
    themed: {
      color: 'whiteAlpha.900',
      bgColor: 'gray.900',
      _hover: {
        color: 'whiteAlpha.900',
        bgGradient: 'linear-gradient(to right, #FE5F55 0%, #F59E0B 50%)',
      },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
    rounded: 'lg',
  },
};
