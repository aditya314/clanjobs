import mongoose from 'mongoose';
import UserBasicInfo from '../src/mongoDb/daoModels/userOnboardingModels/userOnboardingBasicInfoModel';

const dbPromise = mongoose
  .connect(
    'mongodb+srv://clanjobsadmin:rllMRDJ6QkelCA4z@cluster0.s5ukk.mongodb.net/clanjobs-db?retryWrites=true&w=majority',
    opts
  )
  .then(mongoose => {
    return mongoose;
  });
try {
  console.log('Connecting to MongoDB... 🙏');
  await dbPromise;
} catch (e) {
  console.log('Could not connect to DB. 😭');
}

const result = await UserBasicInfo.insert({
  email: 'abc@gmail.com',
  name: 'ABC',
  username: 'abc',
  isFresher: true,
  yearsOfExperience: {
    years: 0,
    months: 0,
  },
  domainOfExperience: 'Backend Enginner',
  skills: {
    core: [
      {
        id: 1,
        name: 'React',
        logoKeyPath: {
          bucketName: 'skill',
          key: 'react.svg',
        },
      },
      {
        id: 2,
        name: 'GQL',
        logoKeyPath: {
          bucketName: 'skill',
          key: 'gql.svg',
        },
      },
    ],
    familiar: [
      {
        id: 1,
        name: 'React',
        logoKeyPath: {
          bucketName: 'skill',
          key: 'react.svg',
        },
      },
      {
        id: 2,
        name: 'GQL',
        logoKeyPath: {
          bucketName: 'skill',
          key: 'gql.svg',
        },
      },
    ],
  },
});
