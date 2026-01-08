import {
  MutationUpdateReferralSettingsArgs,
  Resolver,
  ResolversTypes,
  UpdateReferralSettingsPayload,
} from '@src/graphql/types';
import { ResolverParentTypes } from '@graphql-codegen/visitor-plugin-common';
import { Context } from '@src/graphql/context';
import { ErrorCodes } from '@src/coreConfigs/constants/enums';
import { UserModel } from '@src/mongoDb/daoModels/userModel';
import { ClanModel } from '@src/mongoDb/daoModels/entityModels/clanModel';
import IClan from '@src/mongoDb/daoModels/entityModels/clanModel/types';

const getClansFromClanIds = async clanIds => await ClanModel.find({ _id: { $in: clanIds } });

const updateReferralSettingsResolver: Resolver<
  ResolversTypes['UpdateReferralSettingsPayload'],
  ResolverParentTypes['Mutation'],
  Context,
  MutationUpdateReferralSettingsArgs
> = async (_: any, { input }, { session }): Promise<UpdateReferralSettingsPayload> => {
  if (!session) {
    throw new Error(ErrorCodes.NOT_AUTHORIZED);
  }
  try {
    const { username, isPublic, eligibleClanIDs } = input;
    let clanInfo: Array<IClan> = isPublic ? [] : await getClansFromClanIds(eligibleClanIDs);
    await UserModel.updateOne(
      { username: username },
      {
        referralSettings: {
          isPublic: isPublic,
          eligibleClans: clanInfo,
        },
      }
    );
  } catch (e) {
    console.log(e);
    throw new Error(ErrorCodes.INTERNAL_SERVER_ERROR);
  }
  return {
    username: input.username,
  };
};

export default updateReferralSettingsResolver;
