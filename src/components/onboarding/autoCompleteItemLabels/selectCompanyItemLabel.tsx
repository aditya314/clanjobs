import { Avatar, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';

export default function SelectCompanyItemLabel({ logo, name }) {
  return (
    <Flex alignItems="center">
      {/*<Avatar size={'sm'} mr={4} src={logo} />*/}
      {/*<Image src={logo} alt={''} boxSize="30px" objectFit={'contain'} mr={4} my={1} />*/}
      <Image alt={''} src={logo} width={35} height={35} objectFit={'contain'} />
      <Text ml={4}>{name}</Text>
    </Flex>
  );
}
