import { ModalBody } from '@chakra-ui/modal';
import React from 'react';
import { Checkbox, Flex, Stack, Text } from '@chakra-ui/react';
import { keys, map, reduce } from 'lodash';
import ClanCheckBoxes from '@components/referralSettings/clanCheckBoxes';

function handleClanCheckboxesOnChange(setCheckedClanItems, checkedClanItems, clanId) {
  return e => {
    setCheckedClanItems({
      ...checkedClanItems,
      [clanId]: e.target.checked,
    });
  };
}

function CheckBoxTextForParent({ heading, subheading }) {
  return (
    <Flex direction="column" p={4} justify="center">
      <Text fontSize={['md', 'lg']} fontWeight={'bold'}>
        {heading}
      </Text>
      <Text fontSize={['xs', 'sm']} color="gray.500">
        {subheading}
      </Text>
    </Flex>
  );
}

function getIndeterminate(allChecked: boolean, checkedClanItems: {}) {
  return (
    !allChecked &&
    reduce(
      keys(checkedClanItems),
      (acc, clanId) => {
        const isCurrCheckBoxChecked = checkedClanItems[clanId];
        return acc || isCurrCheckBoxChecked;
      },
      false
    )
  );
}

function checkAllChecked(checkedClanItems: {}) {
  return reduce(
    keys(checkedClanItems),
    (acc, clanId) => {
      const isCurrCheckBoxChecked = checkedClanItems[clanId];
      return acc && isCurrCheckBoxChecked;
    },
    true
  );
}

function getIsPublicClanCheckBoxState(clanIDs) {
  return reduce(
    clanIDs,
    (acc, clanId) => ({
      ...acc,
      [clanId]: false,
    }),
    {}
  );
}

function isAnyClanChecked(checkedClanItems: {}) {
  return reduce(keys(checkedClanItems), (acc, clanId) => acc || checkedClanItems[clanId], false);
}

function handleOnChangeParentCheckBox(setCheckedClanItems, clanIDs, event) {
  setCheckedClanItems(
    reduce(
      clanIDs,
      (acc, clanId) => {
        return {
          ...acc,
          [clanId]: event.target.checked,
        };
      },
      {}
    )
  );
}

export default function ConfigureReferralSettingsBody({
  clans,
  checkedClanItems,
  setCheckedClanItems,
}) {
  const clanIDs = map(clans, clan => clan.id);
  let isPublicClanState = getIsPublicClanCheckBoxState(clanIDs);

  const isAllChecked = checkAllChecked(checkedClanItems);
  const isIndeterminate = getIndeterminate(isAllChecked, checkedClanItems);

  return (
    <ModalBody>
      <Stack>
        <Checkbox
          size="lg"
          colorScheme="orange"
          isChecked={!isAnyClanChecked(checkedClanItems)}
          onChange={() => {
            setCheckedClanItems(isPublicClanState);
          }}
        >
          <CheckBoxTextForParent
            heading={'Public'}
            subheading={'Anyone on the ClanJobs network can send you referral request'}
          />
        </Checkbox>
        <Checkbox
          size="lg"
          colorScheme="orange"
          isChecked={isAllChecked}
          isIndeterminate={isIndeterminate}
          onChange={e => handleOnChangeParentCheckBox(setCheckedClanItems, clanIDs, e)}
        >
          <CheckBoxTextForParent
            heading={'My Clan Network'}
            subheading={
              'Anyone who has worked or is working in any one of the clans you have been a part of'
            }
          />
        </Checkbox>
        <Stack pl={6} mt={1} spacing={1}>
          <ClanCheckBoxes
            clans={clans}
            checkedClanItems={checkedClanItems}
            handleClanCheckboxesOnChange={handleClanCheckboxesOnChange}
            setCheckedClanItems={setCheckedClanItems}
          />
        </Stack>
      </Stack>
    </ModalBody>
  );
}
