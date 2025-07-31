import * as yup from 'yup';

export const login = {
    userName: '',
    password: '',
}

export const loginValidation = yup.object().shape({
    userName: yup.string().required('Please input your user name.'),
    password: yup.string().required('Please input your password.'),
});