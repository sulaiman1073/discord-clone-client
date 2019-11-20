/* eslint-disable jsx-a11y/no-autofocus */
import React from "react";
import "./Input1.css";

export default function Input1({
  header,
  type,
  name,
  value,
  placeholder,
  onChange,
  onKeyDown,
  onBlur,
  disabled,
  required,
  autoFocus,
  spellCheck,
  touched,
  errors
}) {
  return (
    <div
      className={`Input1--container${
        touched && errors ? " Input1--error" : ""
      }`}
    >
      {header && <h4>{header}</h4>}
      {touched && errors && <span>{errors}</span>}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        disabled={disabled}
        autoFocus={autoFocus}
        spellCheck={spellCheck}
        required={required}
      />
    </div>
  );
}
