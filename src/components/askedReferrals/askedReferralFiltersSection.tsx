import { Stack } from '@chakra-ui/react';
import ReferralStatusFilter from '@src/components/common/filters/referralStatusFilter';
import NetworkFilter from '@src/components/common/filters/networkFilter';

export default function AskedRequestFiltersSection() {
  return (
    <Stack
      maxWidth="100%"
      direction={['column', 'row']}
      justify="flex-end"
      width="container.lg"
      my="1rem"
    >
      <Stack direction={['column', 'row']} justify="space-between" spacing={['5', '2']}>
        {/*<ReferralStatusFilter />*/}
      </Stack>
    </Stack>
  );
}
