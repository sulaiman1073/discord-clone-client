import React, { useState, useEffect } from "react";
import Spinner2 from "../Spinner2";
import "./SaveChangesBar.css";

export default function SaveChangesBar({
  resetHandler,
  saveHandler,
  closeHandler,
  requestClose,
  requestCloseHandler,
  loading,
  error
}) {
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!loading && !error) {
      setClosing(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (!mounted) return;

    if (!closing) {
      requestCloseHandler();
      requestClose(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestClose]);

  const onAnimationEnd = e => {
    if (e.animationName === "SaveChangesBar--slideOutDown") {
      closeHandler();
    }
  };

  const handleReset = () => {
    resetHandler();
    requestCloseHandler();
    setClosing(true);
  };

  return (
    <div
      className={`SaveChangesBar--container${
        closing ? " SaveChangesBar--closing" : ""
      }`}
      onAnimationEnd={onAnimationEnd}
    >
      <p>You have unsaved changes.</p>
      <div>
        <button type="button" onClick={handleReset} disabled={loading}>
          Reset
        </button>
        <button type="button" onClick={() => saveHandler()} disabled={loading}>
          {loading ? <Spinner2 /> : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
