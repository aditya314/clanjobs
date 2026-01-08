import {
  Icon,
  Avatar,
  Button,
  HStack,
  VStack,
  Text,
  Flex,
  Link,
  Tooltip,
  WrapItem,
  Tag,
  Wrap,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import ReferralStateMenu from '@components/common/referralMenu';
import ResumeActionsContainer from '../../common/resumeActionsContainer';
import { REFERRAL_STATE } from '@src/mongoDb/daoModels/referralModels/referralRequestModel/types';
import { NetworkType, YearsOfExperience } from '@src/graphql/types';

function JobApplicantMeta(props: {
  name: any;
  role: any;
  collegeName: any;
  href: any;
  companyName: string;
}) {
  return (
    <VStack>
      <Text fontWeight="bold">{props.name}</Text>
      <Text fontSize="sm" color="gray.700">
        {props.role} at
        <Text as="i" color="gray.900">
          <span> {props.companyName}</span>
        </Text>
      </Text>
      <Text fontSize="sm" color="gray.700">
        {props.collegeName}
      </Text>
      <Text fontSize="sm" color="gray.600" as="span">
        Applied for&nbsp;
        <Link href={props.href} fontWeight="bold" color="black">
          {props.role}
          <ExternalLinkIcon mx="2px" align="baseline" />
        </Link>
      </Text>
    </VStack>
  );
}

export function ReferralRequestMetaTags({
  yearsOfExperience,
  networkType,
}: {
  yearsOfExperience: YearsOfExperience;
  networkType: NetworkType;
}) {
  return (
    <Wrap>
      <WrapItem>
        <Tag size="sm" variant="subtle" colorScheme="pink" rounded="lg">
          {yearsOfExperience.years} Years {yearsOfExperience.months} Months
        </Tag>
      </WrapItem>
      <WrapItem>
        <Tag size="sm" variant="subtle" colorScheme="blue" rounded="lg">
          {networkType}
        </Tag>
      </WrapItem>
    </Wrap>
  );
}

export function AppliedDateMetaTag({ appliedDate }) {
  return (
    <Tag fontSize={['xs', 'sm']} bgColor="gray.200" mt="2rem" color="black">
      Applied on {appliedDate}
    </Tag>
  );
}

export default function ReferralRequestCardMobile({
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
  networkType,
  appliedDate,
  referralRequestState = REFERRAL_STATE.APPLIED,
}) {
  return (
    <VStack
      boxShadow="md"
      rounded="lg"
      my="5"
      // width="20rem"
      minWidth="320px"
      maxWidth="480px"
      p={4}
      _hover={{
        boxShadow: 'lg',
      }}
    >
      <Avatar name={name} src={src} size="2xl" justify="center" />
      {/*TODO Post Integration <ResumeActionsContainer />*/}
      <ReferralStateMenu
        isApplicant={false}
        referralState={referralRequestState}
        username={username}
        referralRequestId={referralRequestId}
      />
      <JobApplicantMeta
        name={name}
        role={role}
        collegeName={collegeName}
        href={href}
        companyName={companyName}
      />
      <ReferralRequestMetaTags yearsOfExperience={yearsOfExperience} networkType={networkType} />
      <AppliedDateMetaTag appliedDate={appliedDate} />
    </VStack>
  );
}
