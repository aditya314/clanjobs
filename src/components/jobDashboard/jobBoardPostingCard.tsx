import { Box, Flex, useColorModeValue, Image, Button } from '@chakra-ui/react';
import { JobInfoComponent } from '@src/components/jobDashboard/jobInfoComponent';
import CheckAvailabilityModal from '@src/components/jobDashboard/checkAvailabilityModal';
import { useState } from 'react';
import { convertEpochToDateString, extractDateFromDateString } from '@src/coreUtils/timeUtils';

export default function JobBoardPostingCard({
  username,
  jobId,
  role,
  company,
  location,
  postedDate,
  jobUrl,
  seniority,
  hasEnoughGems,
  hasAlreadyRequested,
  acceptingReferrers,
}) {
  const [isRequested, setIsRequested] = useState(hasAlreadyRequested);
  //TODO: Check for common theming for jobCards and abstract out common components
  return (
    <Box
      m={2}
      p={4}
      minW={'16rem'}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'sm'}
      rounded={'lg'}
      borderWidth={1}
      borderRadius="lg"
      overflow="hidden"
      _hover={{
        boxShadow: 'lg',
      }}
    >
      <Flex direction="row" justifyContent="space-between" p={2}>
        <Image src={company.logoUrl} alt="Company logo" boxSize="50px" objectFit={'contain'} />
      </Flex>
      <JobInfoComponent
        href={jobUrl}
        role={role}
        companyName={company.name}
        location={location}
        postedDate={
          postedDate ? extractDateFromDateString(convertEpochToDateString(postedDate)) : undefined
        }
        seniority={seniority}
      />
      {isRequested ? (
        <Button bgColor={'green'} color={'white'} my={2} width="100%">
          Referral Requested
        </Button>
      ) : (
        <CheckAvailabilityModal
          username={username}
          company={company}
          acceptingReferrers={acceptingReferrers}
          jobId={jobId}
          setIsRequested={setIsRequested}
          hasEnoughGems={hasEnoughGems}
        />
      )}
    </Box>
  );
}
