import * as AWS from 'aws-sdk';
import { GetSignedS3UrlResponse, S3_Operation } from '@src/graphql/types';

AWS.config.update({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID_CLANJOBS,
    secretAccessKey: process.env.SECRET_ACCESS_KEY_CLANJOBS,
  },
  region: process.env.AWS_REGION_CLANJOBS,
  signatureVersion: 'v4',
});

const s3Instance = new AWS.S3();

export type S3Params = {
  Bucket: string;
  Key: string;
};
const DOMAIN_TO_S3_MAPPER = {
  [S3_Operation.GetObject]: 'getObject',
  [S3_Operation.PutObject]: 'putObject',
};

export function generateSignedURL(
  operation: S3_Operation,
  s3Params: S3Params
): GetSignedS3UrlResponse {
  let signedRequest;
  if (operation === S3_Operation.PutObject) {
    signedRequest = s3Instance.getSignedUrl(DOMAIN_TO_S3_MAPPER[operation], {
      ...s3Params,
      ContentType: 'application/pdf',
      ACL: 'public-read',
    });
  } else {
    signedRequest = s3Instance.getSignedUrl(DOMAIN_TO_S3_MAPPER[operation], s3Params);
  }
  const url = `https://${s3Params.Bucket}.s3.amazonaws.com/${s3Params.Key}`;
  return {
    signedURL: signedRequest,
    url: url,
  };
}

export async function getS3Object<DataType>(s3Params: S3Params): Promise<DataType> {
  try {
    const data = await s3Instance.getObject(s3Params).promise();
    console.log('S3_GET_SUCCESS');

    const stringObject = data?.Body?.toString() ?? '';
    return (stringObject as unknown) as DataType;
  } catch (e) {
    console.log('S3_GET_FAILED');
  }
}

export async function putS3Object<DataType>(data: DataType, s3Params: S3Params) {
  try {
    //https://stackoverflow.com/questions/14150854/aws-s3-display-file-inline-instead-of-force-download
    //TODO: set content type for each type of Object or through UI to avoid download in browser itself
    await s3Instance.putObject({ ...s3Params, Body: data }).promise();
  } catch (e) {
    console.log('S3_PUT_FAILED', e);
  }
}

export default s3Instance;
