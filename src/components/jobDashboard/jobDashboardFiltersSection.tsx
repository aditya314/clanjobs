import { Flex, Stack } from '@chakra-ui/react';
import ReferralStatusFilter from '@src/components/common/filters/referralStatusFilter';
import NetworkFilter from '@src/components/common/filters/networkFilter';
import RecencyFilter from '@src/components/common/filters/recencyFilter';
import SeniorityFilter from '@src/components/common/filters/seniorityFilter';

export default function JobDashboardFiltersSection() {
  return (
    <Flex
      maxWidth="100%"
      direction={['column', 'row']}
      justify="flex-end"
      width="container.xl"
      my="1rem"
    >
      <Flex
        width={['100%', '30%']}
        mr="2.5rem"
        direction={['column', 'row']}
        justify="space-between"
      >
        <NetworkFilter />
        <RecencyFilter />
        <SeniorityFilter />
      </Flex>
    </Flex>
  );
}
