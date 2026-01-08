import {
  Container,
  Flex,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverHeader,
  Stack,
  StackDivider,
  Text,
  Image,
} from '@chakra-ui/react';
import { FaUniversity } from 'react-icons/fa';

const ClanListItem = ({ text, imageSrc }) => {
  return (
    <Stack direction={'row'} align={'center'} spacing={4}>
      {imageSrc ? (
        <Flex w={8} h={8} align={'center'} justify={'center'}>
          <Image
            src={imageSrc}
            alt={'clan logo'}
            width="50px"
            height="50px"
            objectFit={'contain'}
          />
        </Flex>
      ) : (
        <FaUniversity size={49} />
      )}
      <Text fontSize="xs" fontWeight={600}>
        {text}
      </Text>
    </Stack>
  );
};
const getEligibleClansListItem = clan => {
  return <ClanListItem key={clan.name} imageSrc={clan.logoUrl} text={clan.name} />;
};

export function EligibleClansContent({ eligibleClans }) {
  return (
    <>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader p={2} border="0">
        {eligibleClans.length > 0 ? (
          <Container fontSize="xs">
            The referrer is accepting requests from members of these clans:
          </Container>
        ) : (
          <Text p={2} fontWeight={500}>
            Accepting referrals from all clans
          </Text>
        )}
      </PopoverHeader>
      <PopoverBody>
        <Container>
          <Stack spacing={4} divider={<StackDivider borderColor="gray.100" />}>
            {eligibleClans.map(clan => getEligibleClansListItem(clan))}
          </Stack>
        </Container>
      </PopoverBody>
    </>
  );
}
