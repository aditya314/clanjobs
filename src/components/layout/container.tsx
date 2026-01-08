import React from 'react';
import { Box } from '@chakra-ui/react';

export const Container = props => (
  <Box w="full" mx="auto" maxW="6xl" px={{ base: '6', md: '2' }} {...props} />
);

export default Container;
