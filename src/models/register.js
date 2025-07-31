import * as yup from 'yup';

export const register = {
    userName: '',
    password: '',
    confirmPassword: '',
    email: ''
}

export const registerValidation = yup.object().shape({
    userName: yup.string().required('Please input your user name.'),
    password: yup.string().required('Please input your password.'),
    confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
    email: yup.string().email('Please input a valid email.')
});