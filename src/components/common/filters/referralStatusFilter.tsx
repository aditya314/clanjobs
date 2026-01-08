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

export default function ReferralStatusFilter() {
  function handleReferralStatusFilterOnChange(values) {
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
        Referral Status
      </MenuButton>
      <MenuList size="sm" py={0} minWidth={0}>
        <MenuOptionGroup
          type="checkbox"
          onChange={values => handleReferralStatusFilterOnChange(values)}
        >
          {map(keys(REFERRAL_STATE), referralState => {
            return (
              <MenuItemOption key={referralState} value={referralState}>
                <Badge colorScheme={REFERRAL_STATE_COLOR_MAP[referralState]}>{referralState}</Badge>
              </MenuItemOption>
            );
          })}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
