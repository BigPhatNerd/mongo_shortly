import React from 'react';
import PropTypes from "prop-types";
import { toast } from 'react-toastify';

import {
  FaInfo,
  FaCheck,
  FaExclamationTriangle,
  FaBug,
  FaExclamationCircle,
} from "react-icons/fa";

export const displayIcon = (type) => {
  switch (type) {
    case "success":
      return <FaCheck />;
    case "info":
      return <FaInfo />;
    case "error":
      return <FaExclamationCircle />;
    case "warning":
      return <FaExclamationTriangle />;
    default:
      return <FaBug />;
  }
};

const ToastMessage = ({ type, message }) => {
  const formatMessage = (message) => {
    let resultString = "";
    for (const [key, value] of Object.entries(message)) {
      resultString += `${key}: ${value}\n`;
    }
    return resultString;
  };
  return toast[type](
    <div style={{ display: "flex", color: "black" }}>
      <div
        style={{
          fontSize: 15,
          paddingTop: 8,
          flexShrink: 0,
          textAlign: "center",
          width: "30px",
        }}
      >
        {displayIcon(type)}
      </div>
      <div
        style={{
          flexGrow: 1,
          fontSize: 15,
          fontWeight: "bold",
          padding: "8px 12px",
        }}
      >
        {(Object.keys(message).length === 0 &&
          message.constructor === Object) ||
        message === "" ||
        message instanceof TypeError
          ? "There seems to be have been an issue."
          : typeof message === "string"
          ? message
          : formatMessage(message)}
      </div>
    </div>
  );
};

ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

ToastMessage.dismiss = toast.dismiss;

export default ToastMessage;
