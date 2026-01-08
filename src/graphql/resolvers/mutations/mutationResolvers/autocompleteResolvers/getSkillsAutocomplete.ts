import { map } from 'lodash';
import { S3_Operation, SkillsAutocompleteResponse } from '@src/graphql/types';
import { SkillModel } from '@src/mongoDb/daoModels/entityModels/skillModel';
import { generateSignedURL } from '@src/coreUtils/s3Utils';
import ISkill from '@src/mongoDb/daoModels/entityModels/skillModel/types';
import { ErrorCodes } from '@src/coreConfigs/constants/enums';

const getSkillsAutocompleteResolver = async (
  _: any,
  { prefix },
  { session }
): Promise<SkillsAutocompleteResponse> => {
  if (!session) {
    throw new Error(ErrorCodes.NOT_AUTHORIZED);
  }
  let response = [];
  try {
    let searchResult: Array<ISkill> = await SkillModel.aggregate([
      {
        $search: {
          index: 'autocompleteSkills',
          autocomplete: {
            query: `${prefix}`,
            path: 'name',
          },
        },
      },
      {
        $limit: 10,
      },
    ]);
    response = map(searchResult, dbItem => ({
      id: dbItem._id,
      name: dbItem.name,
      logoUrl: generateSignedURL(S3_Operation.GetObject, {
        Bucket: dbItem.logoKeyPath.bucketName,
        Key: dbItem.logoKeyPath.key,
      }).signedURL,
    }));
  } catch (e) {
    console.log(e);
    throw new Error(ErrorCodes.INTERNAL_SERVER_ERROR);
  }
  return {
    skills: response,
  };
};

export default getSkillsAutocompleteResolver;
