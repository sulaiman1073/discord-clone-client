import React from "react";
import "./LoadingPage.css";
import Spinner from "../Spinner";

export default function LoadingPage() {
  return (
    <div className="LoadingPage--container">
      <Spinner />
    </div>
  );
}
