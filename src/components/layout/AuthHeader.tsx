import {
  Box,
  useColorModeValue,
  VStack,
  Icon,
  HStack,
  Button,
  Avatar,
  Link,
  Tooltip,
} from '@chakra-ui/react';
import Container from '@src/components/layout/container';
import Logo from '@src/components/common/logo';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/client';
import { QuestionOutlineIcon } from '@chakra-ui/icons';

function getColorOnHeaderScroll(hasScrolled: boolean): string {
  if (hasScrolled) return 'whiteAlpha.800';
  return 'white';
}

//TODO Handle Header in Mobile layout
const AuthHeader = ({ name, imageSource }) => {
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
              <Avatar name={name} src={imageSource} />;
              <Link href={'https://discord.gg/UpzrDDXVD8'} isExternal>
                {/*#feedback-and-support*/}
                <Tooltip label="Send feedback or ask support from ClanJobs">
                  <Icon as={QuestionOutlineIcon} w={7} h={7} />
                </Tooltip>
              </Link>
              {/*do not remove, can be used for reference*/}
              {/*<Link href="/api/auth/signout" passHref>*/}
              <Button
                variant="variantSolid"
                onClick={e => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Log out
              </Button>
              {/*</Link>*/}
            </HStack>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};
export default AuthHeader;
