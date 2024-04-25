import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import parse from 'html-react-parser';

const PrivacyPopup = ({content , isOpen, setIsOpen}) => {

  function closeTheModal() {
    setIsOpen(false)
  }

  return (
    <Modal  onClose={closeTheModal}  isOpen={isOpen} >
    <ModalContent>
      {(setClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1 mt-4">
            سياسة الإستبدال والإسترجاع
          </ModalHeader>
          <hr className="px-8" />
          <ModalBody className="pb-8">
            {
              parse(content.replaceAll('\n', '<br />'))
            }
          </ModalBody>
        </>
      )}
    </ModalContent>
  </Modal>
  )
}


export default PrivacyPopup