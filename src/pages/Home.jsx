import React, { useEffect, useState } from "react";
import Destination from "../components/destination/Destination";
import ErrorMsg from "../components/errorMsg/ErrorMsg";
import DisplayTime from "../components/displayTime/DisplayTime";
import FindFalcon from "../components/findFalcon/FindFalcon";
import { totalDestinations } from "../constants/constant";
import { fetchDataErrMsg } from "../constants/constant";
import "./home.scss";
import { planetURL, vehicleURL } from "../constants/constant";
const Home = () => {
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);

 

  const fetchData = (url, setter) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //prepare data by adding option field before setting it to the setter
        const updatedData = data.map((item) => {
          return { ...item, option: null };
        });
        setter(updatedData);
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    fetchData(planetURL, setPlanets);
    fetchData(vehicleURL, setVehicles);
  }, []);

  return (
    <main>
      <h2>Select planets you want to search in :</h2>
      {planets.length && vehicles.length ? (
        <div className="game-wrapper">
          <div className="destinations">
            {[...Array(totalDestinations)].map((_, destNumber) => {
              return (
                <Destination
                  key={destNumber}
                  destNumber={destNumber + 1}
                  planets={planets}
                  setPlanets={setPlanets}
                  vehicles={vehicles}
                  setVehicles={setVehicles}
                />
              );
            })}
          </div>
          <div className="time-find-falcon-section">
            <DisplayTime vehicles={vehicles} planets={planets} />
          </div>
        </div>
      ) : null}
     { !error &&  <FindFalcon vehicles={vehicles} planets={planets} />}

      {error && <ErrorMsg msg={fetchDataErrMsg} />}
    </main>
  );
};

export default Home;
