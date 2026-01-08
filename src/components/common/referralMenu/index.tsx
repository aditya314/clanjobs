import { Badge, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { map } from 'lodash';
import { useState } from 'react';
import { REFERRAL_STATE } from '@src/mongoDb/daoModels/referralModels/referralRequestModel/types';
import { getReferralMenu } from '@components/common/referralMenu/helpers';
import { REFERRAL_STATE_COLOR_MAP } from '@src/coreConfigs/constants/common';
import { gql } from '@apollo/client';
import { apolloGQLClient } from '@pages/_app';
import { REFERRAL_STATE_DB_TO_GQL_MAPPER } from '@src/coreUtils/dataParsers/dBToGQLMappers';
import { UserType } from '@src/graphql/types';

const UPDATE_REFERRAL_STATE_MUTATION = gql`
  mutation updateReferralState($updateReferralStateInput: UpdateReferralStateInput!) {
    updateReferralState(input: $updateReferralStateInput) {
      userType
      username
      referralState
    }
  }
`;

export default function ReferralStateMenu({
  isApplicant,
  referralState,
  username,
  referralRequestId,
}: {
  isApplicant: boolean;
  referralState: REFERRAL_STATE;
  username: string;
  referralRequestId: string;
}) {
  const [referralButtonState, setReferralButtonState] = useState(REFERRAL_STATE[referralState]);

  async function handleClick(nextReferralState) {
    try {
      await apolloGQLClient.mutate({
        mutation: UPDATE_REFERRAL_STATE_MUTATION,
        variables: {
          updateReferralStateInput: {
            username: username,
            userType: isApplicant ? UserType.Applicant : UserType.Referrer,
            referralState: REFERRAL_STATE_DB_TO_GQL_MAPPER[nextReferralState],
            referralRequestId: referralRequestId,
          },
        },
      });
      setReferralButtonState(nextReferralState);
    } catch (e) {
      console.log(e);
    }
  }

  const referralMenu = getReferralMenu(isApplicant, referralState);

  return (
    <Menu closeOnBlur closeOnSelect matchWidth>
      <MenuButton
        size="md"
        as={Button}
        rightIcon={<ChevronDownIcon />}
        colorScheme={REFERRAL_STATE_COLOR_MAP[referralButtonState]}
        mt={4}
      >
        {referralButtonState}
      </MenuButton>
      <MenuList size="sm" py={0} minWidth={0}>
        {map(referralMenu, state => {
          return (
            <MenuItem key={state} fontWeight="bold" onClick={() => handleClick(state)}>
              <Badge colorScheme={REFERRAL_STATE_COLOR_MAP[state]} justifyContent="center">
                {state}
              </Badge>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
