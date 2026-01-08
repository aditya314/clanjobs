import { Flex, HStack, Link, Tag, Text, Tooltip } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { isNil } from 'lodash';

function JobTags({ postedDate, seniority }) {
  return (
    <HStack my={2} spacing={4} flexWrap="wrap">
      <Tag
        key="recency"
        size={'sm'}
        variant="solid"
        colorScheme="gray"
        bgColor="gray.200"
        color="black"
      >
        {postedDate}
      </Tag>
      {!isNil(seniority) ? (
        <Tag key="level" size={'sm'} variant="solid" colorScheme="blue">
          {seniority}
        </Tag>
      ) : (
        <></>
      )}
    </HStack>
  );
}

export function JobLink({ href, role }) {
  return (
    <Link href={href} fontWeight="bold" isExternal py={2} height={'4rem'}>
      <HStack>
        <Tooltip label={role}>
          <Text noOfLines={2}>{role}</Text>
        </Tooltip>
        <ExternalLinkIcon mx="1px" align="baseline" />
      </HStack>
    </Link>
  );
}

export function JobInfoComponent({ href, role, companyName, location, postedDate, seniority }) {
  return (
    <Flex direction="column" p={2}>
      <JobLink href={href} role={role} />
      <Text fontSize="sm" color="gray.500">
        {companyName}
      </Text>
      <Text fontSize="sm" color="gray.500" isTruncated>
        {location}
      </Text>
      <JobTags postedDate={postedDate} seniority={seniority} />
    </Flex>
  );
}
