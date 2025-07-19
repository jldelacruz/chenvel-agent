import { useState } from 'react';

import { Button } from "react-bootstrap";

import FormModal from '../../components/FormModal';

const Orders = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <h4>Orders</h4>
      <Button variant="primary" size="sm" onClick={handleShow}>
        Order a box
      </Button>
      <FormModal 
        show={show} 
        handleClose={handleClose}
        title='Order a box'
      >
        <label>etrsa</label>
      </FormModal>
    </>
  );
};

export default Orders;