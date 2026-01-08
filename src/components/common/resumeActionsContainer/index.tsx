import { HStack } from '@chakra-ui/react';
import ResumeViewer from './resumeViewer';
import ResumeDownloader from '@components/common/resumeActionsContainer/resumeDownloader';

export default function ResumeActionsContainer({ name, resumeUrl }) {
  return (
    <>
      <HStack justify={{ md: 'center' }} spacing={0}>
        <ResumeViewer name={name} resumeUrl={resumeUrl} />
        <ResumeDownloader name={name} resumeUrl={resumeUrl} />
      </HStack>
    </>
  );
}
