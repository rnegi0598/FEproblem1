import React from "react";
import './error.scss'

const ErrorMsg = ({msg}) => {
  return (
    <div className="error-div">
      {msg}
    </div>
  );
};

export default ErrorMsg;
