import { Image, Button, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { formatBytes } from '@src/coreUtils/dataParsers';
import { setFileToFieldValue, uploadFileToS3 } from '@components/uploader/utils';
import { ASSETS_BUCKET, S3_FOLDER, UPLOAD_STATE } from '@src/coreConfigs/constants/enums';
import { useMutation } from '@apollo/client';
import { GET_SIGNED_S3_URL } from '@src/coreConfigs/constants/apolloClient/mutations';
import { useSession } from 'next-auth/client';

export default function ImageUploader({ form, field }) {
  const [uploadState, setUploadState] = useState<UPLOAD_STATE>(UPLOAD_STATE.UPLOAD_NOT_INITIATED);
  const [session, sessionLoading] = useSession();

  const [getSignedS3UrlMutation] = useMutation(GET_SIGNED_S3_URL);
  let hiddenInput = null;

  const handleProfilePhotoSelect = async files => {
    const file = files[0];
    setUploadState(UPLOAD_STATE.UPLOAD_IN_PROGRESS);
    const { S3UploadState, S3UploadKey } = await uploadFileToS3(
      file,
      session?.username,
      ASSETS_BUCKET.PROFILE_PICTURES,
      S3_FOLDER.PROFILE_PICTURES,
      getSignedS3UrlMutation
    );
    setUploadState(S3UploadState);
    const fileInfo = {
      name: file.name,
      content: file,
      size: formatBytes(file.size),
    };
    await setFileToFieldValue(
      form,
      field,
      fileInfo,
      ASSETS_BUCKET.PROFILE_PICTURES,
      S3UploadState === UPLOAD_STATE.UPLOAD_SUCCESS ? S3UploadKey : null,
      S3UploadState === UPLOAD_STATE.UPLOAD_SUCCESS ? getSignedS3UrlMutation : null
    );
  };

  return (
    <HStack direction={'row'} spacing={4}>
      <Image
        alt="Profile Photo"
        borderRadius="full"
        boxSize="100px"
        src={form.values?.profilePhoto?.signedUrl ?? session?.user.image}
      />
      <Button size="sm" variant="outline" onClick={() => hiddenInput.click()}>
        Upload Profile Photo
      </Button>
      <input
        hidden
        type="file"
        accept="image/*"
        ref={el => (hiddenInput = el)}
        onChange={e => handleProfilePhotoSelect(e.target.files)}
      />
    </HStack>
  );
}
