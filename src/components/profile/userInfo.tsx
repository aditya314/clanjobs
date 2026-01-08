import { Avatar, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';

export default function UserInfoBlock({
  name,
  profileHeadline,
  profilePicUrl,
}: {
  name: string;
  profileHeadline: string;
  profilePicUrl: string;
}) {
  const avatarSize = useBreakpointValue({ base: 'lg', md: 'xl' });
  const headingSize = useBreakpointValue({ base: 'xl', md: '3xl' });
  const subheadingSize = useBreakpointValue({ base: 'sm', md: 'md' });

  return (
    <Flex align="center">
      <Avatar size={avatarSize} name={name} src={profilePicUrl} />
      <Flex direction="column" p={2} ml={6}>
        <Text fontSize={headingSize} fontWeight={'bold'}>
          {name}
        </Text>
        <Text fontSize={subheadingSize} fontWeight={'semibold'} color="gray.500">
          {profileHeadline}
        </Text>
      </Flex>
    </Flex>
  );
}
