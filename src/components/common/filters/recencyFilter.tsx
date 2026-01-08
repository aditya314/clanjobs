import {
  Badge,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react';
import { keys, map } from 'lodash';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { REFERRAL_STATE } from '@src/mongoDb/daoModels/referralModels/referralRequestModel/types';
import { REFERRAL_STATE_COLOR_MAP } from '@src/coreConfigs/constants/common';

export enum Recency {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  ANY = 'ANY',
}

export const RECENCY_COLOR_MAP = {
  [Recency.DAY]: 'pink',
  [Recency.WEEK]: 'orange',
  [Recency.MONTH]: 'yellow',
  [Recency.ANY]: 'blue',
};

export default function RecencyFilter() {
  function handleRecencyFilterOnChange(values) {
    console.log(values);
  }

  return (
    <Menu closeOnSelect={false} matchWidth>
      <MenuButton
        // mt={[2, 0]}
        size="sm"
        as={Button}
        rightIcon={<ChevronDownIcon />}
        variant="variantSolid"
      >
        Recency
      </MenuButton>
      <MenuList size="sm" py={0} minWidth={0}>
        <MenuOptionGroup type="checkbox" onChange={values => handleRecencyFilterOnChange(values)}>
          {map(keys(Recency), recency => {
            return (
              <MenuItemOption key={recency} value={recency}>
                <Badge colorScheme={RECENCY_COLOR_MAP[recency]}>{recency}</Badge>
              </MenuItemOption>
            );
          })}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
