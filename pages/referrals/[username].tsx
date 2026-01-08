import React from 'react';
import dbConnect from '@src/mongoDb/mongoDbClient';
import { fetchAllJobsGivenReferrer } from '@src/coreUtils/dataFetchers/static/fetchAllJobsGivenReferrer';
import { useSession } from 'next-auth/client';
import {
  fetchUser,
  transformUserResponse,
} from '@src/graphql/resolvers/queries/queryResolvers/user/helpers';
import pipe from '@src/graphql/resolvers/commonUtils/pipe';
import { PersonalReferralJob, User } from '@src/graphql/types';
import { ONBOARDING_STATE } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingAuthModel/types';
import ReferralLinkStaticPage from '@components/personalReferralLink/referralLinkStaticPage';
import ReferralLinkAuthPage from '@components/personalReferralLink/referralLinkAuthPage';

const PersonalReferralLink = ({
  username,
  referrerJobsData,
  referrerInfo,
}: {
  username: string;
  referrerJobsData: Record<string, PersonalReferralJob>;
  referrerInfo: User;
}) => {
  const [session, sessionLoading] = useSession();

  if (session && session.lastCompletedState === ONBOARDING_STATE.JOB_PREFERENCE) {
    return <ReferralLinkAuthPage session={session} referrerInfo={referrerInfo} />;
  } else {
    return (
      <ReferralLinkStaticPage
        session={session}
        referrerInfo={referrerInfo}
        referrerJobsData={referrerJobsData}
      />
    );
  }
};

export async function getStaticProps({ params }) {
  // Fetch necessary data corresponding to username
  const username = params.username;
  await dbConnect();
  const referrerJobsData = await fetchAllJobsGivenReferrer(username);
  const referrerInfo: User = await pipe(fetchUser, transformUserResponse)({ username });
  return {
    props: {
      username,
      referrerJobsData: JSON.parse(JSON.stringify(referrerJobsData)),
      referrerInfo: JSON.parse(JSON.stringify(referrerInfo)),
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  // Return a list of possible value for usernames
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export default PersonalReferralLink;
