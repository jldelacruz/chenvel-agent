import * as yup from 'yup';

export const account = {
    firstName: '',
    lastName: '',
    middleName: '',
    contactNumber: '',
    postalCode: 0,
    prefecture: 0,
    city: 0,
    town: 0
}

export const accountValidation = yup.object().shape({
    firstName: yup.string().required('Please input your first name.'),
    lastName: yup.string().required('Please input your last name.'),
    contactNumber: yup.number().required('Please input your contact number.'),
    postalCode: yup.number().required('Please input your postal code.'),
    prefecture: yup.number().required('Please select your prefecture.'),
    city: yup.number().required('Please select your city.'),
    town: yup.number().required('Please select your town.')
});