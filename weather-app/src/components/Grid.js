import {useEffect} from "react"
import { useState } from "react";
import Forecast from "./Forecast";
import HourlyForecast from "./HourlyForecast";
import LocationDate from "./LocationDate";

function Grid(props){
  
    const [error,setError] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    useEffect(() => {
        //https://api.weather.gov/points/{latitude},{longitude}
        console.log("aaaaaaa")
        fetch(`https://api.weather.gov/points/${props.latitude},${props.longitude}`)
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result);
              console.log(result)
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
         
          <div>
            <Forecast gridId={items.properties.gridId} gridX={items.properties.gridX} gridY={items.properties.gridY}/>
            <HourlyForecast gridId={items.properties.gridId} gridX={items.properties.gridX} gridY={items.properties.gridY}/>
          <LocationDate city={items.properties.relativeLocation.properties.city} state={items.properties.relativeLocation.properties.state}/>
       </div>
        );
      }

}
export default Grid;
