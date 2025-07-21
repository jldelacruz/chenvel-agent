import { useState } from 'react';

import * as formik from 'formik';
import * as yup from 'yup';

import { 
  Button, 
  Col, 
  Row,
  Form,
  Container
} from "react-bootstrap";
import FormModal from '../../components/FormModal';

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
          <Container>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Delivery Date</Form.Label>
                <Form.Control
                  type="text"
                  name="deliveryDate"
                  value={values.deliveryDate}
                  onChange={handleChange}
                  isValid={touched.deliveryDate && !errors.deliveryDate}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Container>
        </Formik>
      </FormModal>
    </>
  );
};

export default Orders;