import { ClanModel } from '@src/mongoDb/daoModels/entityModels/clanModel';
import { map } from 'lodash';

const getClansFromClanIds = async clanIds => await ClanModel.find({ _id: { $in: clanIds } });

export const getUserClans = async (currentCompany, pastCompanies, education) => {
  let clanIdsToFetch = [];
  if (currentCompany) {
    clanIdsToFetch.push(currentCompany.clanId);
  }
  if (pastCompanies) {
    map(pastCompanies, company => {
      clanIdsToFetch.push(company.clanId);
    });
  }
  if (education) {
    map(education, educationInfo => {
      clanIdsToFetch.push(educationInfo.clanId);
    });
  }
  //clan list need not be in order
  return getClansFromClanIds(clanIdsToFetch);
};
