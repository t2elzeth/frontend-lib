import React from "react";
import Flatpickr from "react-flatpickr";
import {now, endOfDay} from "@/utils/dateUtils";
import PropTypes from "prop-types";

export default function DatePicker(props) {
  const {
    value,
    onChange,
    placeholder = "",
    timeFormat = false,
    disabled = false,
  } = props;

  const flatpickrOptions = {
    enableTime: timeFormat,
    dateFormat: timeFormat ? "d.m.Y H:i" : "d.m.Y",
    defaultHour: 0,
    defaultMinute: 0,
    time_24hr: true,
    parseDate: (dateString) => new Date(dateString),
    static: true
  };

  function handleChange(date) {
    let newDate = new Date(date);

    if (isNaN(newDate.getHours())) {
      newDate = endOfDay(now());
    }

    onChange(newDate);
  }

  return (
    <Flatpickr
      className="form-control"
      placeholder={placeholder}
      options={flatpickrOptions}
      value={value}
      disabled={disabled}
      onChange={handleChange}
      onClose={handleChange}
    />
  );
}

DatePicker.propTypes = {
  value: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func,
  timeFormat: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool
};
