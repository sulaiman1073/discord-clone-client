import React from "react";
import classNames from "classnames";
import "./SettingsOptions.css";

export default function SettingsOptions({
  currentOption,
  options,
  setOption,
  onDelete
}) {
  return (
    <div className="SettingsOptions--container">
      {options.map(option => {
        const optionClasses = classNames({
          "SettingsOptions--option": true,
          "SettingsOptions--optionCurrent": option === currentOption,
          "SettingsOptions--deleteGuild": option === "Delete Guild"
        });

        return (
          <div
            className={optionClasses}
            key={option}
            onClick={
              option === "Delete Guild"
                ? () => onDelete()
                : () => setOption(option)
            }
            role="button"
          >
            <p>{option}</p>
          </div>
        );
      })}
    </div>
  );
}
