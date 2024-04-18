//LoginScreen.js
import React, { useState, useEffect, useMemo } from "react";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../FormContainer";
import { login, updateUserLastLogin } from "../../actions/userActions";
// import GoogleLoginScreen from "./GoogleLoginScreen";

function LoginScreen() {
  const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  // const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  // const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const {
    loading,
    error,
    userInfo,
    success,
  } = userLogin;

  // const handleGoogleLoginClick = () => {
  //   setShowGoogleLogin(true);
  // };

  useEffect(() => {
    if (userInfo) {
      try {
        if (userInfo.is_verified) {
          // dispatch(updateUserLastLogin());
          // console.log("UserLastLogin updated");
          // history.push("/");
          setSuccessMessage("Login successful.");
        } else {
          history.push("/verify-email-otp");
          setSuccessMessage("Please verify your email.");
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [userInfo, history, dispatch]);

  const lowerCaseEmail = email.toLowerCase();
  const loginData = useMemo(() => {
    return {
      email: lowerCaseEmail.trim(),
      password: password.trim(),
    };
  }, [lowerCaseEmail, password]);

  // const loginData = {
  //   email: email.toLowerCase(),
  //   password,
  // };
  // console.log("loginData:", loginData);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(loginData));
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(updateUserLastLogin(loginData));
        console.log('UserLastLogin updated');
        history.push("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, history, loginData]);

  return (
    <div>
      <FormContainer>
        <h1 className="text-center">Login</h1>
        {error && <Message variant="danger">{error}</Message>}

        {successMessage && (
          <Message variant="success">{successMessage}</Message>
        )}
        <Form onSubmit={submitHandler}>
          {loading && <Loader />}
          <Form.Group controlId="identifier">
            <Form.Label>
              <i className="fas fa-envelope"></i> Email
            </Form.Label>
            <Form.Control
              required
              // type="text"
              type="email"
              placeholder="Enter email "
              className="rounded w-100"
              // value={isEmail ? email : username}
              // onChange={(e) =>
              //   isEmail ? setEmail(e.target.value) : setUsername(e.target.value)
              // }
              value={email}
              // value={identifier}
              // onChange={(e) => setIdentifier(e.target.value)}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>
              <i className="fas fa-key"></i> Password{" "}
            </Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter password"
              className="rounded w-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Row className="py-3">
            <Col className="text-center">
              <Button
                className="mt-3 rounded w-100"
                type="submit"
                variant="success"
                block
                disabled={password === "" || email === ""}
              >
                Login <i className="fa fa-sign-in"></i>
              </Button>
            </Col>
          </Row>
        </Form>

        {/* <Row className="py-3">
          <Col className="text-center">
            <Button variant="danger" className="rounded w-100" block>
            <i className="fab fa-google"></i> Continue with Google
            </Button> 
          </Col>
        </Row> */}

        {/* <GoogleLoginScreen /> */}

        <Row className="py-3">
          <Col className="text-center">
            A new Customer?{" "}
            <Link
              to="/register"
              // to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </Col>
        </Row>

        <Row className="py-3">
          <Col className="text-center">
            Forgot Password? <Link to="/reset-password-request">Reset</Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
}

export default LoginScreen;
