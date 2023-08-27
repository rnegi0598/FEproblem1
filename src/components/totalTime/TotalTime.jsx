import React from "react";
import "./totalTime.scss";
const TotalTime = ({ vehicles,planets }) => {
  const CalculateTime = () => {
    return vehicles.reduce((totalTime,vehicle)=>{
        if(vehicle.option ){
            const totalDistance=planets.reduce((totalDistance,planet)=>{
                    if(planet.option && vehicle.option.includes(planet.option)){
                        return totalDistance+=planet.distance;
                    }
                    return totalDistance;
            },0);
         return totalTime+=totalDistance/vehicle.speed;  
        }
        return totalTime;
    },0);

  };
  return <div className="total-wrapper">total time:{CalculateTime()}</div>;
};

export default TotalTime;
