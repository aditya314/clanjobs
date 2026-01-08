import { Button, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
import { FaEye } from 'react-icons/fa';
import { EligibleClansContent } from '@src/components/personalReferralLink/eligibleClansPopOverContent';

export default function ViewEligibleClansPopover({ isCardOnReferralSettings, eligibleClans }) {
  return (
    <Popover placement="auto">
      <PopoverTrigger>
        {isCardOnReferralSettings ? (
          <Button variant="outline" rightIcon={<FaEye />} size={'md'}>
            View eligible clans
          </Button>
        ) : (
          <Button mr={-5} variant={'ghost'} rightIcon={<FaEye />} size="xs">
            Eligible Clans
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent>
        <EligibleClansContent eligibleClans={eligibleClans} />
      </PopoverContent>
    </Popover>
  );
}
