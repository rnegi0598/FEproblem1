import React from "react";
import PlanetSelector from "./PlanetSelector";
import VehicleSelector from "./VehicleSelector";
import "./destination.scss";
const Destination = ({
  destNumber,
  planets,
  setPlanets,
  vehicles,
  setVehicles,
}) => {
  // planet that is selected for a given destination
  const planet = planets.find((planet) => {
    if (planet.option === destNumber) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <div>
      <h3>Destiation {destNumber}</h3>
      <PlanetSelector
        destNumber={destNumber}
        planets={planets}
        setPlanets={setPlanets}
      />
      {planet ? (
        <VehicleSelector
          destNumber={destNumber}
          vehicles={vehicles}
          setVehicles={setVehicles}
          distance={planet?.distance}
        />
      ) : null}
    </div>
  );
};

export default Destination;
