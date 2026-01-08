import NextAuth, { Profile, Session, TokenSet } from 'next-auth';
import Providers from 'next-auth/providers';
import { UserOnboardingAuthModel } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingAuthModel';
import IUserOnboardingAuth from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingAuthModel/types';
import dbConnect from '@src/mongoDb/mongoDbClient';
import { getLinkedInEmail, getLinkedInPhoto } from '@src/coreUtils/linkedinUtils';

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // TODO LinkedIn Auth not working
    Providers.LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      scope: 'r_liteprofile,r_emailaddress',
      async profile(profileData: Profile, { accessToken }: TokenSet) {
        const [email, image] = await Promise.all([
          getLinkedInEmail(accessToken),
          getLinkedInPhoto(accessToken),
        ]);
        return {
          id: `${profileData.id}`,
          name: `${profileData.localizedFirstName} ${profileData.localizedLastName}`,
          email,
          image,
        };
      },
    }),
  ],
  database: process.env.MONGO_URI,
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  jwt: {},
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async session(session: Session, user) {
      // console.log(session);
      // if (has(session, 'username') && !isNil(session.username)) {
      //   console.log('Serving from cache');
      //   return session;
      // }
      // console.log('Serving from DB');
      await dbConnect();
      let onboardingUser: IUserOnboardingAuth = await UserOnboardingAuthModel.findOne({
        email: session.user.email,
      });
      if (onboardingUser) {
        session.username = onboardingUser.username;
        session.isFresher = onboardingUser.isFresher;
        session.lastCompletedState = onboardingUser.lastCompletedState;
      }
      // console.log(session.username);
      return session;
    },
  },
  events: {},
  debug: false,
});
