import {
  Box,
  chakra,
  HStack,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaDiscord, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { ReactNode } from 'react';
import Logo from '@src/components/common/logo';
import Container from '@src/components/layout/container';

export default function Footer() {
  //TODO Handle Footer UI Issues and Mobile Layouts
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={'center'}
        >
          <Logo />
          <Text align="center">© 2021 ClanJobs Pvt. Limited. All rights reserved</Text>
          <HStack spacing={6}>
            <SocialButton label={'LinkedIn'} href={'https://www.linkedin.com/company/clanjobs'}>
              <FaLinkedin />
            </SocialButton>
            <SocialButton label={'Discord'} href={'https://discord.gg/Z7nFA4XQFM'}>
              <FaDiscord />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
              <FaInstagram />
            </SocialButton>
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
}

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <Box
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Box>
  );
};
