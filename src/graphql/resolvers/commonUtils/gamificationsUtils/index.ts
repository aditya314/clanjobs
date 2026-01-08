import { DecrementGemsPayload } from '@src/graphql/resolvers/commonUtils/gamificationsUtils/types';
import { UserModel } from '@src/mongoDb/daoModels/userModel';
import { GamificationEvent, GemValues } from '@src/coreConfigs/constants/enums';

export const GAMIFICATION_EVENT_TO_REQUIRED_GEMS_MAPPER = {
  [GamificationEvent.ASK_REFERRAL]: GemValues.ASK_REFERRAL,
};

export async function decrementGemsFromApplicant({ username, operation }: DecrementGemsPayload) {
  const gemsToDecrement: number = GAMIFICATION_EVENT_TO_REQUIRED_GEMS_MAPPER[operation];
  await UserModel.updateOne(
    { username: username },
    {
      $inc: { gemCount: -1 * gemsToDecrement },
    }
  );
}
