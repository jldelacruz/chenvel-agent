import * as yup from 'yup';

export const pickup = {
    pickupDate: '',
    timeFrom: '07:00 am',
    timeTo: '09:00 pm',
    regQty: 0,
    halfQty: 0,
    pasabayQty: 0,
    memo: ''
}

export const pickupValidation = yup.object().shape({
    pickupDate: yup.string().required('Please select a delivery date.'),
    timeFrom: yup.string().required('Please select a time (from).'),
    timeTo: yup.string().required('Please select a time (to).'),
});