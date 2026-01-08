import { Avatar, Flex, Text } from '@chakra-ui/react';
import React from 'react';

export default function CurrentJobInfo({ currentCompany, currentDesignation }) {
  const currentCompanyName = currentCompany.name;
  const currentCompanyLogoUrl = currentCompany.logoUrl;
  return (
    <Flex direction="column" my={2} p={2}>
      <Text my={2} color="gray.500">
        Currently works at
      </Text>
      <Flex align="center">
        <Avatar name={currentCompanyName} src={currentCompanyLogoUrl} />
        <Flex direction="column" p={2} ml={2}>
          <Text fontWeight={'bold'}>{currentDesignation}</Text>
          <Text fontWeight={'semibold'} color="gray.700">
            {currentCompanyName}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
// <Image
//   src={userInfoMap[username]?.company.logo ?? ''}
//   alt={userInfoMap[username]?.company.name}
//   width="40px"
//   height="40px"
//   objectFit={'contain'}
// />
