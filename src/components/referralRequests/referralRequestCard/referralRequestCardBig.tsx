import { Avatar, VStack, Flex, HStack, SimpleGrid, Link, Text } from '@chakra-ui/react';
import { JobLink } from '@src/components/jobDashboard/jobInfoComponent';
import ReferralStateMenu from '@components/common/referralMenu';
import {
  AppliedDateMetaTag,
  ReferralRequestMetaTags,
} from '@src/components/referralRequests/referralRequestCard/referralRequestCardMobile';
import ResumeActionsContainer from '@src/components/common/resumeActionsContainer';
import { REFERRAL_STATE } from '@src/mongoDb/daoModels/referralModels/referralRequestModel/types';

export default function ReferralRequestCardBig({
  username,
  referralRequestId,
  name,
  src,
  role,
  companyName,
  collegeName,
  href,
  label,
  yearsOfExperience,
  appliedDate,
  networkType,
  referralRequestState,
}) {
  const profileLink = '/profile/' + username;
  return (
    <Flex
      direction={['column', 'row']}
      minWidth="20rem"
      width="container.lg"
      boxShadow="md"
      rounded="lg"
      my="5"
      _hover={{
        boxShadow: 'lg',
      }}
    >
      <SimpleGrid templateColumns="1fr 4fr 2fr" width="100%" p={5}>
        <Link href={profileLink} isExternal>
          <Avatar name={name} src={src} size="2xl" justify="center" />
        </Link>
        <Flex direction="column" justifyContent="flex-start" px={4}>
          <HStack>
            <Link href={profileLink} isExternal>
              <Text fontWeight="bold">{name}</Text>
            </Link>
            {/*TODO Post Integration <ResumeActionsContainer />*/}u
          </HStack>
          <Text size="sm" color="gray.600">
            {role} at
            <Text size="sm" as="i" fontWeight="bold">
              <span> {companyName}</span>
            </Text>
          </Text>
          <Text size="sm" color="gray.600">
            {collegeName}
          </Text>
          <Flex align="baseline">
            <Text size="sm" color="gray.600" as="span">
              Applied for&nbsp;
            </Text>
            <JobLink href={href} role={label} />
          </Flex>
          <ReferralRequestMetaTags
            yearsOfExperience={yearsOfExperience}
            networkType={networkType}
          />
        </Flex>
        <VStack justify="space-between">
          <ReferralStateMenu
            isApplicant={false}
            referralState={referralRequestState}
            username={username}
            referralRequestId={referralRequestId}
          />
          <AppliedDateMetaTag appliedDate={appliedDate} />
        </VStack>
      </SimpleGrid>
    </Flex>
  );
}
