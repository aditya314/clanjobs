import { Modal, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { Button, useBreakpointValue, useDisclosure, Container, useToast } from '@chakra-ui/react';
import { CheckAvailabilityModalBody } from '@src/components/jobDashboard/checkAvailabilityModalBody';
import { useSession } from 'next-auth/client';
import CheckAvailabilityModalFooter from '@components/jobDashboard/checkAvailabilityModalFooter';

export default function CheckAvailabilityModal({
  company,
  acceptingReferrers,
  jobId,
  setIsRequested,
  hasEnoughGems,
  username,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const modalSize = useBreakpointValue({ base: 'xs', md: 'xl' });
  return (
    <>
      <Container maxW="4xl">
        <Button variant="variantSolid" my={2} width="100%" onClick={onOpen}>
          Check Availability
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>People accepting referrals from {company.name}</ModalHeader>
            <CheckAvailabilityModalBody
              companyName={company.name}
              acceptingReferrers={acceptingReferrers}
            />
            <CheckAvailabilityModalFooter
              username={username}
              hasEnoughGems={hasEnoughGems}
              jobId={jobId}
              onClose={onClose}
              setIsRequested={setIsRequested}
            />
          </ModalContent>
        </Modal>
      </Container>
    </>
  );
}
