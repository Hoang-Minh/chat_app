import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Icon, Input, Button, Checkbox, Typography } from "antd";
import { useDispatch } from "react-redux";

const { Title } = Typography;

function LoginPage(props) {
  console.log("LoginPage", props);

  const { history } = props;

  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
  console.log("Remember Me Checked", rememberMeChecked);

  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const initialEmail = localStorage.getItem("rememberMe")
    ? localStorage.getItem("rememberMe")
    : "";

  const initialValues = {
    email: initialEmail,
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  //https://formik.org/docs/guides/form-submission
  // you call setSubmitting(false) in your handler to finish the cycle !!!
  const onSubmit = (values, { setSubmitting }) => {
    const dataToSubmit = {
      email: values.email,
      password: values.password,
    };

    dispatch(loginUser(dataToSubmit))
      .then((response) => {
        const { loginSuccess, userId } = response.payload;

        if (loginSuccess) {
          window.localStorage.setItem("userId", userId);

          if (rememberMe) {
            window.localStorage.setItem("rememberMe", values.id);
          } else {
            localStorage.removeItem("rememberMe");
          }

          history.push("/");
        } else {
          setFormErrorMessage("Check out your Account or Password again");
        }
      })
      .catch((error) => {
        setFormErrorMessage("Check out your Account or Password again");
        setTimeout(() => {
          setFormErrorMessage("");
        }, 3000);
      });

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <div className="app">
          <Title level={2}>Log In</Title>
          <form onSubmit={formik.handleSubmit} style={{ width: "350px" }}>
            <Form.Item required>
              <Input
                id="email"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Enter your email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.email && formik.touched.email
                    ? "text-input error"
                    : "text-input"
                }
              />
              {formik.errors.email && formik.touched.email && (
                <div className="input-feedback">{formik.errors.email}</div>
              )}
            </Form.Item>

            <Form.Item required>
              <Input
                id="password"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Enter your password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.password && formik.touched.password
                    ? "text-input error"
                    : "text-input"
                }
              />
              {formik.errors.password && formik.touched.password && (
                <div className="input-feedback">{formik.errors.password}</div>
              )}
            </Form.Item>
            {formErrorMessage && (
              <label>
                <p
                  style={{
                    color: "#ff0000bf",
                    fontSize: "0.7rem",
                    border: "1px solid",
                    padding: "1rem",
                    borderRadius: "10px",
                  }}
                >
                  {formErrorMessage}
                </p>
              </label>
            )}

            <Form.Item>
              <Checkbox
                id="rememberMe"
                onChange={formik.handleRememberMe}
                checked={rememberMe}
              >
                Remember me
              </Checkbox>
              <a
                className="login-form-forgot"
                href="/reset_user"
                style={{ float: "right" }}
              >
                forgot password
              </a>
              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ minWidth: "100%" }}
                  disabled={formik.isSubmitting}
                  onSubmit={formik.handleSubmit}
                >
                  Log in
                </Button>
              </div>
              Or <a href="/register">register now!</a>
            </Form.Item>
          </form>
        </div>
      )}
    </Formik>
  );
}

export default withRouter(LoginPage);
