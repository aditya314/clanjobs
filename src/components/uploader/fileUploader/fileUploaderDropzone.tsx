import React from 'react';
import Dropzone from 'react-dropzone';
import { Button, Flex, Text } from '@chakra-ui/react';
import { GET_SIGNED_S3_URL } from '@src/coreConfigs/constants/apolloClient/mutations';
import { useMutation } from '@apollo/client';
import { FaUpload } from 'react-icons/fa';
import { formatBytes } from '@src/coreUtils/dataParsers';
import { ASSETS_BUCKET, S3_FOLDER, UPLOAD_STATE } from '@src/coreConfigs/constants/enums';
import { setFileToFieldValue, uploadFileToS3 } from '@components/uploader/utils';
import { useSession } from 'next-auth/client';

function FileUploaderHelpText() {
  return (
    <Flex direction="column" bgColor="gray.100" mt={4} py={4} rounded="xl">
      <Button
        variant="ghost"
        leftIcon={<FaUpload />}
        textAlign="center"
        color="blackAlpha.800"
        _hover={{}}
      >
        Upload Resume Here
      </Button>
      <Text textAlign="center" color="blackAlpha.600">
        Upload or Drag & Drop
      </Text>
      <Text textAlign="center" color="blackAlpha.600">
        Only PDF files are allowed upto 5MB
      </Text>
    </Flex>
  );
}

export function FileUploaderDropzone({ form, field, setUploadState }) {
  const [getSignedS3UrlMutation] = useMutation(GET_SIGNED_S3_URL);
  const [session, sessionLoading] = useSession();

  const handleDrop = async files => {
    const file = files[0];
    setUploadState(UPLOAD_STATE.UPLOAD_IN_PROGRESS);
    const { S3UploadState, S3UploadKey } = await uploadFileToS3(
      file,
      session.username,
      ASSETS_BUCKET.RESUME_FILES,
      S3_FOLDER.RESUME_FILES,
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
      ASSETS_BUCKET.RESUME_FILES,
      S3UploadState === UPLOAD_STATE.UPLOAD_SUCCESS ? S3UploadKey : null,
      S3UploadState === UPLOAD_STATE.UPLOAD_SUCCESS ? getSignedS3UrlMutation : null
    );
  };

  return (
    <Dropzone onDrop={handleDrop} accept="application/pdf">
      {({ getRootProps, getInputProps, isDragAccept, isDragReject }) => {
        const additionalClass = isDragAccept ? 'accept' : isDragReject ? 'reject' : '';
        return (
          <div
            {...getRootProps({
              className: `dropzone ${additionalClass}`,
            })}
          >
            <input {...getInputProps()} />
            <FileUploaderHelpText />
          </div>
        );
      }}
    </Dropzone>
  );
}
