import React from "react";

const Success = ({ planet }) => {
  return (
    <div className="sucess">
      <p>
        <span className="congratulations">Congratulations</span>
        <img src="firecracker.svg" alt="firecracker" />
      </p>
      <p>
        <span>You found Falcone</span>
        <img src="crown.svg" alt="" /> <span>at planet:</span><span className="planet-name">{planet} </span>
      </p>
    </div>
  );
};

export default Success;
