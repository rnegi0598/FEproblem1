import React, { useState } from "react";
import "./findFalcon.scss";
import { useNavigate } from "react-router-dom";
const tokenURL = "https://findfalcone.geektrust.com/token";

const findURL = "https://findfalcone.geektrust.com/find";
const FindFalconBtn = ({ vehicles, planets }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const clickHandler = async () => {
    //check if planets and vehicles are selected for all the destinations
    const planetsSelected = [];

    planets.forEach((planet) => {
      if (planet.option) {
        planetsSelected.push(planet.name);
      }
    });
    const vehiclesSelected = [];
    vehicles.forEach((vehicle) => {
      if (vehicle.option) {
        let length = vehicle.option.length;
        while (length > 0) {
          vehiclesSelected.push(vehicle.name);
          length--;
        }
      }
    });
    if (planetsSelected.length !== 4 || vehiclesSelected.length !== 4) {
        console.log(planetsSelected);
        console.log(vehiclesSelected);
      // planets or vehicles not selected for all the destination
      setError("Planets or vehicles for all the destination not selected ");
      return;
    }
    const tokenRequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const tokenResponse = await fetch(tokenURL, tokenRequestOptions);
    const {token}=await tokenResponse.json();
    

    const findBody={"token":token,"planet_names":planetsSelected,"vehicle_names":vehiclesSelected}
    const findRequestOptions= {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json' 
      },
      body:JSON.stringify(findBody)
    };
    const findResponse=await fetch(findURL,findRequestOptions);
    const data=await findResponse.json();

    console.log(data);
   
    navigate("/result",{state:data});
  };
  return (
    <div className="findBtn-wrapper">
      <button onClick={clickHandler}>Find</button>
      {error?<div>error</div>:null}
    </div>
  );
};

export default FindFalconBtn;
