import React from "react";
import { useLocation } from "react-router-dom";
import Failure from "../components/result/Failure";
import Success from "../components/result/Success";
import './result.scss'
const Result = () => {
  const location = useLocation();
  const response = location.state;
  return (
    <div className="result-wrapper">
      {response.status === "false" && <Failure />}
      {response.status === "success" && (
        <Success planet={response.planet_name} />
      )}
    </div>
  );
};

export default Result;
