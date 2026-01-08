import { Flex, FormControl, FormErrorMessage, FormLabel, Text } from '@chakra-ui/react';
import { Field } from 'formik';
import React, { useState } from 'react';
import { FileUploaderDropzone } from '@components/uploader/fileUploader/fileUploaderDropzone';
import FileUploaderStatus from '@components/uploader/fileUploader/fileUploaderStatus';
import { UPLOAD_STATE } from '@src/coreConfigs/constants/enums';
import { isNil } from 'lodash';

function validateResume(value) {
  let error;
  if (isNil(value?.s3Path?.bucket) && isNil(value?.s3Path?.key)) {
    error = 'Please attach resume';
  }
  return error;
}

export default function ResumeUploaderField() {
  const [uploadState, setUploadState] = useState<UPLOAD_STATE>(UPLOAD_STATE.UPLOAD_NOT_INITIATED);
  return (
    <Flex direction="column" width={['100%', '50%']}>
      <Field name="resumeFile" validate={validateResume}>
        {({ field, form }) => (
          <FormControl
            id="resumeFile"
            isRequired
            my={4}
            isInvalid={
              (form.errors.resumeFile && form.touched.resumeFile) ||
              (form.errors.resumeFile && form.submitCount)
            }
          >
            <FormLabel>Your resume </FormLabel>
            <FileUploaderDropzone form={form} field={field} setUploadState={setUploadState} />
            <FileUploaderStatus form={form} uploadState={uploadState} />
            <FormErrorMessage>{form.errors.resumeFile}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </Flex>
  );
}
