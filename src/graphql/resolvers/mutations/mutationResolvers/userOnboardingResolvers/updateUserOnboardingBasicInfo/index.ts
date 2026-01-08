import {
  MutationUpdateUserOnboardingBasicInfoArgs,
  OnboardingState,
  UpdateUserOnboardingBasicInfoPayload,
} from '@src/graphql/types';
import { UserOnboardingAuthModel } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingAuthModel';
import { ONBOARDING_STATE } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingAuthModel/types';
import { UserOnboardingBasicInfoModel } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingBasicInfoModel';
import { SkillModel } from '@src/mongoDb/daoModels/entityModels/skillModel';
import ISkill from '@src/mongoDb/daoModels/entityModels/skillModel/types';
import { filter, reduce, union } from 'lodash';
import { ErrorCodes } from '@src/coreConfigs/constants/enums';
import { validateSkillInput } from '@src/graphql/resolvers/mutations/mutationResolvers/userOnboardingResolvers/updateUserOnboardingBasicInfo/helpers';

const updateUserOnboardingBasicInfoResolver = async (
  _: any,
  args: MutationUpdateUserOnboardingBasicInfoArgs,
  { session }
): Promise<UpdateUserOnboardingBasicInfoPayload> => {
  if (!session) {
    throw new Error(ErrorCodes.NOT_AUTHORIZED);
  }
  const {
    email,
    name,
    username,
    isFresher,
    role,
    yearsOfExperience, //send YOE as 0 for freshers
    coreSkills,
    familiarSkills,
  } = args.input;
  validateSkillInput(coreSkills, familiarSkills);
  try {
    let skillIDsToFetchFromDB = union(coreSkills, familiarSkills);
    //skills need not be in order of input
    let skillInfoArray: Array<ISkill> = await SkillModel.find({
      _id: { $in: skillIDsToFetchFromDB },
    });

    let coreSkillInfo = filter(
      skillInfoArray,
      skill => coreSkills.indexOf(skill._id.toString()) >= 0
    );
    let familiarSkillInfo = filter(
      skillInfoArray,
      skill => familiarSkills.indexOf(skill._id.toString()) >= 0
    );
    const userOnboardingBasicInfo = {
      email: email,
      name: name,
      username: username,
      isFresher: isFresher,
      role: role,
      yearsOfExperience: {
        years: yearsOfExperience.years,
        months: yearsOfExperience.months,
      },
      skills: {
        core: coreSkillInfo,
        familiar: familiarSkillInfo,
      },
    };
    await Promise.all([
      UserOnboardingBasicInfoModel.updateOne({ email: email }, userOnboardingBasicInfo, {
        upsert: true,
      }),
      UserOnboardingAuthModel.updateOne(
        { email: email },
        {
          email: email,
          username: username,
          isFresher: isFresher,
          lastCompletedState: ONBOARDING_STATE.BASIC_INFO,
        },
        { upsert: true }
      ),
    ]);
    return {
      onboardingUser: {
        email: email,
        lastCompletedState: OnboardingState.BasicInfo,
      },
    };
  } catch (e) {
    console.log('Error in updateUserOnboardingBasicInfo', e);
    throw new Error(ErrorCodes.INTERNAL_SERVER_ERROR);
  }
};

export default updateUserOnboardingBasicInfoResolver;
