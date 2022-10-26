function DailyForecast(props){
    return(
      <div>
        <h1>Daily forecast</h1>
        <ul>
        {props.items.properties.periods.map(item => (
          <li key={item.number}>
            {item.name} {item.temperature} {item.shortForecast}
          </li>
        ))}
      </ul>
      </div>
    )
}
export default DailyForecast