import { Modal, Button } from 'react-bootstrap';
import { Check, XCircle } from 'react-bootstrap-icons';

const FormModal = ({show, size, handleClose, handleSubmit, title, children}) => {
    return (
        <Modal show={show} onHide={handleClose} size={size}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <Button type='button' variant="primary" size="sm" onClick={handleSubmit}>
                <Check size={20} /> Save
                </Button>
                <Button variant="secondary" size="sm" onClick={handleClose}>
                <XCircle size={17} /> Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FormModal;