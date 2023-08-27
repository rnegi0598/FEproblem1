import React from "react";

const PlanetSelector = ({destNumber ,planets,setPlanets}) => {
  
  //selecting planets that are not selected for any destination (their option filed will be null) or that is selected for the given destination
  const planetArr=planets.filter((planet)=>{
    if(!planet.option || planet.option===destNumber){
      return true;
    }
    return false;
  }) 

  //on selecting a planet ,update its option field with current destNumber
  //also remove  that destNumber from any other planet if present
  const selectHandler = (e) => {
    const value=e.target.value;
    if(!value){
      return ;
    }
    const updatedPlanets=planets.map(planet=>{
      if(planet.option===destNumber && planet.name!==value){
        return {...planet,option:null};
      }
      else if(planet.name===value){
        return {...planet,option:destNumber};
      }else{
        return planet;
      }
    });

    setPlanets(updatedPlanets);
   
  };
  return (
    <div>
      <select name="planet"   onChange={selectHandler}>
        <option value="" style={{display:'none'}}>Select</option>
        {
          planetArr.map((planet)=>{
            return  <option key={planet.name} value={planet.name}>{planet.name}</option>
          })
        }
      </select>
    </div>
  );
};

export default PlanetSelector;
