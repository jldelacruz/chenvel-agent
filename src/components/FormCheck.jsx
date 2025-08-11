import { Form, Col } from "react-bootstrap";

const FormCheck = ({
  label,
  type,
  size,
  name,
  value,
  onChange,
  error,
  addlProps,
}) => {
  return (
    <Form.Group as={Col} {...addlProps}>
      <Form.Check
        type={type}
        name={name}
        size={size}
        checked={value}
        value={value}
        id="custom-switch"
        label={label}
        onChange={onChange}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormCheck;
