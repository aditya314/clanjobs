import { Button, useBreakpointValue, useDisclosure, useToast } from '@chakra-ui/react';
import { Modal, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import ConfigureReferralSettingsBody from '@src/components/referralSettings/configureReferralSettingsBody';
import React, { useState } from 'react';
import { filter, isNil, keys, map, reduce } from 'lodash';
import { apolloGQLClient } from '@pages/_app';
import { gql } from '@apollo/client';
import { useSession } from 'next-auth/client';

export const UPDATE_REFERRAL_SETTINGS = gql`
  mutation updateReferralSettings($updateReferralSettingsInput: UpdateReferralSettingsInput!) {
    updateReferralSettings(input: $updateReferralSettingsInput) {
      username
    }
  }
`;

export const updateReferralSettingsData = async (username, isPublic, eligibleClanIDs) => {
  try {
    const mutationResponse = await apolloGQLClient.mutate({
      mutation: UPDATE_REFERRAL_SETTINGS,
      variables: {
        updateReferralSettingsInput: {
          username: username,
          isPublic: isPublic,
          eligibleClanIDs: eligibleClanIDs,
        },
      },
    });
    return mutationResponse;
  } catch (e) {
    console.log('Failed to fetch Mutation ', JSON.stringify(e));
    return null;
  }
};

function getInitialClanCheckBoxState(clanIDs, eligibleClanIDs) {
  return reduce(
    clanIDs,
    (acc, clanId) => ({
      ...acc,
      [clanId]: eligibleClanIDs.indexOf(clanId) >= 0,
    }),
    {}
  );
}

export default function ConfigureReferralSettings({
  clans,
  referralSettings,
  getUserReferralClansRefetch,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [session, sessionLoading] = useSession();
  const toast = useToast();
  const modalSize = useBreakpointValue({ base: 'xs', md: 'xl' });

  const clanIDs = map(clans, clan => clan.id);
  //convention on BE: when isPublic is true, eligible clans should be empty
  //for isPublic to be true in UI, eligible clans should be empty on FE and BE
  const eligibleClanIDs = referralSettings.isPublic
    ? []
    : map(referralSettings.eligibleClans, clan => clan.id);
  const [checkedClanItems, setCheckedClanItems] = useState(
    getInitialClanCheckBoxState(clanIDs, eligibleClanIDs)
  );

  return (
    <>
      <Button variant="variantSolid" onClick={onOpen}>
        Configure Referral Settings
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select the clans whose members can send you referral requests</ModalHeader>
          <ConfigureReferralSettingsBody
            clans={clans}
            checkedClanItems={checkedClanItems}
            setCheckedClanItems={setCheckedClanItems}
          />
          <ModalFooter>
            <Button
              variant={'variantSolid'}
              mr={3}
              onClick={async () => {
                let updatedEligibleClanIDs = filter(
                  keys(checkedClanItems),
                  key => checkedClanItems[key]
                );
                let isPublic = updatedEligibleClanIDs.length === 0;
                let updateResponse = await updateReferralSettingsData(
                  session.username,
                  isPublic,
                  updatedEligibleClanIDs
                );
                if (isNil(updateResponse)) {
                  toast({
                    title: `Failed to update your info. Contact us to get this fixed.`,
                    status: 'error',
                    isClosable: true,
                  });
                } else {
                  toast({
                    title: 'Referral Settings Saved',
                    description: "We've updated your clan list for accepting referrals.",
                    status: 'success',
                    duration: 500,
                    isClosable: true,
                  });
                }
                getUserReferralClansRefetch();
                onClose();
              }}
            >
              Save settings
            </Button>
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
