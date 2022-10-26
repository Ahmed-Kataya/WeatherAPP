import {useEffect,useState} from "react"
import LocationDate from "./LocationDate";

function HourlyForecast(props){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]); 
    let birthday;
 useEffect(()=>{
    fetch(`https://api.weather.gov/gridpoints/${props.gridId}/${props.gridX},${props.gridY}/forecast/hourly`)
    .then(res => res.json())
    .then(
        (result)=>{
        setIsLoaded(true);
        setItems(result);
        },
        (error) =>{
            setIsLoaded(true);
            setError(error);
        }
    )
 },[])
 if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
     
     //<div>{items.properties.periods.number}</div>
     <>
        <LocationDate latitude={props.latitude}longitude={props.longitude} today={items.properties.periods[0]}/>
     <ul>
        {items.properties.periods.slice(0, 5).map(item => (
          <li key={item.number}>
            
            <div>{ new Date(item.startTime).getHours()
            
            
            }</div>
            <div>{item.temperature}{item.temperatureUnit}</div>
            <div>{items.shortForecast}</div>
          </li>
        ))}
      </ul>
      </>
      
     
    );
  }
}
export default HourlyForecast