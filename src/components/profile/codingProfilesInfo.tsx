import { Flex, Link, Text } from '@chakra-ui/react';
import Image from '@components/common/image';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { keys, map } from 'lodash';
import React from 'react';
import { CodingProfile } from '@src/graphql/types';

function CodingProfileInfo({ profileName, profileLogo, profileUrl }) {
  return (
    <Flex align="center" m={2}>
      <Image src={profileLogo} alt={profileName} width="30px" height="30px" objectFit={'contain'} />
      <Link href={profileUrl} isExternal>
        <Flex direction="row" p={4} alignItems="center">
          <Text fontWeight={'semibold'}>{profileName}</Text>
          <ExternalLinkIcon mx="2px" align="baseline" />
        </Flex>
      </Link>
    </Flex>
  );
}

export default function CodingProfilesInfo({
  codingProfiles,
}: {
  codingProfiles: Array<CodingProfile>;
}) {
  return codingProfiles.length === 0 ? (
    <></>
  ) : (
    <Flex direction="column" p={2}>
      <Text color="gray.500">Coding Profiles</Text>
      <Flex direction="row" flexWrap={'wrap'} align="center">
        {map(codingProfiles, (codingProfile: CodingProfile) => (
          <CodingProfileInfo
            key={codingProfile.platformName}
            profileName={codingProfile.username}
            profileLogo={'https://logo.clearbit.com/' + codingProfile.platformName + '.com'}
            profileUrl={codingProfile.url}
          />
        ))}
      </Flex>
    </Flex>
  );
}
