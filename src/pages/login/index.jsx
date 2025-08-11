import * as formik from "formik";

import {
  Form,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  Alert,
} from "react-bootstrap";

import { login, loginValidation } from "../../models/login";
import { BoxArrowInRight, Lock, Person } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { useLoginUserMutation } from "../../redux/chenvel";
import Cookies from "js-cookie";
import { setCredentials } from "../../redux/authSlice";

const Login = () => {
  const { Formik, useFormik } = formik;
  const dispatch = useDispatch();
  const [loginUser, { isLoading: isSaving }] = useLoginUserMutation();

  const handleFormSubmit = async (values) => {
    localStorage.clear();
    Cookies.remove("logged_in");
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    try {
      const userData = await loginUser(values).unwrap();
      if (userData) {
        dispatch(setCredentials(userData, values.userName));
        localStorage.setItem("user", userData.credential.userName);
        localStorage.setItem("roles", userData.credential.roles);
        localStorage.setItem("userId", userData.credential.id);
        localStorage.setItem(
          "name",
          userData.credential.roles === "Agent"
            ? userData.credential.companyName
            : userData.credential.roles === "Sub-Agent"
            ? userData.credential.agentName
            : "Chenvel Services Inc."
        );
        Cookies.set("logged_in", true);
        Cookies.set("access_token", userData.token);
        Cookies.set("refresh_token", userData.refreshToken);
        Cookies.set("expiration_token", userData.expiration);
        window.location.pathname = "/orders";
      }
    } catch (error) {
      console.log(error);
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
    initialValues: login,
    validationSchema: loginValidation,
    onSubmit: handleFormSubmit,
  });

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={5} lg={4}>
            <h3 className="text-center mb-5">Login</h3>
            <Formik>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="formUser" className="mb-3">
                  <Form.Label>Username:</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <Person />
                    </InputGroup.Text>
                    <Form.Control
                      required
                      size="sm"
                      type="text"
                      placeholder="Username"
                      name="userName"
                      value={values.userName}
                      isInvalid={touched.userName && errors.userName}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.userName}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-4">
                  <Form.Label>Password:</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <Lock />
                    </InputGroup.Text>
                    <Form.Control
                      required
                      size="sm"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      isInvalid={touched.password && errors.password}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Button
                  size="sm"
                  variant="primary"
                  type="submit"
                  className="w-100"
                >
                  <BoxArrowInRight size={18} />
                  &nbsp; Login
                </Button>
              </Form>
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
