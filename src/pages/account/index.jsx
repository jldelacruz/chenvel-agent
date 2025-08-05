import * as formik from 'formik';

import { account, accountValidation } from '../../models/account';
import { Check, Envelope, Lock, Person, Phone } from 'react-bootstrap-icons';

import { 
    Form, 
    Button, 
    Container, 
    Row, 
    Col, 
    InputGroup,
    Alert 
} from 'react-bootstrap';

import FormControl from '../../components/FormControl';

const Account = () => {
    const { Formik, useFormik } = formik;
    
    const handleFormSubmit = (values) => {
        console.log(values);
    }

    const {
        handleChange,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
        resetForm,
    } = useFormik({
        validateOnChange: false,
        initialValues: account,
        validationSchema: accountValidation,
        onSubmit: handleFormSubmit,
    });

    return(
        <>
            <h4 className='mb-4'>Account Details</h4>
            <Row>
                <Col md={4} lg={3}>
                    <Formik>
                        <Form noValidate>
                            <FormControl 
                                label='First Name:'
                                placeholder='First name'
                                type="text"
                                size='sm'
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                isInvalid={touched.firstName && errors.firstName} 
                                error={errors.firstName}
                                addlProps={{className: 'mb-3'}}
                            />
                            <FormControl 
                                label='Last Name:'
                                placeholder='Last name'
                                type="text"
                                size='sm'
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                isInvalid={touched.lastName && errors.lastName} 
                                error={errors.lastName}
                                addlProps={{className: 'mb-3'}}
                            />
                            <FormControl 
                                label='Middle Name:'
                                placeholder='Middle name'
                                type="text"
                                size='sm'
                                name="middleName"
                                value={values.middleName}
                                onChange={handleChange}
                                isInvalid={touched.middleName && errors.middleName} 
                                error={errors.middleName}
                                addlProps={{className: 'mb-3'}}
                            />
                            <Form.Group controlId="formPhone" className="mb-3">
                                <Form.Label>Phone Number:</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text><Phone /></InputGroup.Text>
                                    <Form.Control
                                        required
                                        size='sm'
                                        type="text"
                                        placeholder="Contact number"
                                        name="contactNumber"
                                        value={values.contactNumber}
                                        isInvalid={touched.contactNumber && errors.contactNumber} 
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.contactNumber}</Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form>
                    </Formik>
                </Col>
            </Row>
        </>
    );
}

export default Account;