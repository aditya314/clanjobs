import { Box, Button, Flex, Image, useColorModeValue, useToast } from '@chakra-ui/react';
import ViewEligibleClansPopover from '@components/personalReferralLink/eligibleClansButtonPopover';
import { JobInfoComponent } from '@components/jobDashboard/jobInfoComponent';
import { useState } from 'react';
import { convertEpochToDateString, extractDateFromDateString } from '@src/coreUtils/timeUtils';
import { signIn } from 'next-auth/client';

export default function PersonalReferralSettingsJobCard({
  jobId,
  role,
  company,
  location,
  postedDate,
  jobUrl,
  seniority,
  isCardOnReferralSettings,
  referralSettings,
}) {
  const toast = useToast();
  const [isClicked, setIsClicked] = useState(false);
  return (
    <Box
      p={6}
      m={['auto', 2]}
      minW={'16rem'}
      w={'16rem'}
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
        {!isCardOnReferralSettings && (
          <ViewEligibleClansPopover
            isCardOnReferralSettings={isCardOnReferralSettings}
            eligibleClans={referralSettings.isPublic ? [] : referralSettings.eligibleClans}
          />
        )}
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
      {isCardOnReferralSettings ? (
        <ViewEligibleClansPopover
          isCardOnReferralSettings={isCardOnReferralSettings}
          eligibleClans={referralSettings.isPublic ? [] : referralSettings.eligibleClans}
        />
      ) : (
        <Button
          variant="variantSolid"
          m={2}
          width="100%"
          bgColor={'black'}
          //TODO: Handle callback to comeback to same page
          onClick={() => signIn()}
        >
          Ask Referral
        </Button>
      )}
    </Box>
  );
}
