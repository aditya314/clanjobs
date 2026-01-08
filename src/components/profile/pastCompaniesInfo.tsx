import { Avatar, Flex, Text } from '@chakra-ui/react';
import { keys, map } from 'lodash';
import React from 'react';
import { Company } from '@src/graphql/types';

export default function PastCompaniesInfo({ pastCompanies }: { pastCompanies: Array<Company> }) {
  return (
    <Flex direction="column" p={2}>
      <Text color="gray.500">Also worked at</Text>
      <Flex flexWrap={'wrap'}>
        {map(pastCompanies, (company: Company) => (
          <Flex key={company.id} align="center" m={2}>
            <Avatar name={company.name} src={company.logoUrl} />
            <Flex direction="column" p={4}>
              <Text fontWeight={'semibold'} color="gray.700">
                {company.name}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
// <Image src={clanLogo} alt={clanName} width="40px" height="40px" objectFit={'contain'} />
