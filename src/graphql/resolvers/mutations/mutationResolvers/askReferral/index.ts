import {
  AskReferralPayload,
  MutationAskReferralArgs,
  Resolver,
  ResolversTypes,
} from '@src/graphql/types';
import { ResolverParentTypes } from '@graphql-codegen/visitor-plugin-common';
import { Context } from '@src/graphql/context';
import IReferralRequest, {
  IApplicantInfo,
  IJobInfo,
  IReferrerStateInfo,
  NETWORK_TYPE,
  REFERRAL_STATE,
} from '@src/mongoDb/daoModels/referralModels/referralRequestModel/types';
import { getCurrentTimeEpoch } from '@src/coreUtils/timeUtils';
import { ErrorCodes, GemValues } from '@src/coreConfigs/constants/enums';
import { UserModel } from '@src/mongoDb/daoModels/userModel';
import IUser from '@src/mongoDb/daoModels/userModel/types';
import {
  accumulateReferrerInfo,
  fetchSampledEligibleReferrers,
  getClansIds,
  getLatestCollegeName,
  getQueryToFetchEligibleReferrers,
  upsertReferralRequest,
} from '@src/graphql/resolvers/mutations/mutationResolvers/askReferral/helpers';
import IJob from '@src/mongoDb/daoModels/jobModel/types';
import { JobModel } from '@src/mongoDb/daoModels/jobModel';
import pipe from '@src/graphql/resolvers/commonUtils/pipe';
import { decrementGemsFromApplicant } from '@src/graphql/resolvers/commonUtils/gamificationsUtils';
import IClan from '@src/mongoDb/daoModels/entityModels/clanModel/types';
import { ObjectID } from 'bson';
import ICompany from '@src/mongoDb/daoModels/entityModels/companyModel/types';

async function fetchApplicantInfo(username: string): Promise<IApplicantInfo> {
  const user: IUser = await UserModel.findOne({ username: username });
  const { name, profilePic, resume, yearsOfExperience, clans, gemCount } = user;
  if (gemCount < GemValues.ASK_REFERRAL) {
    throw new Error(ErrorCodes.INSUFFICIENT_GEMS);
  }
  return {
    username,
    name,
    profilePic,
    latestCollegeName: getLatestCollegeName(user),
    resume,
    yearsOfExperience,
    clans,
  };
}

async function fetchJobInfo(jobId: string): Promise<IJobInfo> {
  const job: IJob = await JobModel.findOne({ _id: new ObjectID(jobId) });
  const { _id, linkedinJobId, jobRole, jobUrl, company, jobLocation } = job;
  return {
    _id,
    linkedinJobId,
    jobRole,
    jobLocation,
    jobUrl,
    company,
  };
}

async function fetchSampledReferrersList(
  applicantClans: Array<IClan>,
  company: ICompany
): Promise<Array<IReferrerStateInfo>> {
  const applicantClanIds = getClansIds(applicantClans);
  return pipe(
    getQueryToFetchEligibleReferrers,
    fetchSampledEligibleReferrers,
    accumulateReferrerInfo
  )({
    applicantClanIds,
    companyId: company._id,
  });
}

async function upsertReferralRequestAndDecrementGems(referralRequest: IReferralRequest) {
  return pipe(
    upsertReferralRequest,
    decrementGemsFromApplicant
  )({
    referralRequest,
  });
}

const askReferralResolver: Resolver<
  ResolversTypes['AskReferralPayload'],
  ResolverParentTypes['Mutation'],
  Context,
  MutationAskReferralArgs
> = async (_: any, { input }, { session }): Promise<AskReferralPayload> => {
  const { username, jobId, isPersonalReferral, referrerUsername } = input;
  if (!session) {
    throw new Error(ErrorCodes.NOT_AUTHORIZED);
  }
  try {
    const applicantInfo: IApplicantInfo = await fetchApplicantInfo(username);
    const jobInfo: IJobInfo = await fetchJobInfo(jobId);
    let referrersList: Array<IReferrerStateInfo>;
    if (isPersonalReferral) {
      // TODO Add Validation for eligibility criteria
      referrersList = new Array<IReferrerStateInfo>({
        username: referrerUsername,
        networkType: NETWORK_TYPE.PERSONAL,
        referralRequestStatus: REFERRAL_STATE.APPLIED,
      });
    } else {
      referrersList = await fetchSampledReferrersList(applicantInfo.clans, jobInfo.company);
    }
    await upsertReferralRequestAndDecrementGems({
      applicantInfo,
      jobInfo,
      referrersList,
      askedReferralStatus: REFERRAL_STATE.APPLIED,
      appliedOn: getCurrentTimeEpoch(),
    });
  } catch (e) {
    console.log(e);
    throw new Error(ErrorCodes.INTERNAL_SERVER_ERROR);
  }
  return {
    username,
    jobId,
  };
};

export default askReferralResolver;
