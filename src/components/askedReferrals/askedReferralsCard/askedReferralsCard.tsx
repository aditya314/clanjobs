import { Flex, HStack, Image, Link, Text, Tooltip } from '@chakra-ui/react';
import ReferralStateMenu from '@components/common/referralMenu';
import { AskedReferralStats } from '@components/askedReferrals/askedReferralsCard/askedReferralStats';
import { AppliedDateMetaTag } from '@components/referralRequests/referralRequestCard/referralRequestCardMobile';
import { REFERRAL_STATE } from '@src/mongoDb/daoModels/referralModels/referralRequestModel/types';
import { ReferralState } from '@src/graphql/types';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export const REFERRAL_STATE_TEXT_COLOR_MAP = {
  [REFERRAL_STATE.APPLIED]: 'blue.800',
  [REFERRAL_STATE.IN_REVIEW]: 'orange.800',
  [REFERRAL_STATE.ACCEPTED]: 'green.800',
  [REFERRAL_STATE.DECLINED]: 'red.800',
  [REFERRAL_STATE.ACKNOWLEDGED]: 'pink.800',
};

function JobDetails(props: {
  role: string;
  companyName: string;
  location: string;
  jobUrl: string;
}) {
  return (
    <Flex direction="column" align={['center', 'flex-start']} my={2}>
      <Link href={props.jobUrl} fontWeight="bold" isExternal>
        <HStack my={2}>
          <Tooltip label={props.role}>
            <Text noOfLines={2}>{props.role}</Text>
          </Tooltip>
          <ExternalLinkIcon mx="1px" align="baseline" />
        </HStack>
      </Link>
      <Text color="blackAlpha.600" fontWeight="bold">
        {props.companyName}
      </Text>
      <Text color="gray">{props.location}</Text>
    </Flex>
  );
}

const stateMessageMap = {
  [ReferralState.Applied]: 'Waiting for requested people to review your profile.',
  [ReferralState.InReview]: 'Be patient. Your referral is in review by some people.',
  [ReferralState.Accepted]: 'Congratulations!! @aneesh-epari has accepted your referral request.',
};

export default function AskedReferralsCard({
  username,
  referralRequestId,
  role,
  companyName,
  location,
  companyLogoUrl,
  appliedDate,
  referralState,
  askedReferralStats,
  jobUrl,
}) {
  return (
    <Flex
      direction={['column', 'row']}
      width={['container.xs', 'container.lg']}
      boxShadow="lg"
      rounded="lg"
      _hover={{
        boxShadow: 'xl',
      }}
      p={2}
    >
      {/*TODO: To replace with an elegant solution for Image*/}
      <Flex justifyContent="center" m={1} p={[2, 4]}>
        <Image
          src={companyLogoUrl}
          alt={companyName}
          width="75px"
          height="75px"
          objectFit={'contain'}
        />
      </Flex>
      <Flex direction="column" width="100%" px={4}>
        <Flex direction={['column', 'row']} justify="space-between" width="100%">
          <JobDetails role={role} companyName={companyName} location={location} jobUrl={jobUrl} />
          <ReferralStateMenu
            isApplicant={true}
            referralState={REFERRAL_STATE[referralState]}
            username={username}
            referralRequestId={referralRequestId}
          />
        </Flex>
        <Text
          fontWeight={'medium'}
          color={REFERRAL_STATE_TEXT_COLOR_MAP[referralState]}
          justifyContent={['center', 'flex-start']}
          my={[3, 1]}
        >
          {stateMessageMap[referralState]}
        </Text>
        <Flex direction={['column', 'row']} py="1rem" width="100%" justify="space-between">
          <AskedReferralStats askedReferralStats={askedReferralStats} />
          <AppliedDateMetaTag appliedDate={appliedDate} />
        </Flex>
      </Flex>
    </Flex>
  );
}
