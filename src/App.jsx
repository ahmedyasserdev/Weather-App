import { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${import.meta.env.VITE_API_KEY}`;

  const searchLocation = () => {
    if (location) {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          // Handle error here
          console.error(error);
        });
    }

    setLocation("");
  };

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={searchLocation}>Search</button>
      </div>
      <div className="container">
      
        <div className="top">
          <div className="location">
          <p>{data && data.name}</p>
          </div>
          <div className="temp">
            <h1>{data && data.main?.temp.toFixed()}°F</h1>
          </div>
          <div className="description">
          <p>{data?.weather[0]?.main}</p>
          </div>
        </div>

        <div className="bottom">
          <div className="feels">
            <p className="bold">{data && data.main?.feels_like.toFixed()}°F</p>
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            <p className="bold">{data && data.main?.humidity}%</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className="bold">{data && data.wind?.speed.toFixed()} MBH</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;