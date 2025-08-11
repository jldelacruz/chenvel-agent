import * as yup from "yup";

export const pickup = {
  datePickup: "",
  timeFrom: "07:00 am",
  timeTo: "09:00 pm",
  pickupBoxRegQty: 0,
  pickupBoxHalfQty: 0,
  emptyBoxRegQty: 0,
  memo: "",
  pickupLname: "",
  pickupFname: "",
  pickupPhone: "",
  pickupPostal: "",
  prefecture: 0,
  city: 0,
  town: 0,
  pickupAddress: "",
  status: "LINED-UP",
  regularRateEmptyBox: 550,
};

export const pickupValidation = yup.object().shape({
  datePickup: yup.string().required("Please select a delivery date."),
  timeFrom: yup.string().required("Please select a time (from)."),
  timeTo: yup.string().required("Please select a time (to)."),
});
