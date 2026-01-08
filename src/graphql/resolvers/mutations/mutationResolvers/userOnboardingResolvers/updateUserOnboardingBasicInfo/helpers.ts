import { checkIfArrayHasValidObjectIDs } from '@src/graphql/resolvers/commonUtils/validators';
import { ErrorCodes } from '@src/coreConfigs/constants/enums';

export const validateSkillInput = (coreSkills, familiarSkills) => {
  if (
    coreSkills.length == 0 ||
    coreSkills.length > 5 ||
    !checkIfArrayHasValidObjectIDs(coreSkills)
  ) {
    console.log('List of core skills is invalid');
    throw new Error(ErrorCodes.INVALID_INPUT);
  }
  if (
    familiarSkills.length == 0 ||
    familiarSkills.length > 8 ||
    !checkIfArrayHasValidObjectIDs(familiarSkills)
  ) {
    console.log('List of familiar skills is invalid');
    throw new Error(ErrorCodes.INVALID_INPUT);
  }
};
