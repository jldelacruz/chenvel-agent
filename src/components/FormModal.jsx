import { Modal, Button } from 'react-bootstrap';

const FormModal = ({show, size, handleClose, handleSubmit, title, children}) => {
    return (
        <Modal show={show} onHide={handleClose} size={size}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <Button type='button' variant="primary" size="sm" onClick={handleSubmit}>
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