import { GamificationEvent } from '@src/coreConfigs/constants/enums';
import { string } from 'prop-types';

export type DecrementGemsPayload = {
  username: string;
  operation: GamificationEvent;
};
