import {
  Badge,
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react';
import { keys, map } from 'lodash';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { NETWORK_TYPE } from '@src/mongoDb/daoModels/referralModels/referralRequestModel/types';

export const NETWORK_TYPE_COLOR_MAP = {
  [NETWORK_TYPE.PUBLIC]: 'blue',
  [NETWORK_TYPE.PERSONAL]: 'pink',
  [NETWORK_TYPE.CLAN]: 'yellow',
};

export default function NetworkFilter() {
  function handleNetworkFilterOnChange(values) {
    console.log(values);
  }

  return (
    <Menu closeOnSelect={false} matchWidth>
      <MenuButton
        my={[2, 0]}
        size="sm"
        as={Button}
        rightIcon={<ChevronDownIcon />}
        variant="variantSolid"
      >
        Network Type
      </MenuButton>
      <MenuList size="sm" py={0} minWidth={0}>
        <MenuOptionGroup type="checkbox" onChange={values => handleNetworkFilterOnChange(values)}>
          {map(keys(NETWORK_TYPE), networkType => {
            return (
              <MenuItemOption key={networkType} value={networkType}>
                <Badge colorScheme={NETWORK_TYPE_COLOR_MAP[networkType]}>{networkType}</Badge>
              </MenuItemOption>
            );
          })}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
