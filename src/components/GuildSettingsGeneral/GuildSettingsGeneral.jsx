/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState, useEffect } from "react";
import SaveChangesBar from "../SaveChangesBar";
import Input1 from "../Input1";
import ImageUpload from "../ImageUpload";
import "./GuildSettingsGeneral.css";

export default function GuildSettingsGeneral({
  name,
  icon,
  defaultIcon,
  inviteCode,
  handleSubmit,
  apiLoading,
  apiError
}) {
  const [mounted, setMounted] = useState(false);
  const [saveChangesOpen, setSaveChangesOpen] = useState(false);
  const [saveChangesRequestClose, setSaveChangesRequestClose] = useState(false);
  const [guildName, setGuildName] = useState(name);
  const [displayedIcon, setDisplayedIcon] = useState(icon || defaultIcon);
  const [originalDisplayedIcon, setOriginalDisplayedIcon] = useState(
    icon || defaultIcon
  );
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    if (mounted) return;

    setMounted(true);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    if (guildName !== name || displayedIcon !== originalDisplayedIcon) {
      if (!saveChangesOpen) {
        setSaveChangesOpen(true);
      }
    } else if (saveChangesOpen) {
      setSaveChangesRequestClose(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedIcon, guildName]);

  const handleUpload = e => {
    if (e.target.files[0]) {
      setUploadedImage(e.target.files[0]);
      setDisplayedIcon(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleRemove = () => {
    setDisplayedIcon(defaultIcon);
    setUploadedImage(null);
  };

  const saveChanges = () => {
    handleSubmit({
      name: guildName,
      icon: uploadedImage,
      removeIcon: displayedIcon === defaultIcon
    });
  };

  const resetChanges = () => {
    setGuildName(name);
    setDisplayedIcon(originalDisplayedIcon);
    setUploadedImage(null);
  };

  return (
    <div className="GuildSettingsGeneral--container">
      <h3>GUILD OVERVIEW</h3>
      <div>
        <ImageUpload
          icon={displayedIcon}
          onUpload={handleUpload}
          onRemove={handleRemove}
          disabled={apiLoading}
        />
        <Input1
          header="GUILD NAME"
          type="text"
          onChange={e => {
            if (e.target.value.length < 2) return;

            setGuildName(e.target.value);
          }}
          value={guildName}
          disabled={apiLoading}
          spellCheck={false}
          autoFocus
        />
      </div>
      {saveChangesOpen && (
        <SaveChangesBar
          closeHandler={() => setSaveChangesOpen(false)}
          requestClose={saveChangesRequestClose}
          requestCloseHandler={() => setSaveChangesRequestClose(false)}
          resetHandler={resetChanges}
          saveHandler={saveChanges}
          loading={apiLoading}
          error={apiError}
        />
      )}
    </div>
  );
}
