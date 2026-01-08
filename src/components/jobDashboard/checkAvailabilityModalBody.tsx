import { ModalBody } from '@chakra-ui/modal';
import {
  Flex,
  Stack,
  Avatar,
  AvatarGroup,
  Text,
  SimpleGrid,
  useBreakpointValue,
} from '@chakra-ui/react';
import { keys, map, reduce } from 'lodash';

const getReferrerAvatar = referrer => {
  return <Avatar name={referrer.name} src={referrer.profilePicUrl} />;
};

function ReferrersInfoText({ clanName, companyName }) {
  const textFontSize = useBreakpointValue({ base: 'xs', md: 'md' });
  return clanName != 'PUBLIC' ? (
    <Text fontSize={textFontSize} color="gray.500">
      from&nbsp;
      <Text as="span" color="black">
        {clanName}
      </Text>
    </Text>
  ) : (
    <Text fontSize={textFontSize} color="gray.500">
      from&nbsp;
      <Text as="span" color="black">
        {companyName}
      </Text>
      <Text as={'span'}>&nbsp;outside your clan network</Text>
    </Text>
  );
}

function ReferrerGridItem({ referrers, clanName, companyName }) {
  const avatarSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const numberFontSize = useBreakpointValue({ base: '2xl', md: '4xl' });
  return referrers.length > 0 ? (
    <>
      <AvatarGroup size={avatarSize} max={3}>
        {map(referrers, referrer => getReferrerAvatar(referrer))}
      </AvatarGroup>
      <Flex alignItems={'center'}>
        <Text fontSize={numberFontSize} pr={1}>
          {referrers.length}&nbsp;
        </Text>
        <ReferrersInfoText clanName={clanName} companyName={companyName} />
      </Flex>
    </>
  ) : (
    <></>
  );
}

export function CheckAvailabilityModalBody({ companyName, acceptingReferrers }) {
  let clanWiseReferrers = acceptingReferrers.acceptingReferrersClanWise;
  let publicReferrers = acceptingReferrers.acceptingReferrersPublic;
  if (
    reduce(
      clanWiseReferrers.users,
      (totalReferrers, userList) => totalReferrers + userList.length,
      0
    ) === 0 &&
    publicReferrers.users.length === 0
  ) {
    return (
      <Text>No one inside or outside your clan network is accepting referrals for this job.</Text>
    );
  }
  return (
    <ModalBody>
      <SimpleGrid templateColumns="2fr 4fr" alignItems="center" spacing={2}>
        {map(clanWiseReferrers, referrerInfo => (
          <ReferrerGridItem
            key={referrerInfo.clanInfo.id}
            referrers={referrerInfo.users}
            clanName={referrerInfo.clanInfo.name}
            companyName={companyName}
          />
        ))}
        <ReferrerGridItem
          key={'public'}
          referrers={publicReferrers.users}
          clanName={'PUBLIC'}
          companyName={companyName}
        />
      </SimpleGrid>
    </ModalBody>
  );
}
