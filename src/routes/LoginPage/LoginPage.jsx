import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { login, register } from "../../redux/actions";
import "./LoginPage.css";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is invalid.")
    .required("Email is required."),
  password: Yup.string().required("Password is required.")
});

const registrationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is invalid.")
    .required("Email is required."),
  username: Yup.string()
    .min(2, "Username is too short.")
    .max(32, "Username is too long.")
    .required("Username is required."),
  password: Yup.string()
    .min(6, "Password should be atleast 6 characters long.")
    .matches(/[a-z]/, "Password should have atleast one lowercase letter.")
    .matches(/[A-Z]/, "Password should have atleast one uppercase letter.")
    .matches(/\d+/, "Password should have atleast one number.")
    .required("Password is required."),
  password2: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required.")
});

export default function LoginPage({ match }) {
  const loading = useSelector(({ apiState }) => apiState.userApiLoading);
  const error = useSelector(({ apiState }) => apiState.userApiError);
  const dispatch = useDispatch();
  const [loginOrRegister, setLoginOrRegister] = useState("login");
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // useEffect(() => {
  //   if (!mounted) return;

  //   if (!loading && !error) {
  //     if (loginOrRegister === "login") {
  //       dispatch(
  //         login({
  //           email: values.email,
  //           password: values.password
  //         })
  //       );
  //     } else {
  //       dispatch(
  //         register({
  //           email: values.email,
  //           username: values.username,
  //           password: values.password
  //         })
  //       );
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loading]);

  useEffect(() => {
    if (match.path.slice(1).startsWith("register"))
      setLoginOrRegister("register");
    else if (match.path.slice(1).startsWith("login"))
      setLoginOrRegister("login");
  }, [match]);

  // if (apiLoading) return <LoadingPage />;

  return (
    <Formik
      initialValues={{
        email: "",
        username: "",
        password: "",
        password2: ""
      }}
      validationSchema={
        loginOrRegister === "login" ? loginSchema : registrationSchema
      }
      onSubmit={async (values, { setSubmitting }) => {
        if (loginOrRegister === "login") {
          dispatch(
            login({
              email: values.email,
              password: values.password
            })
          );
        } else {
          dispatch(
            register({
              email: values.email,
              username: values.username,
              password: values.password
            })
          );
        }
        setSubmitting(false);
      }}
    >
      {formProps => (
        <form
          className="LoginPage--container"
          onSubmit={formProps.handleSubmit}
        >
          <div className="LoginPage--loginBox">
            {loginOrRegister === "login" ? (
              <h2>Welcome back!</h2>
            ) : (
              <h2>Create an account</h2>
            )}
            {error && <p className="LoginPage--apiError">{error}</p>}
            <div
              className={`LoginPage--inputContainer${
                formProps.touched.email && formProps.errors.email
                  ? " LoginPage--error"
                  : ""
              }`}
            >
              <div className="LoginPage--inputContainer--header">
                <p>EMAIL</p>
                {formProps.touched.email && formProps.errors.email && (
                  <span className="LoginPage--errors">
                    {formProps.errors.email}
                  </span>
                )}
              </div>
              <input
                type="email"
                name="email"
                onChange={formProps.handleChange}
                onBlur={formProps.handleBlur}
                value={formProps.values.email}
              />
            </div>
            {loginOrRegister === "register" && (
              <div
                className={`LoginPage--inputContainer${
                  formProps.touched.username && formProps.errors.username
                    ? " LoginPage--error"
                    : ""
                }`}
              >
                <div className="LoginPage--inputContainer--header">
                  <p>USERNAME</p>
                  {formProps.touched.username && formProps.errors.username && (
                    <span className="LoginPage--errors">
                      {formProps.errors.username}
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  name="username"
                  onChange={formProps.handleChange}
                  onBlur={formProps.handleBlur}
                  value={formProps.values.username}
                />
              </div>
            )}
            <div
              className={`LoginPage--inputContainer${
                formProps.touched.password && formProps.errors.password
                  ? " LoginPage--error"
                  : ""
              }`}
            >
              <div className="LoginPage--inputContainer--header">
                <p>PASSWORD</p>
                {formProps.touched.password && formProps.errors.password && (
                  <span className="LoginPage--errors">
                    {formProps.errors.password}
                  </span>
                )}
              </div>
              <input
                type="password"
                name="password"
                onChange={formProps.handleChange}
                onBlur={formProps.handleBlur}
                value={formProps.values.password}
              />
              {loginOrRegister === "login" && (
                <a href="https://google.com">Forgot your password?</a>
              )}
            </div>
            {loginOrRegister === "register" && (
              <div
                className={`LoginPage--inputContainer${
                  formProps.touched.password2 && formProps.errors.password2
                    ? " LoginPage--error"
                    : ""
                }`}
              >
                <div className="LoginPage--inputContainer--header">
                  <p>CONFIRM PASSWORD</p>
                  {formProps.touched.password2 &&
                    formProps.errors.password2 && (
                      <span className="LoginPage--errors">
                        {formProps.errors.password2}
                      </span>
                    )}
                </div>
                <input
                  type="password"
                  name="password2"
                  onChange={formProps.handleChange}
                  onBlur={formProps.handleBlur}
                  value={formProps.values.password2}
                  required
                />
              </div>
            )}
            <div className="LoginPage--inputContainer">
              <button
                type="submit"
                disabled={formProps.isSubmitting || loading}
              >
                {loginOrRegister === "login" ? "Login" : "Continue"}
              </button>
              {loginOrRegister === "login" ? (
                <>
                  <span>Need an account?</span>
                  <Link to="/register">Register</Link>
                </>
              ) : (
                <Link to="/login">Already have an account?</Link>
              )}
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}
