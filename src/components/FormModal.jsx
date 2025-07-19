import { Modal, Button } from 'react-bootstrap';

const FormModal = ({show, handleClose, title, children}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" size="sm" onClick={handleClose}>
                Save
                </Button>
                <Button variant="secondary" size="sm" onClick={handleClose}>
                Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FormModal;