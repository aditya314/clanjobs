import { Button, Tooltip } from '@chakra-ui/react';

export default function IneligibleButton() {
  return (
    <Tooltip
      hasArrow
      label="You do not match the eligible clans set by referrer or belong to the referrer's current company"
    >
      <Button my={2} colorScheme="red" width={'100%'}>
        Ineligible for the referral
      </Button>
    </Tooltip>
  );
}
