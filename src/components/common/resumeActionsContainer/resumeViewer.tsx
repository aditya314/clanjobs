import { Button, Tooltip, useDisclosure } from '@chakra-ui/react';
import { FiEye } from 'react-icons/fi';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { EmbeddedPdf } from '@components/common/pdf/embeddedPdf';

export default function ResumeViewer({ name, resumeUrl }) {
  const pdfModal = useDisclosure();
  return (
    <>
      {/*<Tooltip label="View Resume" placement="top">*/}
      <Button
        size="lg"
        leftIcon={<FiEye />}
        variant="ghost"
        _hover={{
          bgColor: 'white',
        }}
        px={{ md: 0 }}
        onClick={pdfModal.onToggle}
      />
      {/*</Tooltip>*/}
      <Modal
        isCentered
        // blockScrollOnMount={false}
        onClose={pdfModal.onToggle}
        isOpen={pdfModal.isOpen}
        motionPreset="slideInBottom"
        size="4xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EmbeddedPdf pdf={resumeUrl} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
