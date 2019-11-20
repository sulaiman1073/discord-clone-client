import React from "react";
import "./ImageUpload.css";

export default function ImageUpload({ icon, onUpload, onRemove, disabled }) {
  return (
    <div className="ImageUpload--container">
      <div className="ImageUpload--upload">
        <input
          type="file"
          accept="image/jpeg, image/png"
          onChange={onUpload}
          disabled={disabled}
        />
        <img src={icon} alt="icon" className="UserSettings--image" />
        <div className="ImageUpload--icon">
          <i className="far fa-image" />
        </div>
        <div className="ImageUpload--shade">
          <p>CHANGE</p>
          <p>AVATAR</p>
        </div>
      </div>
      <button
        type="button"
        className="ImageUpload--remove"
        onClick={onRemove}
        disabled={disabled}
      >
        Remove
      </button>
    </div>
  );
}
