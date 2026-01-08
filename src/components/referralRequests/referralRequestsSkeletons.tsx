import { Heading } from '@chakra-ui/react';
import React from 'react';

export function ReferralRequestsLoader() {
  return (
    <Heading as="h2" size="md" color="gray.500" py={2}>
      Fetching asked referrals for you...
    </Heading>
  );
}

export function ReferralRequestsFailureAlert() {
  return <Heading>Failed to load asked referrals</Heading>;
}

export function ReferralRequestsPagesCompletedAlert() {
  return (
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  );
}
