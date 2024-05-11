/* eslint-disable react/prop-types */
import { 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  Button, 
  ModalFooter,
  Text,
  HStack,
  Link
} from "@chakra-ui/react";
// import PropTypes from 'prop-types'

export default function Popup({isOpen, 
  setIsOpen, 
  modalTitle, 
  modalContent, 
  buttonTexts, 
  buttonURLs,
  buttonAPIs,
  buttonPayloads,
  buttonDisabled,
  buttonConfirmationText, 
  buttonConfirmationOnClick, 
  buttonColors, 
  buttonCancelConfirmationOnClick}) {
  // const [token, _] = useState();
  
  const hitAPI = (apiEndpoint, buttonPayload) => {
    console.log(apiEndpoint, buttonPayload)
    // fetch(apiEndpoint, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify(buttonPayload),
    // });
  }

  function addButtons() {
    var buttons = [];
    if (buttonTexts && buttonURLs && buttonAPIs && buttonPayloads && buttonColors && buttonDisabled) {
      for (var i = 0; i < buttonTexts.length; i++) {
        if (buttonURLs[i] !== "") {
          let tempText = buttonTexts[i].split("\n");
          let textElement = [];
          if (tempText.length > 1) {
            for (var j = 0; j < tempText.length; j++) {
              textElement.push(<Text>{tempText[j]}</Text>);
            }
          }
          if (buttonAPIs[i] === "" && buttonPayloads[i] === "") {
            buttons.push(
              <Button colorScheme={buttonColors[i]} mr={3} size={'lg'} isDisabled={buttonDisabled[i]}>
                <Link href={buttonURLs[i]} style={{ textDecoration: 'none' }}>
                  {tempText.length > 1 ? textElement : buttonTexts[i]}
                </Link>
              </Button>
            )
          } else {
            buttons.push(
              <Button colorScheme={buttonColors[i]} mr={3} size={'lg'} isDisabled={buttonDisabled[i]} onClick={() => hitAPI(buttonAPIs[i], buttonPayloads[i])}>
                <Link href={buttonURLs[i]} style={{ textDecoration: 'none' }}>
                  {tempText.length > 1 ? textElement : buttonTexts[i]}
                </Link>
              </Button>
            )
          }
        }
        else {
          buttons.push(<Button colorScheme={buttonColors[i]} mr={3} onClick={() => setIsOpen(false)} size={'lg'}>{buttonTexts[i]}</Button>)
        }
      }
    } else if (buttonConfirmationText && buttonConfirmationOnClick) {
      buttons.push(<Button colorScheme="red" mr={3} onClick={buttonCancelConfirmationOnClick}>Cancel</Button>)
      buttons.push(<Button colorScheme="blue" mr={3} onClick={buttonConfirmationOnClick}>{buttonConfirmationText}</Button>)
    }
    return buttons;
  }

  return (
    <Modal isOpen={isOpen} onClose={setIsOpen}>
      <ModalOverlay />
      <ModalContent maxW={'50vw'}>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{modalContent}</Text>
        </ModalBody>
        <ModalFooter>
          <HStack rowGap={3} columnGap={1} justify={'center'} wrap={'wrap'}>
            {buttonTexts.length !== 0 || buttonConfirmationText ? addButtons() : null}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}