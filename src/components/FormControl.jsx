import { Form, Col } from "react-bootstrap";

const FormControl = ({
        label, 
        feedback,
        type,
        name,
        value,
        onChange,
        isInvalid,
        error
    }) => {
    return (
        <Form.Group as={Col}>
            <Form.Label>{label}</Form.Label>
            <Form.Control 
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                isInvalid={isInvalid}
                error={error}
            />
            <Form.Control.Feedback type="invalid">
                {error}
            </Form.Control.Feedback>
        </Form.Group>
    );
}

export default FormControl;