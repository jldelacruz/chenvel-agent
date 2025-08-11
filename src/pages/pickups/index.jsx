import { useEffect, useState } from "react";
import { pickupTimeFrom, timeTo, samplePickups } from "../../api/constants";

import * as formik from "formik";

import { Button, Row, Form } from "react-bootstrap";

import { Calendar, Calendar2, Calendar3 } from "react-bootstrap-icons";

import FormModal from "../../components/FormModal";
import FormControl from "../../components/FormControl";
import FormSelect from "../../components/FormSelect";
import ItemDetails from "../../components/ItemDetails";

import { pickup, pickupValidation } from "../../models/pickup";
import {
  useLazyGetPickUpsQuery,
  useAddPickUpMutation,
  useLazyGetStatesQuery,
  useLazyGetCitiesQuery,
  useLazyGetTownsQuery,
  useLazyGetTownByPostalQuery,
  useLazyGetPickUpQuery,
  useUpdatePickUpMutation,
} from "../../redux/chenvel";
import { getOptions } from "../../helpers/Helpers";

const Pickups = () => {
  const { Formik, useFormik } = formik;
  const [show, setShow] = useState(false);
  const [recordId, setRecordId] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [start, setStart] = useState(0);
  const [length, setLength] = useState(10);
  const [customerPickUps, setPickUps] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [towns, setTowns] = useState([]);
  const [getPickUps, { isFetching: isFetchingPickUps }] =
    useLazyGetPickUpsQuery();
  const [savePickUp, { isLoading: isSaving }] = useAddPickUpMutation();
  const [updatePickUp, { isLoading: isUpdating }] = useUpdatePickUpMutation();
  const [getStates, { isFetching: fetchingStates }] = useLazyGetStatesQuery();
  const [getCities, { isFetching: fetchingCities }] = useLazyGetCitiesQuery();
  const [getTowns, { isFetching: fetchingTowns }] = useLazyGetTownsQuery();
  const [getTownByPostal] = useLazyGetTownByPostalQuery();
  const [getPickup, { isFetching: isFetchingPickup }] = useLazyGetPickUpQuery();

  const handleFormSubmit = async (values) => {
    if (recordId > 0) {
      await updatePickUp({ id: recordId, pickup: values })
        .unwrap()
        .then((payload) => {
          alert(payload.message);
          resetForm();
          setRecordId(0);
        })
        .catch((error) => console.log(error));
    } else {
      await savePickUp(values)
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
    const ediitPickUp = await getPickup(val).unwrap();
    if (ediitPickUp) {
      setRecordId(val);
      setFieldValue("datePickup", ediitPickUp?.datePickup?.split("T")[0]);
      setFieldValue("timeFrom", ediitPickUp.timeFrom);
      setFieldValue("timeTo", ediitPickUp.timeTo);
      setFieldValue("postalCode", ediitPickUp.pickupPostal);
      await handleGetStates(ediitPickUp.prefecture);
      setFieldValue("prefecture", ediitPickUp.prefecture);
      await handleGetCities(ediitPickUp.city);
      setFieldValue("city", ediitPickUp.city);
      await handleGetTowns(ediitPickUp.town);
      setFieldValue("town", ediitPickUp.town);
      setFieldValue("pickupAddress", ediitPickUp.pickupAddress);
      setFieldValue("pickupFname", ediitPickUp.pickupFname);
      setFieldValue("pickupLname", ediitPickUp.pickupLname);
      setFieldValue("pickupBoxRegQty", ediitPickUp.pickupBoxRegQty);
      setFieldValue("pickupBoxHalfQty", ediitPickUp.pickupBoxHalfQty);
      setFieldValue("emptyBoxRegQty", ediitPickUp.emptyBoxRegQty);
      setFieldValue("memo", ediitPickUp.memo);
      setFieldValue("pickupPhone", ediitPickUp.pickupPhone);
      setFieldValue("status", ediitPickUp.status);
      setFieldValue("pickupPostal", ediitPickUp.pickupPostal);
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
    initialValues: pickup,
    validationSchema: pickupValidation,
    onSubmit: handleFormSubmit,
  });

  const handleGetStates = async (countryId) => {
    try {
      const states = await getStates(countryId).unwrap();
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

  useEffect(() => {
    (async () => {
      await getPickUps({ start: start, length: length })
        .unwrap()
        .then((response) => {
          setPickUps(response);
        })
        .catch((error) => console.log(error));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await handleGetStates(116);
      if (values.prefecture > 0) await handleGetCities(values.prefecture);
      if (values.city > 0) await handleGetTowns(values.city);
    })();
  }, [values.prefecture, values.city, values.town]);

  return (
    <>
      <h4>Pickups</h4>
      <Button variant="primary" size="sm" onClick={handleShow}>
        <Calendar3 /> &nbsp;Schedule a Pickup
      </Button>
      <br />
      <br />
      {customerPickUps.map((p) => {
        return (
          <ItemDetails key={p.id} item={p} setShow={() => handleEdit(p.id)} />
        );
      })}

      <FormModal
        size="lg"
        show={show}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        title="Schedule a Pickup"
      >
        <Formik>
          <Form noValidate>
            <Row>
              <FormControl
                label="Pick up Date:"
                type="date"
                size="sm"
                name="datePickup"
                value={values.datePickup}
                onChange={handleChange}
                isInvalid={touched.datePickup && errors.datePickup}
                error={errors.datePickup}
                addlProps={{ md: 6, className: "mb-3" }}
              />
              <FormSelect
                name="timeFrom"
                label="Time(From):"
                value={values.timeFrom}
                onChange={handleChange}
                size="sm"
                list={pickupTimeFrom}
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
                label="First Name:"
                size="sm"
                name="pickupFname"
                value={values.pickupFname}
                onChange={handleChange}
                isInvalid={touched.pickupFname && errors.pickupFname}
                error={errors.pickupFname}
                addlProps={{ md: 3, className: "mb-3" }}
              />
              <FormControl
                label="Last Name:"
                size="sm"
                name="pickupLname"
                value={values.pickupLname}
                onChange={handleChange}
                isInvalid={touched.pickupLname && errors.pickupLname}
                error={errors.pickupLname}
                addlProps={{ md: 3, className: "mb-3" }}
              />
              <FormControl
                label="Phone:"
                size="sm"
                name="pickupPhone"
                value={values.pickupPhone}
                onChange={handleChange}
                isInvalid={touched.pickupPhone && errors.pickupPhone}
                error={errors.pickupLname}
                addlProps={{ md: 6, className: "mb-3" }}
              />
            </Row>
            <Row>
              <FormControl
                label="Postal Code:"
                size="sm"
                name="pickupPostal"
                value={values.pickupPostal}
                onChange={handleChange}
                isInvalid={touched.pickupPostal && errors.pickupPostal}
                error={errors.pickupPostal}
                addlProps={{
                  md: 3,
                  className: "mb-3",
                  onBlur: () => handleGetDetails(values.pickupPostal),
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
                label="Address:"
                as="textarea"
                size="sm"
                name="pickupAddress"
                value={values.pickupAddress}
                onChange={handleChange}
                isInvalid={touched.pickupAddress && errors.pickupAddress}
                error={errors.pickupAddress}
                addlProps={{ md: 12, className: "mb-3" }}
              />
            </Row>
            <Row>
              <FormControl
                label="Jumbo:"
                type="number"
                size="sm"
                name="pickupBoxRegQty"
                value={values.pickupBoxRegQty}
                onChange={handleChange}
                isInvalid={touched.pickupBoxRegQty && errors.pickupBoxRegQty}
                error={errors.pickupBoxRegQty}
                addlProps={{ md: 3, className: "mb-4" }}
              />
              <FormControl
                label="Half:"
                type="number"
                size="sm"
                name="pickupBoxHalfQty"
                value={values.pickupBoxHalfQty}
                onChange={handleChange}
                isInvalid={touched.pickupBoxHalfQty && errors.pickupBoxHalfQty}
                error={errors.pickupBoxHalfQty}
                addlProps={{ md: 3, className: "mb-4" }}
              />
              <FormControl
                label="Empty Box Pasabay:"
                type="number"
                size="sm"
                name="emptyBoxRegQty"
                value={values.emptyBoxRegQty}
                onChange={handleChange}
                isInvalid={
                  touched.emptyBoxRegQty && errors.pasabemptyBoxRegQtyayQty
                }
                error={errors.emptyBoxRegQty}
                addlProps={{ md: 3, className: "mb-4" }}
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
          </Form>
        </Formik>
      </FormModal>
    </>
  );
};

export default Pickups;
