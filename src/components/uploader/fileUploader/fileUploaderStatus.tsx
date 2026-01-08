import { Icon, Link, Progress, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FiXCircle } from 'react-icons/fi';
import Image from '@components/common/image';
import { UPLOAD_STATE } from '@src/coreConfigs/constants/enums';

const getUploadSuccessMeta = (uploadState, form) => ({
  href: form.values.resumeFile.signedUrl,
  text: form.values.resumeFile.name,
  icon: FaCheckCircle,
  color: 'green',
});

const getUploadFailureMeta = (uploadState, form) => ({
  href: null,
  text: 'Failed to Upload ' + form.values.resumeFile.name,
  icon: FiXCircle,
  color: 'red',
});

const getUploadNotInitiatedMeta = (uploadState, form) => ({
  href: null,
  text: '',
  icon: null,
});

const UPLOAD_STATE_INFO_PROCESSOR = {
  [UPLOAD_STATE.UPLOAD_SUCCESS]: getUploadSuccessMeta,
  [UPLOAD_STATE.UPLOAD_FAILED]: getUploadFailureMeta,
  [UPLOAD_STATE.UPLOAD_NOT_INITIATED]: getUploadNotInitiatedMeta,
  [UPLOAD_STATE.UPLOAD_IN_PROGRESS]: getUploadNotInitiatedMeta,
};

const FileUploaderStatus = ({ form, uploadState }) => {
  const uploadedFileMeta = UPLOAD_STATE_INFO_PROCESSOR[uploadState](uploadState, form);

  if (uploadState === UPLOAD_STATE.UPLOAD_NOT_INITIATED) return <></>;

  if (uploadState === UPLOAD_STATE.UPLOAD_IN_PROGRESS)
    return (
      <Stack my={2}>
        <Progress size="xs" hasStripe isIndeterminate />
      </Stack>
    );

  return (
    <>
      <Stack mt={6} direction="row" spacing={4} align="center">
        <Image src="/static/images/pdfLogo.png" width="3rem" height="3rem" alt="Pdf Logo" />
        <Stack direction="column" spacing={0} fontSize={'sm'}>
          <Link href={uploadedFileMeta.href} fontWeight="bold" isExternal>
            <Text
              fontWeight={600}
              color={uploadState === UPLOAD_STATE.UPLOAD_FAILED && uploadedFileMeta.color}
            >
              {uploadedFileMeta.text}
            </Text>
          </Link>
          <Text color={'gray.500'}>{form.values.resumeFile.size}</Text>
        </Stack>
        <Icon fontSize="2xl" color={uploadedFileMeta.color} as={uploadedFileMeta.icon} />
      </Stack>
    </>
  );
};
export default FileUploaderStatus;
