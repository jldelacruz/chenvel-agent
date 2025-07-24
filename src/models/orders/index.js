import * as yup from 'yup';

export const order = {
    deliveryDate: '',
    timeFrom: '08:00 am',
    timeTo: '09:00 pm',
    regQty: 0,
    halfQty: 0,
    pl: 0,
    sticker: 0,
    cod: false,
    isECollect: true,
    isGenkan: false,
    memo: ''
}

export const orderValidation = yup.object().shape({
    deliveryDate: yup.string().required('Please select a delivery date.'),
    timeFrom: yup.string().required('Please select a time (from).'),
    timeTo: yup.string().required('Please select a time (to).'),
});