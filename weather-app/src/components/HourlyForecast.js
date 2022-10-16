import {useEffect,useState} from "react"
function HourlyForecast(props){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]); 
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
     <div>
     
     <ul>
        {items.properties.periods.map(item => (
          <li key={item.number}>
            {item.name} {item.temperature}
          </li>
        ))}
      </ul>
      </div>
      
     
    );
  }
}
export default HourlyForecast