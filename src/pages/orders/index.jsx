import { useState } from 'react';
import { time, timeTo } from '../../api/constants';

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

import { order, orderValidation } from '../../models/order';

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
        Order a Box
      </Button>
      <FormModal
        size='lg' 
        show={show} 
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        title='Order a box'
      >
        <Formik>
          <Form noValidate>
            <Row>
              <FormControl 
                label='Delivery Date:'
                type="date"
                size='sm'
                name="deliveryDate"
                value={values.deliveryDate}
                onChange={handleChange}
                isInvalid={touched.deliveryDate && errors.deliveryDate} 
                error={errors.deliveryDate}
                addlProps={{md: 6,  className: 'mb-3'}}
              />
              <FormSelect 
                name='timeFrom'
                label='Time(From):'
                value={values.timeFrom}
                onChange={handleChange}
                size='sm'
                list={time}
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
                label='PL:'
                type="number"
                size='sm'
                name="pl"
                value={values.pl}
                onChange={handleChange}
                isInvalid={touched.pl && errors.pl} 
                error={errors.pl}
                addlProps={{md: 3, className: 'mb-4'}}
              />
              <FormControl 
                label='Sticker:'
                type="number"
                size='sm'
                name="sticker"
                value={values.sticker}
                onChange={handleChange}
                isInvalid={touched.sticker && errors.sticker} 
                error={errors.sticker}
                addlProps={{md: 3, className: 'mb-4'}}
              />
            </Row>
            <Row>
              <FormCheck 
                label='COD?'
                type="switch"
                size='sm'
                name="cod"
                value={values.cod}
                onChange={handleChange}
                error={errors.sticker}
                addlProps={{md: 3, className: 'mb-3'}}
              />
              <FormCheck 
                label='E-Collect?'
                type="switch"
                size='sm'
                name="isECollect"
                value={values.isECollect}
                onChange={handleChange}
                error={errors.isECollect}
                addlProps={{md: 3, className: 'mb-3'}}
              />
              <FormCheck 
                label='Genkan?'
                type="switch"
                size='sm'
                name="isGenkan"
                value={values.isGenkan}
                onChange={handleChange}
                error={errors.isGenkan}
                addlProps={{md: 3, className: 'mb-3'}}
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

export default Orders;