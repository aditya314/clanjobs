import Head from 'next/head';
import { Container } from '@chakra-ui/react';
import React from 'react';
import Sidebar from '@src/components/layout/sidebar';
import pipe from '@src/graphql/resolvers/commonUtils/pipe';
import {
  fetchUser,
  transformUserResponse,
} from '@src/graphql/resolvers/queries/queryResolvers/user/helpers';
import dbConnect from '@src/mongoDb/mongoDbClient';
import UserInfo from '@components/profile/userInfo';
import HighlightsInfo from '@components/profile/highlights';
import { User } from '@src/graphql/types';
import CurrentJobInfo from '@components/profile/currentJobInfo';
import PastCompaniesInfo from '@components/profile/pastCompaniesInfo';
import EducationDetails from '@components/profile/educationInfo';
import SkillsInfo from '@components/profile/skillsInfo';
import CodingProfilesInfo from '@components/profile/codingProfilesInfo';
import { ROLE } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingBasicInfoModel/types';

const ProfilePage = ({ username, userData }: { username: string; userData: User }) => {
  const session = {
    username: username,
    user: {
      name: userData.name,
      image: userData.profilePicUrl,
      email: userData.email,
    },
  };
  return (
    <>
      <Head>
        <title>{userData.name} | ClanJobs</title>
      </Head>
      <Sidebar>
        <Container maxW="container.md" p={4}>
          <UserInfo
            name={userData.name}
            profilePicUrl={userData.profilePicUrl}
            profileHeadline={userData.profileHeadline}
          />
          <HighlightsInfo
            name={userData.name}
            role={ROLE[userData.role]}
            yoe={userData.yearsOfExperience}
            resumeUrl={userData.resumeUrl}
            isFresher={userData.isFresher}
          />
          {!userData.isFresher ? (
            <React.Fragment>
              <CurrentJobInfo
                currentCompany={userData.workExperience.currentCompany}
                currentDesignation={userData.workExperience.currentDesignation}
              />
              <PastCompaniesInfo pastCompanies={userData.workExperience.pastCompanies} />
            </React.Fragment>
          ) : (
            <></>
          )}
          <EducationDetails education={userData.educationDetails.education} />
          <SkillsInfo skills={userData.skills} />
          <CodingProfilesInfo codingProfiles={userData.codingProfiles} />
        </Container>
      </Sidebar>
    </>
  );
};

export async function getStaticProps({ params }) {
  // Fetch necessary data corresponding to username
  const username = params.username;
  await dbConnect();
  const userData = await pipe(fetchUser, transformUserResponse)({ username });
  return {
    props: {
      username,
      userData: JSON.parse(JSON.stringify(userData)),
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  // Return a list of possible value for usernames
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export default ProfilePage;
