"use client";
import {
  Center,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";

const Loader = () => {
  return (
    <Modal isOpen={true} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent
        bg="transparent"
        width="100%"
        height="80%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="xl" />
      </ModalContent>
    </Modal>
  );
};

export default Loader;
