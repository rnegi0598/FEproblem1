import React, { useState } from "react";

const VehicleSelector = ({ destNumber, vehicles, setVehicles, distance }) => {
  
  const radioHandler = (e) => {
    //find unchecked radio input value
    //vehicle option is an array
    const uncheckedVehicle = vehicles.find((vehicle) => {
      //if option is null
      if (!vehicle.option) {
        return false;
      }
      return vehicle.option.includes(destNumber);
    });
    const uncheckedValue = uncheckedVehicle?.name;

    //checked value
    const checkedValue = e.target.value;

    const updatedVehicles = vehicles.map((vehicle) => {
      if (vehicle.name === checkedValue) {
        const vehicleOption = vehicle.option ? vehicle.option : [];
        vehicleOption.push(destNumber);
        return {
          ...vehicle,
          total_no: vehicle.total_no - 1,
          option: vehicleOption,
        };
      } else if (vehicle.name === uncheckedValue) {
        const vehicleOption = vehicle.option.filter(
          (item) => item !== destNumber
        );

        return {
          ...vehicle,
          total_no: vehicle.total_no + 1,
          option: vehicleOption.length === 0 ? null : vehicleOption,
        };
      }
      {
        return vehicle;
      }
    });
    setVehicles(updatedVehicles);
  };

  // console.log("render");

  const disableCondition = (vehicle) => {
    if (vehicle.total_no === 0 || vehicle.max_distance < distance) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      {vehicles.map((vehicle) => {
        return (
          <div key={vehicle.name}>
            <input
              type="radio"
              name={"vehicle" + destNumber}
              value={vehicle.name}
              disabled={disableCondition(vehicle)}
              id={vehicle.name + destNumber}
              onChange={radioHandler}
            />
            <label htmlFor={vehicle.name + destNumber}>
              {vehicle.name}({vehicle.total_no})
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default VehicleSelector;
