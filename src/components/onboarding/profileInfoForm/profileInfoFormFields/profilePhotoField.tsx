import { Flex, FormControl, FormLabel } from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';
import ImageUploader from '@components/uploader/imageUploader/imageUploader';
import { isNil } from 'lodash';
import { uploadURLToS3 } from '@components/uploader/utils';
import { ASSETS_BUCKET, S3_FOLDER } from '@src/coreConfigs/constants/enums';

export const hasUserUploadedPicture = values =>
  !isNil(values.profilePhoto) &&
  !isNil(values.profilePhoto.s3Path.bucket) &&
  !isNil(values.profilePhoto.s3Path.key);

export const uploadSessionProfilePicOnS3 = async (session, getSignedS3UrlMutation) => {
  return await uploadURLToS3(
    session.user.image,
    session.username,
    ASSETS_BUCKET.PROFILE_PICTURES,
    S3_FOLDER.PROFILE_PICTURES,
    getSignedS3UrlMutation
  );
};

export default function ProfilePhotoField() {
  return (
    <Flex direction="column" width={['100%', '50%']}>
      <Field name="profilePhoto">
        {({ field, form }) => (
          <FormControl id="profilePhoto" my={4}>
            <FormLabel>Profile Photo </FormLabel>
            <ImageUploader form={form} field={field} />
          </FormControl>
        )}
      </Field>
    </Flex>
  );
}
