import { Form, Col, InputGroup } from "react-bootstrap";

const FormSelect = ({label, value, name, onChange, size, list, isInvalid, error, addlProps, icon}) => {
    return (
        <Form.Group as={Col} {...addlProps}>
            <Form.Label size='sm'>{label}</Form.Label>
            <InputGroup>
                { icon ? <InputGroup.Text>{icon}</InputGroup.Text> : null }
                <Form.Select name={name} size={size} isInvalid={isInvalid} value={value} onChange={onChange}>
                    <option key={0} value=''></option>
                    {list.map((l) => {
                        return (<option key={l.value} value={l.value}>{l.text}</option>);
                    })}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>
            </InputGroup>
        </Form.Group>
    );
}

export default FormSelect;