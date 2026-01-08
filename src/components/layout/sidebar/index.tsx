import React, { ReactNode } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  DrawerOverlay,
} from '@chakra-ui/react';
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings, FiMenu } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import MobileNav from '@src/components/layout/sidebar/components/mobileNav';
import SidebarContent from '@src/components/layout/sidebar/components/sidebarContent';

export default function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" as="section">
      <SidebarContent onClose={onClose} display={{ base: 'none', md: 'block' }} />
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} p={4} transition=".3s ease">
        {children}
      </Box>
    </Box>
  );
}
