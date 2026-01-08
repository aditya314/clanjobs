import React from 'react';
import { Box, SimpleGrid, Text, Heading, VStack, Stack, useColorModeValue } from '@chakra-ui/react';
import { FcPrivacy, FcServices, FcPortraitMode, FcSearch } from 'react-icons/fc';
import Container from '@src/components/layout/container';

export const Feature = ({ title, children, icon }) => {
  return (
    <Stack spacing={{ base: '3', md: '6' }} direction={{ base: 'column', md: 'row' }}>
      <Box fontSize="6xl">{icon}</Box>
      <Stack spacing="1">
        <Text fontWeight="extrabold" fontSize="lg">
          {title}
        </Text>
        <Box color={useColorModeValue('gray.600', 'gray.400')}>{children}</Box>
      </Stack>
    </Stack>
  );
};

export default function FeatureBlocks() {
  return (
    <Container maxW="5xl">
      <VStack m={2} p={2}>
        <Heading fontWeight="extrabold" fontSize={{ base: '4xl', md: '6xl' }}>
          Why ClanJobs ?
        </Heading>
        <Text color={'gray.500'} fontSize={{ base: 'lg', md: 'xl' }} fontWeight={'semibold'}>
          Explore ClanJobs unique features which makes it using so simple
        </Text>
      </VStack>
      <SimpleGrid
        my="3rem"
        p="1rem"
        columns={{ base: 1, md: 2 }}
        spacingX="3rem"
        spacingY={{ base: '8', md: '14' }}
      >
        <Feature title="No Connection Requests" icon={<FcPortraitMode />}>
          No more connection requests, We provide out-of-the-box networking for people clans you
          have already worked with.
        </Feature>
        <Feature title="Scoped Referrals" icon={<FcPrivacy />}>
          No more spamming with referral requests. Choose the people/clans who can ask you for a
          referral.
        </Feature>
        <Feature title="Referral Management" icon={<FcServices />}>
          Manage all your referral requests in one place your unified referral link to get request
          across any platform.
        </Feature>
        <Feature title="Review Referrals" icon={<FcSearch />}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Reviews are now made easy. View applicant's profile which highlights the applicant's
          experience and information.
        </Feature>
      </SimpleGrid>
    </Container>
  );
}
