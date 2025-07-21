import * as yup from 'yup';

export const order = {
    deliveryDate: '',
    timeFrom: '',
    timeTo: ''
}

export const orderValidation = yup.object().shape({
    deliveryDate: yup.string().required(),
    timeFrom: yup.string().required(),
    timeTo: yup.string().required(),
});