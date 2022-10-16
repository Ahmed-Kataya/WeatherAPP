import { useState } from 'react';
import {useEffect} from "react"
import Grid from './Grid';
function Coordinates(){
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
   
    const [error,setError] = useState("");
    const geolocationAPI = navigator.geolocation;
    const getUserCoordinates = () => {
        if (!geolocationAPI) {
          setError('Geolocation API is not available in your browser!')
          setIsLoaded(true);
        } else {
          geolocationAPI.getCurrentPosition((position) => {
            const { coords } = position;
            setLat(coords.latitude);
            setLong(coords.longitude);
            setIsLoaded(true);
           
          }, (error) => {
            //setError('Something went wrong getting your position!')
            setIsLoaded(true);

            setError(error)
          })
        }
    }
        useEffect(()=>{getUserCoordinates()},[])
    //add error detection
    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        console.log(lat,long)
        return <div>Loading...</div>;
      } else {
        if(lat != null && long != null){
        return (
         <div>
            <h1>{lat},{long}</h1>
            <Grid latitude={lat} longitude={long}/>
         </div>
        
         //<div>{items.properties.periods.number}</div>
         //<MyComponent gridId={items.properties.gridId} gridX={items.properties.gridX} gridY={items.properties.gridY}/>
        );
        }
      }
 

}
export default Coordinates;
