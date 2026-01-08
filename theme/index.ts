import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { Button } from '@theme/components/default/singlePart/button';
import { Card } from '@theme/components/custom/singlePart/card';

const customConfig = {
  colors: {
    brand: {
      50: '#ffe4e2',
      100: '#ffb5b1',
      200: '#ff877f',
      300: '#fe584e',
      400: '#fd2a1c',
      500: '#e31202',
      600: '#b10b01',
      700: '#800600',
      800: '#4e0200',
      900: '#200000',
    },
  },
  styles: {
    global: props => ({
      body: {
        color: mode('gray.700', 'whiteAlpha.900')(props),
        bg: mode('gray.50', 'gray.900')(props),
        // fontSize: '1.2em',
      },
    }),
  },
};
const customTheme = extendTheme({
  config: customConfig,
  // fonts: {
  //   body: "'Inter', sans-serif",
  // },
  components: {
    Button,
    Card,
  },
});

export default customTheme;
