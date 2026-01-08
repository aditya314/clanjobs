import axios from 'axios';
import { ASSETS_BUCKET, S3_FOLDER, UPLOAD_STATE } from '@src/coreConfigs/constants/enums';
import { S3_Operation } from '@src/graphql/types';

export const getSignedS3UrlResponse = async (getSignedS3UrlMutation, variables) => {
  const response = await getSignedS3UrlMutation(variables);
  return response?.data?.getSignedS3URL?.signedURL;
};

export async function putFileToS3(file, signedRequest): Promise<UPLOAD_STATE> {
  try {
    await axios.put(signedRequest, file, {
      headers: {
        'Content-Type': file?.type,
      },
    });
    return UPLOAD_STATE.UPLOAD_SUCCESS;
  } catch (e) {
    return UPLOAD_STATE.UPLOAD_FAILED;
  }
}

export const getVariablesForGetSignedS3Url = (operation, s3Params) => {
  return {
    variables: {
      input: {
        operation: operation,
        s3Params: s3Params,
      },
    },
  };
};

export const uploadFileToS3 = async (file, username, bucket, folder, getSignedS3UrlMutation) => {
  const S3UploadKey = folder + '/' + username + '.' + file?.name.split('.')[1];

  const signedRequestForPut = await getSignedS3UrlResponse(
    getSignedS3UrlMutation,
    getVariablesForGetSignedS3Url(S3_Operation.PutObject, {
      bucket: bucket,
      key: S3UploadKey,
    })
  );
  const S3UploadState = signedRequestForPut
    ? await putFileToS3(file, signedRequestForPut)
    : UPLOAD_STATE.UPLOAD_FAILED;
  return { S3UploadState, S3UploadKey };
};

export const uploadURLToS3 = async (imageURL, username, bucket, folder, getSignedS3UrlMutation) => {
  const downloadResponse = await axios.get(encodeURI(imageURL), {
    responseType: 'arraybuffer',
  });
  //TODO: This fails with CORS error sometime. Not reproducible now
  const extension = downloadResponse.headers['content-type'].split('/')[1];
  const S3UploadKey = folder + '/' + username + '.' + extension;

  const signedRequestForPut = await getSignedS3UrlResponse(
    getSignedS3UrlMutation,
    getVariablesForGetSignedS3Url(S3_Operation.PutObject, {
      bucket: bucket,
      key: S3UploadKey,
    })
  );
  const S3UploadState = signedRequestForPut
    ? await putFileToS3(downloadResponse.data, signedRequestForPut)
    : UPLOAD_STATE.UPLOAD_FAILED;
  return { S3UploadState, S3UploadKey };
};

export const setFileToFieldValue = async (
  form,
  field,
  fileInfo,
  bucket,
  S3UploadKey,
  getSignedS3UrlMutation
) => {
  let signedRequestForGet = null;
  if (getSignedS3UrlMutation) {
    signedRequestForGet = await getSignedS3UrlResponse(
      getSignedS3UrlMutation,
      getVariablesForGetSignedS3Url(S3_Operation.GetObject, {
        bucket: bucket,
        key: S3UploadKey,
      })
    );
  }
  form.setFieldValue(field.name, {
    ...fileInfo,
    signedUrl: signedRequestForGet,
    s3Path: {
      bucket: S3UploadKey ? bucket : null,
      key: S3UploadKey,
    },
  });
};
