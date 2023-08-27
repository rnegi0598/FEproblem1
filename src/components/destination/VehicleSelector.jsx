import React, { useEffect, useRef, useState } from "react";

const VehicleSelector = ({ destNumber, vehicles, setVehicles, distance }) => {
  // when for a destination planet is changed
  // reset the vehicle radio inputs options
  const dummyInputRef = useRef(null);
  useEffect(() => {
    dummyInputRef.current.checked = true;
  
    const updatedVehicles = vehicles.map((vehicle) => {
      if (vehicle.option && vehicle.option.includes(destNumber)) {
        const updatedOption = vehicle.option.filter(
          (item) => item != destNumber
        );
        return {
          ...vehicle,
          total_no: vehicle.total_no + 1,
          option: updatedOption.length === 0?null:updatedOption,
        };
      }else{
        return vehicle;
      }
    });

    setVehicles(updatedVehicles);
  }, [distance]);

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


  const disableCondition = (vehicle) => {
    if (vehicle.total_no === 0 || vehicle.max_distance < distance) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <div className="dummy-div">
        <input style={{display:'none'}} type="radio" name={"vehicle" + destNumber} ref={dummyInputRef} />
      </div>
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
