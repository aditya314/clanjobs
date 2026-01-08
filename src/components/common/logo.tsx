import { Flex, HStack, LinkBox, Text } from '@chakra-ui/react';
import Image from '@src/components/common/image';
import wolfLogo from '@images/wolfLogo.png';
import invertedWolfLogo from '@images/logoInverted.png';
import Link from 'next/link';

export default function Logo({ isInverted = false }) {
  const imgSrc = isInverted ? invertedWolfLogo : wolfLogo;
  return (
    <LinkBox as="div">
      <Link href="/" passHref>
        <Flex align="center" p="4">
          <Image src={imgSrc} width="3rem" height="3rem" alt="ClanJobs Mascot" />
          <Text as="em" fontSize={32} fontWeight="extrabold" color={isInverted ? 'white' : 'black'}>
            ClanJobs
          </Text>
        </Flex>
      </Link>
    </LinkBox>
  );
}
