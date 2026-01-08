import { Flex, Text, Icon, Link } from '@chakra-ui/react';
import React from 'react';

const NavItem = props => {
  const { icon, href, name, ...rest } = props;
  let isDiscordLink = href.includes('discord');
  return (
    <Link href={href} style={{ textDecoration: 'none' }} isExternal={isDiscordLink}>
      <Flex align="center" borderRadius="1" p="4" mx="4" role="group" cursor="pointer" {...rest}>
        {icon && <Icon mr="4" fontSize="16" color="white" as={icon} />}
        <Text fontWeight="bold" color="white">
          {name}
        </Text>
      </Flex>
    </Link>
  );
};

export default NavItem;
