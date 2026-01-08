import { Box, useColorModeValue, VStack, HStack, Button } from '@chakra-ui/react';
import Container from '@src/components/layout/container';
import Logo from '@src/components/common/logo';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import React from 'react';
import MobileNavigation from '@components/layout/mobileNavigation';

function getColorOnHeaderScroll(hasScrolled: boolean): string {
  if (hasScrolled) return 'whiteAlpha.800';
  return 'white';
}

//TODO Handle Header in Mobile layout
const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  // Detect whether user has scrolled the page down by 64px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 64 ? setHasScrolled(true) : setHasScrolled(false);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [hasScrolled]);

  return (
    <React.Fragment>
      <Box
        bg={useColorModeValue(getColorOnHeaderScroll(hasScrolled), 'gray.800')}
        display={{ base: 'none', md: 'block' }}
        position="fixed"
        w="100%"
        zIndex={99}
        shadow="sm"
      >
        <Container>
          <VStack align="center">
            <HStack justify="space-between" w="100%" h={16}>
              <Logo />
              <HStack justify="space-between" spacing={6}>
                <Link href="/signin" passHref>
                  <Button variant="variantGhost">Login</Button>
                </Link>
                <Link href="/signup" passHref>
                  <Button variant="variantSolid">Sign Up</Button>
                </Link>
              </HStack>
            </HStack>
          </VStack>
        </Container>
      </Box>
      {/* Mobile Navigation */}
      <MobileNavigation />
    </React.Fragment>
  );
};
export default Header;
