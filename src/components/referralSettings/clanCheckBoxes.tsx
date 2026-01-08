import { map } from 'lodash';
import { Checkbox, Flex, Text } from '@chakra-ui/react';
import React from 'react';

function CheckBoxTextForClans({ clanName }) {
  return (
    <Flex direction="column" p={4} justify="center">
      <Text fontSize={['md', 'lg']} fontWeight={'bold'}>
        {clanName}
      </Text>
      <Text fontSize={['xs', 'sm']} color="gray.500">
        Anyone who has worked or is working at {clanName}
      </Text>
    </Flex>
  );
}

export default function ClanCheckBoxes({
  clans,
  checkedClanItems,
  handleClanCheckboxesOnChange,
  setCheckedClanItems,
}) {
  return (
    <>
      {map(clans, clan => (
        <Checkbox
          size="lg"
          key={clan.id}
          colorScheme="orange"
          isChecked={checkedClanItems[clan.id]}
          onChange={handleClanCheckboxesOnChange(setCheckedClanItems, checkedClanItems, clan.id)}
        >
          <CheckBoxTextForClans clanName={clan.name} />
        </Checkbox>
      ))}
    </>
  );
}
