import { Box, Flex, useColorModeValue, Image, Button, useToast } from '@chakra-ui/react';
import { JobInfoComponent } from '@src/components/jobDashboard/jobInfoComponent';
import { useState } from 'react';
import { convertEpochToDateString, extractDateFromDateString } from '@src/coreUtils/timeUtils';
import InsufficientGemsButton from '@components/jobDashboard/insufficentGemsButton';
import { isNil } from 'lodash';
import { requestReferral } from '@components/jobDashboard/checkAvailabilityModalFooter';
import IneligibleButton from '@components/personalReferralLink/ineligibleButton';

export default function PersonalJobPostingCard({
  applicantUsername,
  referrerUsername,
  jobId,
  role,
  company,
  location,
  postedDate,
  jobUrl,
  seniority,
  hasEnoughGems,
  hasAlreadyRequested,
  isEligible,
}) {
  const toast = useToast();
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
        <Image src={company.logoUrl} alt="Company logo" boxSize="30px" objectFit={'contain'} />
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
      ) : isEligible ? (
        hasEnoughGems ? (
          <Button
            variant="variantSolid"
            width="100%"
            onClick={async () => {
              let referralRequestMutationResponse = await requestReferral(
                applicantUsername,
                jobId,
                true,
                referrerUsername
              );
              if (isNil(referralRequestMutationResponse)) {
                toast({
                  title: `Failed to ask referral. Contact us to get this fixed.`,
                  status: 'error',
                  isClosable: true,
                });
              } else {
                toast({
                  title: `You have successfully request referral for this job. Track its status on asked referrals page`,
                  status: 'success',
                  isClosable: true,
                });
                setIsRequested(true);
              }
            }}
          >
            Ask referral
          </Button>
        ) : (
          <InsufficientGemsButton />
        )
      ) : (
        <IneligibleButton />
      )}
    </Box>
  );
}
