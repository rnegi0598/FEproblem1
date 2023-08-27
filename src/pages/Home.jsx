import React, { useEffect, useState } from "react";
import "./home.scss";
import Destination from "../components/destination/Destination";
import ServerDown from "../components/errorMsg/ServerDown";

const Home = () => {
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = (url, setter) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //prepare data before setting it to availablePlanets
        //add option field
        const updatedData = data.map((item) => {
          return { ...item, option: null };
        });
        setter(updatedData);
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
   
    const planetURL = "https://findfalcone.geektrust.com/planets";
    const vehicleURL = "https://findfalcone.geektrust.com/vehicles";

    fetchData(planetURL, setPlanets);
    fetchData(vehicleURL, setVehicles);

  }, []);

  // console.log(planets);
  // console.log(vehicles);

  return (
    <main>
      <h2>Select planets you want to search in :</h2>
      {planets.length && vehicles.length ? (
        <div className="destination-wrapper">
          <Destination
            destNumber={1}
            planets={planets}
            setPlanets={setPlanets}
            vehicles={vehicles}
            setVehicles={setVehicles}
          />
          <Destination
            destNumber={2}
            planets={planets}
            setPlanets={setPlanets}
            vehicles={vehicles}
            setVehicles={setVehicles}
          />
          <Destination
            destNumber={3}
            planets={planets}
            setPlanets={setPlanets}
            vehicles={vehicles}
            setVehicles={setVehicles}
          />
          <Destination
            destNumber={4}
            planets={planets}
            setPlanets={setPlanets}
            vehicles={vehicles}
            setVehicles={setVehicles}
          />
        </div>
      ) : null}
      {error ? <ServerDown /> : null}
    </main>
  );
};

export default Home;
