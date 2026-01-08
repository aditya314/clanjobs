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
import { SENIORITY } from '@src/mongoDb/daoModels/jobModel/types';

export const SENIORITY_COLOR_MAP = {
  [SENIORITY.INTERNSHIP]: 'pink',
  [SENIORITY.ENTRY_LEVEL]: 'orange',
  [SENIORITY.ASSOCIATE]: 'yellow',
  [SENIORITY.MID_SENIOR]: 'blue',
  [SENIORITY.DIRECTOR]: 'red',
  [SENIORITY.EXECUTIVE]: 'white',
};

export default function SeniorityFilter() {
  function handleSeniorityFilterOnChange(values) {
    console.log(values);
  }

  return (
    <Menu closeOnSelect={false} matchWidth>
      <MenuButton
        mt={[2, 0]}
        size="sm"
        as={Button}
        rightIcon={<ChevronDownIcon />}
        variant="variantSolid"
      >
        Seniority
      </MenuButton>
      <MenuList size="sm" py={0} minWidth={0}>
        <MenuOptionGroup type="checkbox" onChange={values => handleSeniorityFilterOnChange(values)}>
          {map(keys(SENIORITY), seniority => {
            return (
              <MenuItemOption key={seniority} value={seniority}>
                <Badge colorScheme={SENIORITY_COLOR_MAP[seniority]}>{seniority}</Badge>
              </MenuItemOption>
            );
          })}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
