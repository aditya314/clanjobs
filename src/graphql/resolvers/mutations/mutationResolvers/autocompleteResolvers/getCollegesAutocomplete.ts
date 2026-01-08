import { CollegesAutocompleteResponse } from '@src/graphql/types';
import { CollegeModel } from '@src/mongoDb/daoModels/entityModels/collegeModel';
import { map } from 'lodash';
import { ErrorCodes } from '@src/coreConfigs/constants/enums';

const getCollegesAutocompleteResolver = async (
  _: any,
  { prefix },
  { session }
): Promise<CollegesAutocompleteResponse> => {
  if (!session) {
    throw new Error(ErrorCodes.NOT_AUTHORIZED);
  }
  let response = [];
  try {
    let searchResult = await CollegeModel.aggregate([
      {
        $search: {
          index: 'autocompleteColleges',
          autocomplete: {
            query: `${prefix}`,
            path: 'name',
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3,
            },
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
    }));
  } catch (e) {
    console.log(e);
    throw new Error(ErrorCodes.INTERNAL_SERVER_ERROR);
  }
  return {
    colleges: response,
  };
};

export default getCollegesAutocompleteResolver;
