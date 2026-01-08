import { UserOnboardingAuthModel } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingAuthModel';
import { isNil } from 'lodash';
import { ErrorCodes } from '@src/coreConfigs/constants/enums';
import IUserOnboardingAuth from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingAuthModel/types';

const isUsernameAvailableResolver = async (_, args, { session }, ___) => {
  const username = args.input;
  if (!/^[a-zA-Z0-9\-]+$/.test(username)) {
    console.log('username does not pass regex test', username);
    throw new Error(ErrorCodes.INVALID_INPUT);
  }
  let onboardingUser: IUserOnboardingAuth = await UserOnboardingAuthModel.findOne({
    username: username,
  });
  return isNil(onboardingUser);
};

export default isUsernameAvailableResolver;
