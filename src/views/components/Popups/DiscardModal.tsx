import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface IDiscardModal {
  show: boolean;
  modalClickYes: () => void;
  modalClickNo: () => void;
}

const DiscardModal: React.FC<IDiscardModal> = ({ show, modalClickYes, modalClickNo }) => {
  return (
    <Modal
      size='sm'
      onHide={modalClickNo}
      show={show}
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Body>Are you sure? You will lose all the changes on this page.</Modal.Body>
      <Modal.Footer style={{ padding: '2px' }}>
        <Button className='btn-sm btn-danger' onClick={modalClickYes}>
          Yes
        </Button>
        <Button className='btn-sm' onClick={modalClickNo}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DiscardModal;
