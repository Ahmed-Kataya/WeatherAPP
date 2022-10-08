import { useState } from 'react';
import {useEffect} from "react"

function Geolocation(props){
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [error,setError] = useState("");
    const geolocationAPI = navigator.geolocation;
    const getUserCoordinates = () => {
        if (!geolocationAPI) {
          setError('Geolocation API is not available in your browser!')
        } else {
          geolocationAPI.getCurrentPosition((position) => {
            const { coords } = position;
            setLat(coords.latitude);
            setLong(coords.longitude);
          }, (error) => {
            setError('Something went wrong getting your position!')
          })
        }
    }
        useEffect(()=>{getUserCoordinates()},[])
    //add error detection
   return  (
    

    <div >
      <p>Your coordinates are: {[lat, long]}</p>
    </div>
  );

}
export default Geolocation;
