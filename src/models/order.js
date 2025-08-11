import * as yup from "yup";

export const order = {
  deliveryDate: "",
  timeFrom: "08:00 am",
  timeTo: "09:00 pm",
  regQty: 0,
  halfQty: 0,
  pl: 0,
  sticker: 0,
  cod: false,
  isEcollect: true,
  isGenkan: false,
  memo: "",
  status: "LINED-UP",
  postalCode: "",
  prefecture: 0,
  city: 0,
  town: 0,
  streetAddress: "",
  phone: "",
  deposit: 0,
  emptyBoxItemList: [],
  apartment: "",
  name: "",
  deliveryCharge: 0,
  totalPayable: 0,
  islandCharge: 0,
  company: 0,
  agent: 0,
};

export const orderValidation = yup.object().shape({
  deliveryDate: yup.string().required("Please select a delivery date."),
  timeFrom: yup.string().required("Please select a time (from)."),
  timeTo: yup.string().required("Please select a time (to)."),
});
