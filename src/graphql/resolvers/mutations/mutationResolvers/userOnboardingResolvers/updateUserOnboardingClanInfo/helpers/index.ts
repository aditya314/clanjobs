import ICompany from '@src/mongoDb/daoModels/entityModels/companyModel/types';
import { CompanyModel } from '@src/mongoDb/daoModels/entityModels/companyModel';
import { filter, map } from 'lodash';
import { IEducationInfo } from '@src/mongoDb/daoModels/userOnboardingModels/userOnboardingClanInfoModel/types';
import { checkIfArrayHasValidObjectIDs } from '@src/graphql/resolvers/commonUtils/validators';
import ICollege from '@src/mongoDb/daoModels/entityModels/collegeModel/types';
import { CollegeModel } from '@src/mongoDb/daoModels/entityModels/collegeModel';
import {
  enrichOrCreateCompany,
  getCompanyNamesToFetch,
} from '@src/graphql/resolvers/mutations/mutationResolvers/userOnboardingResolvers/updateUserOnboardingClanInfo/helpers/companyHelpers';

export const enrichEducationInfo = async (education): Promise<Array<IEducationInfo>> => {
  let collegeIDsToFetch = map(education, 'collegeId');
  if (!checkIfArrayHasValidObjectIDs(collegeIDsToFetch)) {
    throw new Error('Invalid ids in college list');
  }
  let collegesDBResponse: Array<ICollege> = await CollegeModel.find({
    _id: { $in: collegeIDsToFetch },
  });
  return map(education, educationInfo => {
    let collegeDBInfo = filter(
      collegesDBResponse,
      (college: ICollege) => college._id.toString() === educationInfo.collegeId
    )[0];
    return {
      collegeId: collegeDBInfo._id,
      name: collegeDBInfo.name,
      clanId: collegeDBInfo.clanId,
      yearOfGraduation: educationInfo.yearOfGraduation,
      specialization: educationInfo.specialization,
      degree: educationInfo.degree,
    };
  });
};

export const enrichWorkExperienceInfo = async (
  currentCompanyInfo,
  pastCompaniesInfo
): Promise<{
  currentCompany?: ICompany;
  pastCompanies?: Array<ICompany>;
}> => {
  let enrichedCompanyInfo = {};
  let companyNamesToFetch: Array<string> = getCompanyNamesToFetch(
    currentCompanyInfo,
    pastCompaniesInfo
  );
  let companyDBResponse: Array<ICompany>;
  if (companyNamesToFetch.length > 0) {
    companyDBResponse = await CompanyModel.find({
      name: { $in: companyNamesToFetch },
    });
  }
  if (currentCompanyInfo) {
    enrichedCompanyInfo['currentCompany'] = await enrichOrCreateCompany(
      companyDBResponse,
      currentCompanyInfo
    );
  }
  if (pastCompaniesInfo) {
    //https://stackoverflow.com/questions/47065444/lodash-is-it-possible-to-use-map-with-async-functions
    enrichedCompanyInfo['pastCompanies'] = await Promise.all(
      map(
        pastCompaniesInfo,
        async pastCompanyInfo => await enrichOrCreateCompany(companyDBResponse, pastCompanyInfo)
      )
    );
  }
  return enrichedCompanyInfo;
};
