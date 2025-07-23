import { useState } from 'react';
import { time } from '../../api/constants';

import * as formik from 'formik';

import { 
  Button, 
  Col, 
  Row,
  Form,
  Container
} from "react-bootstrap";
import FormModal from '../../components/FormModal';

import FormControl from '../../components/FormControl';
import FormSelect from '../../components/FormSelect';

import { order, orderValidation } from '../../models/orders';

const Orders = () => {
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
		initialValues: order,
		validationSchema: orderValidation,
		onSubmit: handleFormSubmit,
	});

  return (
    <>
      <h4>Orders</h4>
      <Button variant="primary" size="sm" onClick={handleShow}>
        Order a box
      </Button>
      <FormModal 
        show={show} 
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        title='Order a box'
      >
        <Formik>
          <Form noValidate>
            <Row className="mb-3">
              <FormControl 
                label='Delivery Date:'
                type="date"
                name="deliveryDate"
                value={values.deliveryDate}
                onChange={handleChange}
                isInvalid={touched.deliveryDate && errors.deliveryDate} 
                error={errors.deliveryDate}
              />
            </Row>
            <Row>
              <FormSelect 
                name='timeFrom'
                label='Time(From):'
                value={values.timeFrom}
                onChange={handleChange}
                size='sm'
                list={time}
                isInvalid={touched.timeFrom && errors.timeFrom}
                error={errors.timeFrom}
                addlProps={{md: 6, className: 'mb-3'}}
              />
              <FormSelect 
                name='timeTo'
                label='Time(To):'
                value={values.timeTo}
                onChange={handleChange}
                size='sm'
                list={time}
                isInvalid={touched.timeTo && errors.timeTo}
                error={errors.timeTo}
                addlProps={{md: 6, className: 'mb-3'}}
              />
            </Row>
              <FormControl 
                label='Jumbo:'
                type="number"
                name="regQty"
                value={values.regQty}
                onChange={handleChange}
                isInvalid={touched.regQty && errors.regQty} 
                error={errors.regQty}
              />
            <Row>
            </Row>
          </Form>
        </Formik>
      </FormModal>
    </>
  );
};

export default Orders;