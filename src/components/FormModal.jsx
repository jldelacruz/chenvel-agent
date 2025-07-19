import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const FormModal = ({show, handleClose, title, children}) => {
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" size="sm" onClick={handleClose}>
            Close
            </Button>
            <Button variant="primary" size="sm" onClick={handleClose}>
            Save
            </Button>
        </Modal.Footer>
    </Modal>
}

export default FormModal;