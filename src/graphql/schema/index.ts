import queryTypeDefs from './typeDefs/queries';
import mutationTypeDefs from './typeDefs/mutations';

import onboardingUserTypeDefs from './typeDefs/onboardingUser';
import autocompleteTypeDefs from './typeDefs/autocomplete';
import askedReferralsTypeDefs from './typeDefs/askedReferrals';
import referralRequestsTypeDefs from './typeDefs/referralRequests';
import personalReferralJobsTypeDefs from './typeDefs/personalReferralJobs';
import jobsTypeDefs from './typeDefs/jobs';
import userTypeDefs from './typeDefs/user';

import commonEnumsTypeDefs from './typeDefs/commonEnums';
import inputTypeDefs from './typeDefs/inputs';
import outputTypeDefs from './typeDefs/outputs';
import entityTypeDefs from './typeDefs/entities';
import commonTypeDefs from './typeDefs/commonTypes';
import schema from './typeDefs/schema';

export default [
  onboardingUserTypeDefs,
  autocompleteTypeDefs,
  referralRequestsTypeDefs,
  askedReferralsTypeDefs,
  personalReferralJobsTypeDefs,
  jobsTypeDefs,
  userTypeDefs,
  commonEnumsTypeDefs,
  commonTypeDefs,
  inputTypeDefs,
  outputTypeDefs,
  entityTypeDefs,
  mutationTypeDefs,
  queryTypeDefs,
  schema,
];
