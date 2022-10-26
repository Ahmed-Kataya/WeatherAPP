import {useEffect,useState} from "react"
import { ACCESS_TOKEN } from "../env/env.js";
function LocationDate(props){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    let currentDate = new Date(); 
    let datetime =  currentDate.getDate() + "/" + (currentDate.getMonth()+1)  + "/" 
    + currentDate.getFullYear() + " "  
    + currentDate.getHours() + ":"  
    + currentDate.getMinutes() ;
   
    useEffect(() => {
        console.log(ACCESS_TOKEN)
        fetch(`https://us1.locationiq.com/v1/reverse?key=${ACCESS_TOKEN}&lat=${props.latitude}0662&lon=${props.longitude}&format=json&zoom=14`)
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
            <div>
            <h1>{items.address.state},{items.address.neighbourhood}</h1>
            <h1>{datetime}</h1>

            </div>
            <div>
                <h1>today {props.today.temperature} {props.today.temperatureUnit}</h1>
                <h1>windspeed {props.today.windSpeed} wind direction {props.today.windDirection}</h1>
                <h1>{props.today.shortForecast}</h1>
            </div>
        </div>
        );
      }
}
export default LocationDate