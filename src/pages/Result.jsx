import React from "react";
import { redirect, useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const receivedProps = location.state;
  console.log(receivedProps);
  if (receivedProps.status === "false") {
    const comp = <div>Falcone not found</div>;
  } else {
  }
  // console.log(data);
  return (
    <div>
      {receivedProps.status === "false" && <div>Falcone not found</div>}
      {receivedProps.status === "success" && (
        <div>Falcone found at {receivedProps.planet_name} planet</div>
      )}
      {
        receivedProps.error && <div>{receivedProps.error}</div>
      }
    </div>
  );
};

export default Result;
