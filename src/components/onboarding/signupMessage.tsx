import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const features = [
  {
    id: 0,
    title: 'Be authentic',
    text:
      'We are ensuring our best to keep verified profiles only. Fill all your details accurately. Help us in reporting fake profiles.',
  },
  {
    id: 1,
    title: 'Keep your resume handy',
    text:
      'Keep the PDF version of your updated resume handy. We will ask you to upload it during the time of onboarding',
  },
  {
    id: 2,
    title: 'Clans formation',
    text:
      'You become a member of all the companies and universities you add on the onboarding form. They are matched against your uploded resume.',
  },
  {
    id: 3,
    title: 'Usage Agreements',
    text: 'By signing up on ClanJobs, you agree to its Terms & Conditions and Privacy Policy',
  },
];

export default function GridListWithHeading() {
  return (
    <Box p={[2, 4]}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={'3xl'}>ClanJobs Onboarding</Heading>
        <Text color={'gray.600'} fontSize={'xl'}>
          A basic overview of the onboarding process in the ClanJobs network
        </Text>
      </Stack>

      <Container maxW={'6xl'} mt={10}>
        <SimpleGrid columns={[1, 2]} spacing={10}>
          {features.map(feature => (
            <HStack key={feature.id} align={'top'}>
              <Box color={'green.400'} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={'start'}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={'gray.600'}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
