/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { updateUser, logout } from "../../redux/actions";
import Input1 from "../Input1";
import ImageUpload from "../ImageUpload";
import discriminatorFormatter from "../../util/discriminatorFormatter";
import "./UserSettings.css";

const Spinner = () => (
  <div className="UserSettings--spinner">
    <div className="UserSettings--cube1" />
    <div className="UserSettings--cube2" />
  </div>
);

const userUpdateSchema1 = Yup.object().shape({
  username: Yup.string()
    .min(2, "Username is too short.")
    .max(32, "Username is too long.")
    .required("Username is required."),
  email: Yup.string()
    .email("Email is invalid.")
    .required("Email is required."),
  password: Yup.string().required("Password is required.")
});

const userUpdateSchema2 = Yup.object().shape({
  username: Yup.string()
    .min(2, "Username is too short.")
    .max(32, "Username is too long.")
    .required("Username is required."),
  email: Yup.string()
    .email("Email is invalid.")
    .required("Email is required."),
  password: Yup.string().required("Password is required."),
  newPassword: Yup.string()
    .min(6, "Password should be atleast 6 characters long.")
    .matches(/[a-z]/, "Password should have atleast one lowercase letter.")
    .matches(/[A-Z]/, "Password should have atleast one uppercase letter.")
    .matches(/\d+/, "Password should have atleast one number.")
    .required("Password is required."),
  newPassword2: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required.")
});

export default function UserSettings() {
  const defaultAvatar = useSelector(({ userState }) => userState.defaultAvatar);
  const avatar = useSelector(
    ({ userState }) => userState.avatar || defaultAvatar
  );
  const { username, discriminator, email } = useSelector(
    state => state.userState
  );
  const { userApiLoading: apiLoading, userApiError: apiError } = useSelector(
    state => state.apiState
  );
  const dispatch = useDispatch();
  const logoutDispatcher = useCallback(() => dispatch(logout()), [dispatch]);

  const [editing, setEditing] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [displayedAvatar, setDisplayedAvatar] = useState(
    avatar || defaultAvatar
  );
  const [mounted, setMounted] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!apiLoading && !apiError) {
      setEditing(false);
      setChangePassword(false);
      setUploadedImage(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiLoading]);

  const handleUpload = e => {
    if (e.target.files[0]) {
      setUploadedImage(e.target.files[0]);
      setDisplayedAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleRemove = () => {
    setDisplayedAvatar(defaultAvatar);
    setUploadedImage(null);
  };

  const handleCancel = () => {
    setEditing(false);
    setChangePassword(false);
    setUploadedImage(null);
  };

  return (
    <div className="UserSettings--container">
      <div className="UserSettings--settings">
        <h3>USER SETTINGS</h3>
        {!editing && (
          <div className="UserSettings--settingsPanel">
            <img src={`${avatar}?${performance.now()}`} alt="avatar" />
            <div className="UserSettings--userInfo">
              <div>
                <h4>USERNAME</h4>
                <p>{`${username}#${discriminatorFormatter(discriminator)}`}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{email}</p>
              </div>
            </div>
            <div className="UserSettings--settingsPanel--edit">
              <button type="button" onClick={() => setEditing(true)}>
                Edit
              </button>
            </div>
          </div>
        )}
        {editing && (
          <>
            {apiError && <p className="UserSettings--apiError">{apiError}</p>}
            <Formik
              initialValues={{
                username,
                email,
                password: "",
                newPassword: "",
                newPassword2: ""
              }}
              validationSchema={
                changePassword ? userUpdateSchema2 : userUpdateSchema1
              }
              onSubmit={async (values, { resetForm }) => {
                dispatch(
                  updateUser({
                    ...values,
                    avatar: uploadedImage,
                    removeAvatar: displayedAvatar === defaultAvatar
                  })
                );
                resetForm();
              }}
            >
              {formProps => (
                <form
                  className="UserSettings--settingsPanel"
                  onSubmit={formProps.handleSubmit}
                >
                  <ImageUpload
                    icon={displayedAvatar}
                    onUpload={handleUpload}
                    onRemove={handleRemove}
                    disabled={apiLoading}
                  />
                  {apiLoading && <Spinner />}
                  <div className="UserSettings--settingsPanel--inputs">
                    <Input1
                      header="USERNAME"
                      type="username"
                      name="username"
                      onChange={formProps.handleChange}
                      onBlur={formProps.handleBlur}
                      value={formProps.values.username}
                      disabled={apiLoading}
                      required
                      touched={formProps.touched.username}
                      errors={formProps.errors.username}
                      spellCheck={false}
                      autoFocus
                    />
                    <Input1
                      header="EMAIL"
                      type="email"
                      name="email"
                      onChange={formProps.handleChange}
                      onBlur={formProps.handleBlur}
                      value={formProps.values.email}
                      disabled={apiLoading}
                      required
                      touched={formProps.touched.email}
                      errors={formProps.errors.email}
                    />
                    <Input1
                      header="CURRENT PASSWORD"
                      type="password"
                      name="password"
                      onChange={formProps.handleChange}
                      onBlur={formProps.handleBlur}
                      value={formProps.values.password}
                      disabled={apiLoading}
                      required
                      touched={formProps.touched.password}
                      errors={formProps.errors.password}
                    />
                    {!changePassword && (
                      <button
                        type="button"
                        className="UserSettings--settingsPanel--changePassword"
                        onClick={() => setChangePassword(true)}
                        disabled={apiLoading}
                      >
                        Change Password?
                      </button>
                    )}
                    {changePassword && (
                      <>
                        <Input1
                          header="NEW PASSWORD"
                          type="password"
                          name="newPassword"
                          onChange={formProps.handleChange}
                          onBlur={formProps.handleBlur}
                          value={formProps.values.newPassword}
                          disabled={apiLoading}
                          required
                          touched={formProps.touched.newPassword}
                          errors={formProps.errors.newPassword}
                        />
                        <Input1
                          header="CONFIRM NEW PASSWORD"
                          type="password"
                          name="newPassword2"
                          onChange={formProps.handleChange}
                          onBlur={formProps.handleBlur}
                          value={formProps.values.newPassword2}
                          disabled={apiLoading}
                          required
                          touched={formProps.touched.newPassword2}
                          errors={formProps.errors.newPassword2}
                        />
                      </>
                    )}
                    <div className="UserSettings--settingsPanel--save">
                      <button
                        type="button"
                        onClick={handleCancel}
                        disabled={apiLoading}
                      >
                        Cancel
                      </button>
                      <button type="submit" disabled={apiLoading}>
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </>
        )}
      </div>
      <div className="UserSettings--themes">
        <h3>COLOR THEMES</h3>
        <div className="UserSettings--colors">
          <div>
            <div className="UserSettings--colors--1" />
          </div>
          <div>
            <div className="UserSettings--colors--2" />
          </div>
          <div>
            <div className="UserSettings--colors--3" />
          </div>
        </div>
      </div>
      <div className="UserSettings--logout">
        <button type="button" onClick={logoutDispatcher} disabled={apiLoading}>
          Log Out
        </button>
      </div>
    </div>
  );
}
