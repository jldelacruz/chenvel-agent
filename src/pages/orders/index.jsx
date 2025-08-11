import { useEffect, useState } from "react";
import * as formik from "formik";

import { Button, Row, Form } from "react-bootstrap";

import { Cart4 } from "react-bootstrap-icons";

import FormModal from "../../components/FormModal";
import FormControl from "../../components/FormControl";
import FormSelect from "../../components/FormSelect";
import FormCheck from "../../components/FormCheck";
import ItemDetails from "../../components/ItemDetails";

import { time, timeTo } from "../../api/constants";
import { order, orderValidation } from "../../models/order";
import {
  useLazyGetOrdersQuery,
  useAddEmptyBoxMutation,
  useLazyGetTownByPostalQuery,
  useLazyGetStatesQuery,
  useLazyGetCitiesQuery,
  useLazyGetTownsQuery,
  useLazyGetOrderQuery,
  useUpdateOrderMutation,
} from "../../redux/chenvel";
import { getOptions } from "../../helpers/Helpers";

const Orders = () => {
  const { Formik, useFormik } = formik;
  const [recordId, setRecordId] = useState(0);
  const [show, setShow] = useState(false);
  const [start, setStart] = useState(0);
  const [length, setLength] = useState(10);
  const [customerOrder, setOrders] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [towns, setTowns] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [delCharge, setDelCharge] = useState([]);
  const [saveOrder, { isLoading: isSaving }] = useAddEmptyBoxMutation();
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();
  const [getOrders, { isFetching: isFetchingOrders }] = useLazyGetOrdersQuery();
  const [getTownByPostal] = useLazyGetTownByPostalQuery();
  const [getStates, { isFetching: fetchingStates }] = useLazyGetStatesQuery();
  const [getCities, { isFetching: fetchingCities }] = useLazyGetCitiesQuery();
  const [getTowns, { isFetching: fetchingTowns }] = useLazyGetTownsQuery();
  const [getOrderById, { isFetching: isFetchingOrder }] =
    useLazyGetOrderQuery();

  const handleFormSubmit = async (values) => {
    if (recordId > 0) {
      await updateOrder({ id: recordId, order: values })
        .unwrap()
        .then((payload) => {
          alert(payload.message);
          resetForm();
          setRecordId(0);
        })
        .catch((error) => console.log(error));
    } else {
      await saveOrder(values)
        .unwrap()
        .then((payload) => {
          alert(payload.message);
          resetForm();
        })
        .catch((error) => console.log(error));
    }
  };

  const handleEdit = async (val) => {
    setShow(true);
    const editOrder = await getOrderById(val).unwrap();
    if (editOrder) {
      setRecordId(val);
      setFieldValue("deliveryDate", editOrder?.deliveryDate?.split("T")[0]);
      setFieldValue("timeFrom", editOrder.timeFrom);
      setFieldValue("timeTo", editOrder.timeTo);
      setFieldValue("postalCode", editOrder.postalCode);
      await handleGetStates(editOrder.prefecture);
      setFieldValue("prefecture", editOrder.prefecture);
      await handleGetCities(editOrder.city);
      setFieldValue("city", editOrder.city);
      await handleGetTowns(editOrder.town);
      setFieldValue("town", editOrder.town);
      setFieldValue("streetAddress", editOrder.streetAddress);
      setFieldValue("regQty", editOrder.regQty);
      setFieldValue("halfQty", editOrder.halfQty);
      setFieldValue("pl", editOrder.pl);
      setFieldValue("sticker", editOrder.sticker);
      setFieldValue("isEcollect", editOrder.isEcollect);
      setFieldValue("isGenkan", editOrder.isGenkan);
      setFieldValue("memo", editOrder.memo);
      setFieldValue("phone", editOrder.phone);
      setFieldValue("apartment", editOrder.apartment);
      setFieldValue("name", editOrder.name);
    }
  };

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

  const handleGetStates = async (countryId) => {
    try {
      const states = await getStates(countryId).unwrap();
      setDelCharge(states);
      const stateList = getOptions(states);
      setStates(stateList);
    } catch (err) {
      alert("An error occured while loading states.");
    }
  };

  const handleGetCities = async (stateId) => {
    try {
      const cities = await getCities(stateId).unwrap();
      const cityList = getOptions(cities);
      setCities(cityList);
    } catch (err) {
      alert("An error occured while loading Cities.");
    }
  };

  const handleGetTowns = async (cityId) => {
    try {
      const towns = await getTowns(cityId).unwrap();
      const townList = getOptions(towns);
      setTowns(townList);
    } catch (err) {
      alert("An error occured while loading Towns.");
    }
  };

  const handleGetDetails = async (val) => {
    if (val !== "") {
      let details = await getTownByPostal(val).unwrap();
      if (details) {
        await handleGetStates(details.state);
        setFieldValue("prefecture", details.state);
        await handleGetCities(details.city);
        setFieldValue("city", details.city);
        await handleGetTowns(details.id);
        setFieldValue("town", details.id);
      }
    }
  };

  const getDelCharge = (value) => {
    return delCharge.find((element) => {
      return element.id == value;
    });
  };

  useEffect(() => {
    (async () => {
      await getOrders({ start: start, length: length })
        .unwrap()
        .then((response) => {
          setOrders(response);
        })
        .catch((error) => console.log(error));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await handleGetStates(116);
      if (values.prefecture > 0) {
        console.log("test");
        await handleGetCities(values.prefecture);
        let delCharge = getDelCharge(values.prefecture);
        console.log(delCharge);
        setFieldValue("deliveryCharge", delCharge?.deliveryCharge);
      }
      if (values.city > 0) await handleGetTowns(values.city);
    })();
  }, [values.prefecture, values.city, values.town]);

  const handleData = (val) => {
    console.log(val);
  };

  return (
    <>
      <h4>Orders</h4>
      <Button variant="primary" size="sm" onClick={handleShow}>
        <Cart4 size={17} />
        &nbsp; Order a Box
      </Button>
      <br />
      <br />

      {customerOrder.map((o) => {
        return (
          <ItemDetails key={o.id} item={o} setShow={() => handleEdit(o.id)} />
        );
      })}

      <FormModal
        size="lg"
        show={show}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        title="Order a box"
      >
        <Formik>
          <Form noValidate>
            <Row>
              <FormControl
                label="Delivery Date:"
                type="date"
                size="sm"
                name="deliveryDate"
                value={values.deliveryDate}
                onChange={handleChange}
                isInvalid={touched.deliveryDate && errors.deliveryDate}
                error={errors.deliveryDate}
                addlProps={{ md: 6, className: "mb-3" }}
              />
              <FormSelect
                name="timeFrom"
                label="Time(From):"
                value={values.timeFrom}
                onChange={handleChange}
                size="sm"
                list={time}
                isInvalid={touched.timeFrom && errors.timeFrom}
                error={errors.timeFrom}
                addlProps={{ md: 3, className: "mb-3" }}
              />
              <FormSelect
                name="timeTo"
                label="Time(To):"
                value={values.timeTo}
                onChange={handleChange}
                size="sm"
                list={timeTo}
                isInvalid={touched.timeTo && errors.timeTo}
                error={errors.timeTo}
                addlProps={{ md: 3, className: "mb-3" }}
              />
            </Row>
            <Row>
              <FormControl
                label="Name:"
                size="sm"
                name="name"
                value={values.name}
                onChange={handleChange}
                isInvalid={touched.name && errors.name}
                error={errors.name}
                addlProps={{ md: 6, className: "mb-3" }}
              />
              <FormControl
                label="Phone:"
                size="sm"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                isInvalid={touched.phone && errors.phone}
                error={errors.phone}
                addlProps={{ md: 6, className: "mb-3" }}
              />
            </Row>
            <Row>
              <FormControl
                label="Postal Code:"
                size="sm"
                name="postalCode"
                value={values.postalCode}
                onChange={handleChange}
                isInvalid={touched.postalCode && errors.postalCode}
                error={errors.postalCode}
                addlProps={{
                  md: 3,
                  className: "mb-3",
                  onBlur: () => handleGetDetails(values.postalCode),
                }}
              />
              <FormSelect
                name="prefecture"
                label="Prefecture:"
                value={values.prefecture}
                onChange={handleChange}
                size="sm"
                list={states}
                isInvalid={touched.prefecture && errors.prefecture}
                error={errors.prefecture}
                addlProps={{ md: 3, className: "mb-3" }}
              />
              <FormSelect
                name="city"
                label="City:"
                value={values.city}
                onChange={handleChange}
                size="sm"
                list={cities}
                isInvalid={touched.city && errors.city}
                error={errors.city}
                addlProps={{ md: 3, className: "mb-3" }}
              />
              <FormSelect
                name="town"
                label="Town:"
                value={values.town}
                onChange={handleChange}
                size="sm"
                list={towns}
                isInvalid={touched.town && errors.town}
                error={errors.town}
                addlProps={{ md: 3, className: "mb-3" }}
              />
            </Row>
            <Row>
              <FormControl
                label="Street Address:"
                as="textarea"
                size="sm"
                name="streetAddress"
                value={values.streetAddress}
                onChange={handleChange}
                isInvalid={touched.streetAddress && errors.streetAddress}
                error={errors.streetAddress}
                addlProps={{ md: 6, className: "mb-3" }}
              />
              <FormControl
                label="Apartment:"
                as="textarea"
                size="sm"
                name="apartment"
                value={values.apartment}
                onChange={handleChange}
                isInvalid={touched.apartment && errors.apartment}
                error={errors.streetAddress}
                addlProps={{ md: 6, className: "mb-3" }}
              />
            </Row>
            <Row>
              <FormControl
                label="Jumbo:"
                type="number"
                size="sm"
                name="regQty"
                value={values.regQty}
                onChange={handleChange}
                isInvalid={touched.regQty && errors.regQty}
                error={errors.regQty}
                addlProps={{ md: 3, className: "mb-4" }}
              />
              <FormControl
                label="Half:"
                type="number"
                size="sm"
                name="halfQty"
                value={values.halfQty}
                onChange={handleChange}
                isInvalid={touched.halfQty && errors.halfQty}
                error={errors.halfQty}
                addlProps={{ md: 3, className: "mb-4" }}
              />
              <FormControl
                label="PL:"
                type="number"
                size="sm"
                name="pl"
                value={values.pl}
                onChange={handleChange}
                isInvalid={touched.pl && errors.pl}
                error={errors.pl}
                addlProps={{ md: 3, className: "mb-4" }}
              />
              <FormControl
                label="Sticker:"
                type="number"
                size="sm"
                name="sticker"
                value={values.sticker}
                onChange={handleChange}
                isInvalid={touched.sticker && errors.sticker}
                error={errors.sticker}
                addlProps={{ md: 3, className: "mb-4" }}
              />
            </Row>
            <Row>
              <FormCheck
                label="COD?"
                type="switch"
                size="sm"
                name="cod"
                value={values.cod}
                onChange={handleChange}
                error={errors.sticker}
                addlProps={{ md: 3, className: "mb-3" }}
              />
              <FormCheck
                label="E-Collect?"
                type="switch"
                size="sm"
                name="isEcollect"
                value={values.isEcollect}
                onChange={handleChange}
                error={errors.isEcollect}
                addlProps={{ md: 3, className: "mb-3" }}
              />
              <FormCheck
                label="Genkan?"
                type="switch"
                size="sm"
                name="isGenkan"
                value={values.isGenkan}
                onChange={handleChange}
                error={errors.isGenkan}
                addlProps={{ md: 3, className: "mb-3" }}
              />
            </Row>
            <Row>
              <FormControl
                label="Memo:"
                as="textarea"
                size="sm"
                name="memo"
                value={values.memo}
                onChange={handleChange}
                isInvalid={touched.memo && errors.memo}
                error={errors.memo}
                addlProps={{ md: 12, className: "mb-3" }}
              />
            </Row>
            <Row>
              <FormControl
                label="Delivery Charge:"
                type="number"
                size="sm"
                name="deliveryCharge"
                value={values.deliveryCharge}
                onChange={handleChange}
                isInvalid={touched.deliveryCharge && errors.deliveryCharge}
                error={errors.deliveryCharge}
                disabled={true}
                addlProps={{ md: 3, className: "mb-4" }}
              />
              <FormControl
                label="Island Charge:"
                type="number"
                size="sm"
                name="islandCharge"
                value={values.islandCharge}
                onChange={handleChange}
                isInvalid={touched.islandCharge && errors.islandCharge}
                error={errors.islandCharge}
                disabled={true}
                addlProps={{ md: 3, className: "mb-4" }}
              />
              <FormControl
                label="Total Payable:"
                type="number"
                size="sm"
                name="totalPayable"
                value={values.totalPayable}
                onChange={handleChange}
                isInvalid={touched.totalPayable && errors.totalPayable}
                error={errors.totalPayable}
                disabled={true}
                addlProps={{ md: 3, className: "mb-4" }}
              />
              <FormControl
                label="Deposit:"
                type="number"
                size="sm"
                name="deposit"
                value={values.deposit}
                onChange={handleChange}
                isInvalid={touched.deposit && errors.deposit}
                error={errors.deposit}
                addlProps={{ md: 3, className: "mb-4" }}
              />
            </Row>
          </Form>
        </Formik>
      </FormModal>
    </>
  );
};

export default Orders;
