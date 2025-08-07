import * as formik from 'formik';

import { account, accountValidation } from '../../models/account';
import { sampleCities, samplePrefectures, sampleTowns } from '../../api/constants';
import { Check, GeoAlt, Phone, Signpost } from 'react-bootstrap-icons';

import { 
    Form, 
    Button,
    Row, 
    Col, 
    InputGroup,
} from 'react-bootstrap';

import FormControl from '../../components/FormControl';
import FormSelect from '../../components/FormSelect';

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
                        <Form noValidate onSubmit={handleSubmit}>
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
                                        type="number"
                                        placeholder="Contact number"
                                        name="contactNumber"
                                        value={values.contactNumber}
                                        isInvalid={touched.contactNumber && errors.contactNumber} 
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.contactNumber}</Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <FormControl 
                                label='Postal code:'
                                placeholder='Postal code'
                                type="text"
                                size='sm'
                                name="postalCode"
                                value={values.postalCode}
                                onChange={handleChange}
                                isInvalid={touched.postalCode && errors.postalCode} 
                                error={errors.postalCode}
                                addlProps={{className: 'mb-3'}}
                            />
                            <FormSelect 
                                name='prefecture'
                                label='Prefecture:'
                                value={values.prefecture}
                                onChange={handleChange}
                                size='sm'
                                list={samplePrefectures}
                                isInvalid={touched.prefecture && errors.prefecture}
                                error={errors.prefecture}
                                addlProps={{className: 'mb-3'}}
                                icon={<GeoAlt />}
                            />
                            <FormSelect 
                                name='city'
                                label='City:'
                                value={values.city}
                                onChange={handleChange}
                                size='sm'
                                list={sampleCities}
                                isInvalid={touched.city && errors.city}
                                error={errors.city}
                                addlProps={{className: 'mb-3'}}
                                icon={<GeoAlt />}
                            />
                            <FormSelect 
                                name='town'
                                label='Town:'
                                value={values.town}
                                onChange={handleChange}
                                size='sm'
                                list={sampleTowns}
                                isInvalid={touched.town && errors.town}
                                error={errors.town}
                                addlProps={{className: 'mb-3'}}
                                icon={<GeoAlt />}
                            />
                            
                            <Form.Group controlId="formAddress" className="mb-4">
                                <Form.Label>Street Address:</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text><Signpost /></InputGroup.Text>
                                    <Form.Control
                                        required
                                        size='sm'
                                        type="text"
                                        placeholder="Street address:"
                                        name="streetAddress"
                                        value={values.streetAddress}
                                        isInvalid={touched.streetAddress && errors.streetAddress} 
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.streetAddress}</Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            <Button type='submit' size='sm'>
                                <Check size={20} /> Save
                            </Button>
                        </Form>
                    </Formik>
                </Col>
            </Row>
        </>
    );
}

export default Account;