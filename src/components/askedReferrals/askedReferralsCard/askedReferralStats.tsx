import {
  Flex,
  HStack,
  SimpleGrid,
  Stat,
  Box,
  StatGroup,
  StatLabel,
  StatNumber,
  Tag,
} from '@chakra-ui/react';
import { REFERRAL_STATE } from '@src/mongoDb/daoModels/referralModels/referralRequestModel/types';
import { AskedReferralStat, ReferralState } from '@src/graphql/types';
import { find } from 'lodash';

function getReferrersCountGivenReferralState(askedReferralStats, referralState) {
  const askedReferralStat: AskedReferralStat = find(
    askedReferralStats,
    (askedReferralStat: AskedReferralStat) => askedReferralStat.referralState == referralState
  );
  return askedReferralStat.referrerCount;
}

export function AskedReferralStats({
  askedReferralStats,
}: {
  askedReferralStats: Array<AskedReferralStat>;
}) {
  return (
    <Flex grow={1}>
      <Stat>
        <StatLabel fontWeight={'light'}>{ReferralState.Applied}</StatLabel>
        <StatNumber fontWeight={'extrabold'} color="blue.600">
          {getReferrersCountGivenReferralState(askedReferralStats, ReferralState.Applied)}
        </StatNumber>
      </Stat>
      <Stat>
        <StatLabel fontWeight={'light'}>{ReferralState.InReview}</StatLabel>
        <StatNumber fontWeight={'extrabold'} color="orange.600">
          {getReferrersCountGivenReferralState(askedReferralStats, ReferralState.InReview)}
        </StatNumber>
      </Stat>
      <Stat>
        <StatLabel fontWeight={'light'}>{ReferralState.Declined}</StatLabel>
        <StatNumber fontWeight={'extrabold'} color="red">
          {getReferrersCountGivenReferralState(askedReferralStats, ReferralState.Declined)}
        </StatNumber>
      </Stat>
    </Flex>
  );
}
