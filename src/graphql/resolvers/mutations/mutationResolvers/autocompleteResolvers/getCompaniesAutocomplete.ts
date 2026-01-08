import getUniqueResponseFromClearbitAPI from '@src/clearbit';
import { CompaniesAutocompleteResponse, CompanyAutocomplete } from '@src/graphql/types';
import { ErrorCodes } from '@src/coreConfigs/constants/enums';

const getCompaniesAutocompleteResolver = async (
  _: any,
  { prefix },
  { session }
): Promise<CompaniesAutocompleteResponse> => {
  let clearbitCompaniesResponse: Array<CompanyAutocomplete> = [];
  if (!session) {
    throw new Error(ErrorCodes.NOT_AUTHORIZED);
  }
  try {
    clearbitCompaniesResponse = await getUniqueResponseFromClearbitAPI(prefix);
  } catch (e) {
    console.log(e);
    throw new Error(ErrorCodes.INTERNAL_SERVER_ERROR);
  }
  return { companies: clearbitCompaniesResponse };
};

export default getCompaniesAutocompleteResolver;
