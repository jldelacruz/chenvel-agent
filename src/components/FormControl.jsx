import { Form, Col } from "react-bootstrap";

const FormControl = ({
        as,
        rows,
        label,
        placeholder,
        type,
        size,
        name,
        value,
        onChange,
        isInvalid,
        error, 
        addlProps
    }) => {
    return (
        <Form.Group as={Col} {...addlProps}>
            <Form.Label>{label}</Form.Label>
            <Form.Control 
                as={as}
                rows={rows}
                type={type}
                placeholder={placeholder}
                size={size}
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