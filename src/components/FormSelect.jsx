import { Form, Col } from "react-bootstrap";

const FormSelect = ({label, value, name, onChange, size, list, isInvalid, error, addlProps}) => {
    return (
        <Form.Group as={Col} {...addlProps}>
            <Form.Label size='sm'>{label}</Form.Label>
            <Form.Select name={name} size={size} isInvalid={isInvalid} value={value} onChange={onChange}>
                <option key={0} value=''></option>
                {list.map((l) => {
                    return (<option key={l.value} value={l.value}>{l.text}</option>);
                })}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
                {error}
            </Form.Control.Feedback>
        </Form.Group>
    );
}

export default FormSelect;