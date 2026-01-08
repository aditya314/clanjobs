import { Image, Flex, Text } from '@chakra-ui/react';

export default function SelectSkillItemLabel({ logo, name }) {
  return (
    <Flex alignItems="center">
      <Image src={logo} alt={''} boxSize="30px" objectFit={'contain'} mr={4} my={1} />
      <Text>{name}</Text>
    </Flex>
  );
}
