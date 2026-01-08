import { Button, Tooltip } from '@chakra-ui/react';

export default function InsufficientGemsButton() {
  return (
    <Tooltip
      hasArrow
      label="You have exhausted all your clan gems. Earn more gems by inviting your peers to ClanJobs or referring people to your company"
    >
      <Button mr={3} colorScheme="red" width="100%">
        Insufficient Gems
      </Button>
    </Tooltip>
  );
}
