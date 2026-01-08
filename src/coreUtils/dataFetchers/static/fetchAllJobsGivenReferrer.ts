import IUser from '@src/mongoDb/daoModels/userModel/types';
import { UserModel } from '@src/mongoDb/daoModels/userModel';
import { JobModel } from '@src/mongoDb/daoModels/jobModel';
import { ObjectID } from 'bson';
import { PersonalReferralJob } from '@src/graphql/types';
import { transformPage } from '@src/graphql/resolvers/queries/queryResolvers/personalReferralJobs/helpers';

export async function fetchAllJobsGivenReferrer(
  referrerUsername: string
): Promise<Record<string, PersonalReferralJob>> {
  const referrerUserData: IUser = await UserModel.findOne({ username: referrerUsername });
  if (referrerUserData.isFresher) return {};
  const referrerJobs = await JobModel.aggregate([
    {
      $match: {
        'company._id': { $eq: new ObjectID(referrerUserData.currentCompany._id) },
      },
    },
  ]);
  return transformPage(referrerJobs, referrerUserData);
}
