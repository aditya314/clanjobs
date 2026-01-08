import {
  Avatar,
  Badge,
  Flex,
  Heading,
  HStack,
  Stat,
  StatHelpText,
  StatNumber,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_USER_GEMS = gql`
  query userGems($username: ID!) {
    user(username: $username) {
      username
      name
      profilePicUrl
      gemCount
    }
  }
`;

export default function UserGemInfo({ username, alternatePic }) {
  const textColor = useColorModeValue('white', 'gray.200');
  const { loading, error, data } = useQuery(GET_USER_GEMS, {
    variables: {
      username: username,
    },
  });
  if (loading)
    return (
      <Text size="md" color="gray.500" my={2}>
        Fetching gems info
      </Text>
    );

  if (error) return <Heading>Failed to load your info</Heading>;
  return (
    <Flex direction="column">
      <HStack align="center">
        <Avatar src={data.user.profilePicUrl} mx="4" />
        <VStack spacing={2} align="start">
          <Text fontWeight="bold" fontSize="md" noOfLines={2} color={textColor} mx={1}>
            {data.user.name}
          </Text>
          <Text fontSize="sm" color={textColor}>
            @{username}
          </Text>
        </VStack>
      </HStack>
      <Stat m={4} color={textColor}>
        <StatHelpText>Available Clan Gems</StatHelpText>
        <StatNumber>{data.user.gemCount}</StatNumber>
      </Stat>
    </Flex>
  );
}
