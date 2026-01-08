export const Card = {
  baseStyle: {
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    // alignItems: 'center',
    gap: 2,
  },
  variants: {
    rounded: {
      padding: 8,
      borderRadius: 'xl',
      boxShadow: 'xl',
    },
    smooth: {
      padding: 6,
      borderRadius: 'base',
      boxShadow: 'md',
    },
  },
  defaultProps: {
    variant: 'smooth',
  },
};
