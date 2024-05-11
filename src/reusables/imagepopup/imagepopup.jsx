/* eslint-disable react/prop-types */
import { 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  Image,
  Center
} from "@chakra-ui/react";
// import PropTypes from 'prop-types'

export default function ImagePopup({isOpen, setIsOpen, modalTitle, modalContent}) {
  return (
    <Modal isOpen={isOpen} onClose={setIsOpen}>
      <ModalOverlay />
      <ModalContent w={'50vw'} paddingBottom={'2vh'}>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <Image src={modalContent} w={'inherit'} h={'inherit'}/>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}