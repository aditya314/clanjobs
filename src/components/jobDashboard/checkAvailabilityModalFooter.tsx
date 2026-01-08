import { Button, Tooltip, useToast } from '@chakra-ui/react';
import { isNil } from 'lodash';
import { ModalFooter } from '@chakra-ui/modal';
import { gql } from '@apollo/client';
import { apolloGQLClient } from '@pages/_app';
import InsufficientGemsButton from '@components/jobDashboard/insufficentGemsButton';

export const ASK_REFERRAL = gql`
  mutation askReferral($askReferralInput: AskReferralInput!) {
    askReferral(input: $askReferralInput) {
      jobId
      username
    }
  }
`;

export const requestReferral = async (
  applicantUsername,
  jobId,
  isPersonalReferral,
  referrerUsername
) => {
  try {
    const mutationResponse = await apolloGQLClient.mutate({
      mutation: ASK_REFERRAL,
      variables: {
        askReferralInput: {
          username: applicantUsername,
          jobId: jobId,
          isPersonalReferral: isPersonalReferral,
          referrerUsername: referrerUsername,
        },
      },
    });
    return mutationResponse;
  } catch (e) {
    console.log('Failed to fetch Mutation ', JSON.stringify(e));
    return null;
  }
};

export default function CheckAvailabilityModalFooter({
  hasEnoughGems,
  jobId,
  onClose,
  username,
  setIsRequested,
}) {
  const toast = useToast();

  return (
    <ModalFooter>
      {hasEnoughGems ? (
        <Tooltip
          hasArrow
          label="We will send your referral request to at most 15 people selected randomly from these. The
        request will cost you 15 gems."
          bg="gray.200"
          color="gray.900"
        >
          <Button
            variant="variantSolid"
            mr={3}
            onClick={async () => {
              let referralRequestMutationResponse = await requestReferral(
                username,
                jobId,
                false,
                undefined
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
                onClose();
              }
            }}
          >
            Send referral requests
          </Button>
        </Tooltip>
      ) : (
        <InsufficientGemsButton />
      )}
      <Button variant="ghost" onClick={onClose}>
        Cancel
      </Button>
    </ModalFooter>
  );
}
