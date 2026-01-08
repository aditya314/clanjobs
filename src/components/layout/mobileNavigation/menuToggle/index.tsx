import React from 'react';
import {
  Box,
  Drawer,
  Text,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Tooltip,
  useColorModeValue,
  Icon,
  Button,
} from '@chakra-ui/react';
import MobileMenuItem from '@components/layout/mobileNavigation/menuToggle/mobileMenuItem';
import { FiMenu } from 'react-icons/fi';

const MobileMenuToggle = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Box>
      <Tooltip label="Menu">
        <Button variant="variantGhost" leftIcon={<FiMenu />} onClick={onOpen} />
      </Tooltip>
      <Drawer isOpen={isOpen} placement="top" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay>
          <DrawerContent borderTopRadius="6px">
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody pb={4}>
              <VStack>
                <MobileMenuItem href="/signin" title="Login" />
                <MobileMenuItem href="/signup" title="Sign Up" />
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default MobileMenuToggle;
