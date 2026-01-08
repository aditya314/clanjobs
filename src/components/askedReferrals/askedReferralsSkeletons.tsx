import { Heading } from '@chakra-ui/react';
import React from 'react';

export function AskedReferralsLoader() {
  return (
    <Heading as="h2" size="md" color="gray.500" py={2}>
      Fetching asked referrals for you...
    </Heading>
  );
}

export function AskedReferralsFailureAlert() {
  return <Heading>Failed to load asked referrals</Heading>;
}

export function AskedReferralsPagesCompletedAlert() {
  return (
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  );
}
