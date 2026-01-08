import { generateSignedURL } from '@src/coreUtils/s3Utils';

const getS3SignedURL = async (_, args, __, ___) => {
  const { operation, s3Params } = args.input;
  return generateSignedURL(operation, {
    Bucket: s3Params.bucket,
    Key: s3Params.key,
  });
};

export default getS3SignedURL;
