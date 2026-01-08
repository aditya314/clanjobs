import mutationResolvers from './mutations';
import queryResolvers from './queries';
import askedReferralsResolver from '@src/graphql/resolvers/queries/queryResolvers/user/askedReferrals';
import referralRequestsResolver from '@src/graphql/resolvers/queries/queryResolvers/user/referralRequests';
import hasAlreadyRequestedResolver from '@src/graphql/resolvers/queries/queryResolvers/job/hasAlreadyRequested';
import acceptingReferrersResolver from '@src/graphql/resolvers/queries/queryResolvers/job/acceptingReferrers';
import onboardingBasicInfoResolver from '@src/graphql/resolvers/queries/queryResolvers/onboardingUser/helpers/onboardingBasicInfo';
import onboardingClanInfoResolver from '@src/graphql/resolvers/queries/queryResolvers/onboardingUser/helpers/onboardingClanInfo';
import onboardingProfileInfoResolver from '@src/graphql/resolvers/queries/queryResolvers/onboardingUser/helpers/onboardingProfileInfo';
import onboardingJobPreferenceResolver from '@src/graphql/resolvers/queries/queryResolvers/onboardingUser/helpers/onboardingJobPreference';
import enumResolvers from '@src/graphql/resolvers/enums';
import hasAlreadyPersonallyRequestedResolver from '@src/graphql/resolvers/queries/queryResolvers/personalReferralJob/hasAlreadyPersonallyRequested';
import isEligibleResolver from '@src/graphql/resolvers/queries/queryResolvers/personalReferralJob/isEligible';
import hasEnoughGemsResolver from '@src/graphql/resolvers/queries/queryResolvers/personalReferralJob/hasEnoughGems';

const resolvers = {
  Mutation: mutationResolvers,
  Query: queryResolvers,
  User: {
    askedReferrals: askedReferralsResolver,
    referralRequests: referralRequestsResolver,
  },
  Job: {
    hasAlreadyRequested: hasAlreadyRequestedResolver,
    acceptingReferrers: acceptingReferrersResolver,
  },
  PersonalReferralJob: {
    hasAlreadyPersonallyRequested: hasAlreadyPersonallyRequestedResolver,
    isEligible: isEligibleResolver,
    hasEnoughGems: hasEnoughGemsResolver,
  },
  OnboardingUser: {
    onboardingBasicInfo: onboardingBasicInfoResolver,
    onboardingClanInfo: onboardingClanInfoResolver,
    onboardingProfileInfo: onboardingProfileInfoResolver,
    onboardingJobPreference: onboardingJobPreferenceResolver,
  },
  // ...enumResolvers,
};

export default resolvers;
