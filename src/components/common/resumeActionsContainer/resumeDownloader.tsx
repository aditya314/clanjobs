import { Link, Button, Tooltip } from '@chakra-ui/react';
import { FiDownload } from 'react-icons/fi';

export default function ResumeDownloader({ name, resumeUrl }) {
  return (
    // <Tooltip label="Download Resume" placement="auto">
    <Link href={resumeUrl} download={name}>
      <Button
        size="lg"
        leftIcon={<FiDownload />}
        variant="ghost"
        _hover={{
          bgColor: 'white',
        }}
        px={{ md: 0 }}
      />
    </Link>
    // </Tooltip>
  );
}
