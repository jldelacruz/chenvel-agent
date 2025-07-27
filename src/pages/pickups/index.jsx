import { useState } from 'react';
import { pickupTimeFrom, timeTo } from '../../api/constants';

import * as formik from 'formik';

import { 
  Button, 
  Row,
  Form,
} from "react-bootstrap";
import FormModal from '../../components/FormModal';

import FormControl from '../../components/FormControl';
import FormSelect from '../../components/FormSelect';
import FormCheck from '../../components/FormCheck';

import { pickup, pickupValidation } from '../../models/pickup';

const Pickups = () => {
  const { Formik, useFormik } = formik;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
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
      initialValues: pickup,
      validationSchema: pickupValidation,
      onSubmit: handleFormSubmit,
    });
  

  return (
    <>
      <h4>Pickups</h4>
      <Button variant="primary" size="sm" onClick={handleShow}>
        Schedule a Pickup
      </Button>
      <FormModal
        size='lg' 
        show={show} 
        handleClose={handleClose}
        title='Schedule a Pickup'
      >
        <Formik>
          <Form noValidate>
            <Row>
              <FormControl 
                label='Pick up Date:'
                type="date"
                size='sm'
                name="pickupDate"
                value={values.pickupDate}
                onChange={handleChange}
                isInvalid={touched.pickupDate && errors.pickupDate} 
                error={errors.pickupDate}
                addlProps={{md: 6,  className: 'mb-3'}}
              /><FormSelect 
                name='timeFrom'
                label='Time(From):'
                value={values.timeFrom}
                onChange={handleChange}
                size='sm'
                list={pickupTimeFrom}
                isInvalid={touched.timeFrom && errors.timeFrom}
                error={errors.timeFrom}
                addlProps={{md: 3, className: 'mb-3'}}
              />
              <FormSelect 
                name='timeTo'
                label='Time(To):'
                value={values.timeTo}
                onChange={handleChange}
                size='sm'
                list={timeTo}
                isInvalid={touched.timeTo && errors.timeTo}
                error={errors.timeTo}
                addlProps={{md: 3, className: 'mb-3'}}
              />
            </Row>
            <Row>
              <FormControl 
                label='Jumbo:'
                type="number"
                size='sm'
                name="regQty"
                value={values.regQty}
                onChange={handleChange}
                isInvalid={touched.regQty && errors.regQty} 
                error={errors.regQty}
                addlProps={{md: 3, className: 'mb-4'}}
              />
              <FormControl 
                label='Half:'
                type="number"
                size='sm'
                name="halfQty"
                value={values.halfQty}
                onChange={handleChange}
                isInvalid={touched.halfQty && errors.halfQty} 
                error={errors.halfQty}
                addlProps={{md: 3, className: 'mb-4'}}
              />
              <FormControl 
                label='Empty Box Pasabay:'
                type="number"
                size='sm'
                name="pasabayQty"
                value={values.pasabayQty}
                onChange={handleChange}
                isInvalid={touched.pasabayQty && errors.pasabayQty} 
                error={errors.pasabayQty}
                addlProps={{md: 3, className: 'mb-4'}}
              />
            </Row>
            <Row>
              <FormControl
                label='Memo:'
                as="textarea"
                size='sm'
                name="memo"
                value={values.memo}
                onChange={handleChange}
                isInvalid={touched.memo && errors.memo} 
                error={errors.memo}
                addlProps={{md: 12,  className: 'mb-3'}}
              />
            </Row>
          </Form>
        </Formik>
      </FormModal>
    </>
  );
};

export default Pickups;