import { TodoModel } from '@src/mongoDb/daoModels/todo';
import { ObjectId } from 'mongodb';
import { ROLE } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingBasicInfoModel/types';
import { UserOnboardingBasicInfoModel } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingBasicInfoModel';

const doc = {
  email: 'abc@gmail.com',
  name: 'ABC',
  username: 'abc',
  isFresher: true,
  yearsOfExperience: {
    years: 0,
    months: 0,
  },
  domainOfExperience: ROLE.BACKEND_ENGINEER,
  skills: {
    core: [
      {
        id: '1',
        name: 'React',
        logoKeyPath: {
          bucketName: 'skill',
          key: 'react.svg',
        },
      },
      {
        id: '2',
        name: 'GQL',
        logoKeyPath: {
          bucketName: 'skill',
          key: 'gql.svg',
        },
      },
    ],
    familiar: [
      {
        id: '1',
        name: 'React',
        logoKeyPath: {
          bucketName: 'skill',
          key: 'react.svg',
        },
      },
      {
        id: '2',
        name: 'GQL',
        logoKeyPath: {
          bucketName: 'skill',
          key: 'gql.svg',
        },
      },
    ],
  },
};
const updateTodoResolver = async (_: any, { todoId, data }, { session }) => {
  if (!session) {
    throw new Error('Unauthenticated user');
  } else {
    console.log('Passed!! Session is : ', JSON.stringify(session));
  }
  // let response = await UserOnboardingBasicInfoModel.create(doc);
  const result = await TodoModel.findOneAndUpdate(
    {
      _id: ObjectId.createFromHexString(todoId),
    },
    { $set: data },
    {
      returnOriginal: true,
    }
  );

  return {
    todoId: result._id.toHexString(),
    completed: result.completed,
    description: result.description,
  };
};

export default updateTodoResolver;
