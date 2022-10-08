import { useState } from "react";
import {useEffect} from "react"
function MyComponent() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    
    useEffect(() => {
      fetch("https://api.weather.gov/gridpoints/TOP/31,80/forecast")
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
       
       //<div>{items.properties.periods.number}</div>
       <ul>
          {items.properties.periods.map(item => (
            <li key={item.number}>
              {item.name} {item.temperature}
            </li>
          ))}
        </ul>
      );
    }
}
  export default MyComponent;
