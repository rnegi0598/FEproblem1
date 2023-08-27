import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tokenURL, findURL } from "../../constants/constant";
import ErrorMsg from "../errorMsg/ErrorMsg";
import "./findFalcon.scss";

const FindFalcon = ({ vehicles, planets }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    let timerId;
    if(error){
       timerId=setTimeout(() => {
        setError(null);
      }, 3000);
    }

    return ()=>{
      clearTimeout(timerId);
    }
  },[error])

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
    //set error if planets and vehicles are not selected for all the destinations
    if (planetsSelected.length !== 4 || vehiclesSelected.length !== 4) {
      // planets or vehicles not selected for all the destination
      setError("Planets or vehicles for all the destination not selected ");
      return;
    }

    try {
      const tokenRequestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const tokenResponse = await fetch(tokenURL, tokenRequestOptions);
      const { token } = await tokenResponse.json();

      const findBody = {
        token: token,
        planet_names: planetsSelected,
        vehicle_names: vehiclesSelected,
      };
      const findRequestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(findBody),
      };
      const findResponse = await fetch(findURL, findRequestOptions);
      const result = await findResponse.json();
      if(result.error){
        setError(result.error);
        return ;
      }
      navigate("/result", { state: result });
    } catch (err) {
      setError(err);
    }
  };
  return (
    <div className="findBtn-wrapper">
      <button onClick={clickHandler}>Find</button>
      {error ? <ErrorMsg msg={error}/> : null}
    </div>
  );
};

export default FindFalcon;
