import {useEffect,useState} from "react"

function Data(props){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]); 
    useEffect(()=>{
        fetch(`https://api.weather.gov/gridpoints/${props.gridId}/${props.gridX},${props.gridY}`)
        .then(res => res.json())
        .then(
            (result)=>{
                console.log("hourly",result)
            setIsLoaded(true);
            setItems(result);
            },
            (error) =>{
                setIsLoaded(true);
                setError(error);
            }
        )
    },[])
    return(
        <></>
    )

}
export default Data;