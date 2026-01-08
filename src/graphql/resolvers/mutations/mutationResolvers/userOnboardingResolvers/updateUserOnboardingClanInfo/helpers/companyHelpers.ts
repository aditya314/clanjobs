import { filter, map, union } from 'lodash';
import mongoose from 'mongoose';
import { CompanyModel } from '@src/mongoDb/daoModels/entityModels/companyModel';
import { ASSETS_BUCKET, S3_FOLDER } from '@src/coreConfigs/constants/enums';
import { ClanModel } from '@src/mongoDb/daoModels/entityModels/clanModel';
import { CLAN_TYPE } from '@src/mongoDb/daoModels/entityModels/clanModel/types';
import ICompany from '@src/mongoDb/daoModels/entityModels/companyModel/types';
import axios from 'axios';
import { putS3Object } from '@src/coreUtils/s3Utils';

export const getCompanyNamesToFetch = (currentCompanyInfo, pastCompaniesInfo): Array<string> => {
  return currentCompanyInfo
    ? union(
        [currentCompanyInfo.name],
        map(pastCompaniesInfo, pastCompanyInfo => pastCompanyInfo.name)
      )
    : map(pastCompaniesInfo, pastCompanyInfo => pastCompanyInfo.name);
};

const createLogoInS3 = async companyDomainName => {
  //https://stackoverflow.com/questions/61605078/axios-get-a-file-from-url-and-upload-to-s3
  const logoUrl = 'https://logo.clearbit.com/' + companyDomainName + '.com';
  const downloadResponse = await axios.get(encodeURI(logoUrl), { responseType: 'arraybuffer' });
  const contentType = downloadResponse.headers['content-type'].split('/')[1];
  const companyLogoS3Key = S3_FOLDER.COMPANY_LOGOS + '/' + companyDomainName + '.' + contentType;
  await putS3Object(downloadResponse.data, {
    Bucket: ASSETS_BUCKET.LOGOS,
    Key: companyLogoS3Key,
  });
  return companyLogoS3Key;
};

const createCompanyAndClan = async (companyName, companyDomain) => {
  let companyDomainName = companyDomain.split('.')[0];
  //split "goldmansachs.com" at "." to get goldmansachs
  //{"name":"Goldman Sachs","domain":"goldmansachs.com","logo":"https://logo.clearbit.com/goldmansachs.com"}
  let companyLogoS3Key = await createLogoInS3(companyDomainName);
  const companyID = new mongoose.Types.ObjectId();
  const clanID = new mongoose.Types.ObjectId();
  const companyInfo = await CompanyModel.create({
    _id: companyID,
    name: companyName,
    logoKeyPath: {
      bucketName: ASSETS_BUCKET.LOGOS,
      key: companyLogoS3Key,
    },
    clanId: clanID,
  });
  await ClanModel.create({
    _id: clanID,
    name: companyName,
    logoKeyPath: {
      bucketName: ASSETS_BUCKET.LOGOS,
      key: companyLogoS3Key,
    },
    sourceId: clanID,
    clanType: CLAN_TYPE.COMPANY,
  });
  return companyInfo;
};

export const enrichOrCreateCompany = async (companyDBResponse, companyInfo) => {
  let companyDBInfo: Array<ICompany> = filter(
    companyDBResponse,
    company => company.name == companyInfo.name
  );
  return companyDBInfo.length > 0
    ? companyDBInfo[0]
    : await createCompanyAndClan(companyInfo.name, companyInfo.domain);
};
