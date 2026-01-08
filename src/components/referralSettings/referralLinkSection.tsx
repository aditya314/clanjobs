import { Button, Flex, Input, Text, useClipboard } from '@chakra-ui/react';
import React from 'react';
import SocialShare from '@src/components/referralSettings/socialShare';
import ConfigureReferralSettings from '@src/components/referralSettings/configureReferralSettings';

export default function ReferralLinkSection({
  referralLink,
  clans,
  companyName,
  referralSettings,
  getUserReferralClansRefetch,
}) {
  const { hasCopied, onCopy } = useClipboard(referralLink);
  return (
    <Flex mt={12} mb={2} direction="column">
      <Text fontSize={'2xl'} fontWeight="semibold" color="gray.900">
        Your referral link
      </Text>
      <Flex direction={['column', 'row']} my={2}>
        <Input
          width={['100%', '30%']}
          variant="filled"
          value={referralLink}
          isReadOnly
          placeholder="Your-referral-link"
          mb={[2, 0]}
        />
        <Button colorScheme={'teal'} onClick={onCopy} mx={[0, 2]} my={[2, 0]} mb={[6, 0]}>
          {hasCopied ? 'Copied' : 'Copy'}
        </Button>
        <ConfigureReferralSettings
          clans={clans}
          referralSettings={referralSettings}
          getUserReferralClansRefetch={getUserReferralClansRefetch}
        />
      </Flex>
      <Flex direction={'column'} my={5}>
        <Text py={1} color="gray.500">
          Share your personal referral link to get referrals from people across social media
          channels
        </Text>
        <SocialShare company={companyName} referralLink={referralLink} />
      </Flex>
    </Flex>
  );
}
