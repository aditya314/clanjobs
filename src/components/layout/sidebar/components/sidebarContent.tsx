import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  useDisclosure,
  VStack,
  Heading,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { FiSettings, FiTrendingUp } from 'react-icons/fi';
import {
  FaUser,
  FaUsers,
  FaSearch,
  FaStar,
  FaPaperPlane,
  FaEnvelopeOpenText,
} from 'react-icons/fa';
import NavItem from '@src/components/layout/sidebar/components/navItem';
import Logo from '@src/components/common/logo';
import { signOut, useSession } from 'next-auth/client';
import UnauthorisedPage from '@components/layout/UnauthorisedPage';
import UserGemInfo from '@components/layout/sidebar/components/userGemInfo';

function NavAvatarInfo() {
  const [session, sessionLoading] = useSession();
  if (!session && !sessionLoading) {
    return <UnauthorisedPage />;
  }
  if (sessionLoading) {
    return <Heading>Loading</Heading>;
  }
  return (
    <Flex direction="column">
      <UserGemInfo username={session.username} alternatePic={session.user.image} />
      <Button m={4} p={2} onClick={() => signOut()}>
        Sign out
      </Button>
    </Flex>
  );
}

function NavLinks() {
  const referrals = useDisclosure();
  const editProfile = useDisclosure();
  const [session, sessionLoading] = useSession();

  return (
    <VStack align="flex-start">
      <NavItem icon={FaSearch} name={'Find Referrals'} href={'/job-dashboard'} />
      <NavItem icon={FaUser} name={'My Profile'} href={'/profile/' + session?.username} />
      {/*<NavItem name="Referrals" icon={ChevronDownIcon} onClick={referrals.onToggle} />*/}
      {/*<Collapse in={referrals.isOpen}>*/}
      <NavItem name="Asked Referrals" icon={FiTrendingUp} href={'/asked-referrals'} />
      <NavItem name="Referral Requests" icon={FaPaperPlane} href={'/referral-requests'} />
      <NavItem name="Referral Settings" icon={FiSettings} href={'/referral-settings'} />
      <NavItem name="Contact us" icon={FaEnvelopeOpenText} href={'https://discord.gg/UpzrDDXVD8'} />
      {/*</Collapse>*/}
      {/*<NavItem name="Edit Profile" icon={ChevronDownIcon} onClick={editProfile.onToggle} />*/}
      {/*/!* TODO To add icons and href correctly *!/*/}
      {/*<Collapse in={editProfile.isOpen}>*/}
      {/*  <NavItem name="Profile" icon={FaUser} href="/asked-referrals" />*/}
      {/*  <NavItem name="Clans" icon={FaUsers} href="/referral-requests" />*/}
      {/*  <NavItem name="Highlights" icon={FaStar} href="/referral-settings" />*/}
      {/*  <NavItem name="Preferences" icon={FiSettings} href="/referral-settings" />*/}
      {/*</Collapse>*/}
    </VStack>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue('gray.800', 'gray.900')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" justifyContent="space-between">
        <Logo isInverted={true} />
        <CloseButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onClose}
          mr="2rem"
          color="white"
        />
      </Flex>
      <Flex direction={'column'} align="flex-start" justify="space-between" minH="85vh">
        <NavLinks />
        <NavAvatarInfo />
      </Flex>
    </Box>
  );
};

export default SidebarContent;
