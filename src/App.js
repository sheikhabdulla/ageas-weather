import React, { useState } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState('');
  const [forecast, setForecast] = useState([]);

  let weatherDescription = [
    {
    code: [0],
    description: 'Clear sky'
  },
  {
    code: [1, 2, 3],
    description: '	Mainly clear, partly cloudy, and overcast'
  },
  {
    code: [45, 48],
    description: 'Fog and depositing rime fog'
  },
  {
    code: [51, 53, 55],
    description: 'Drizzle: Light, moderate, and dense intensity'
  },
  {
    code: [56, 57],
    description: 'Freezing Drizzle: Light and dense intensity'
  },
  {
    code: [61, 63, 65],
    description: 'Rain: Slight, moderate and heavy intensity'
  },
  {
    code: [66, 67],
    description: 'Freezing Rain: Light and heavy intensity'
  },
  {
    code: [71, 73, 75],
    description: 'Snow fall: Slight, moderate, and heavy intensity'
  },
  {
    code: [77],
    description: 'Snow grains'
  },
  {
    code: [80, 81, 82],
    description: 'Rain showers: Slight, moderate, and violent'
  },
  {
    code: [85, 86],
    description: '	Snow showers slight and heavy'
  },
  {
    code: [95],
    description: 'Thunderstorm: Slight or moderate'
  },
  {
    code: [96, 99],
    description: 'Thunderstorm with slight and heavy hail'
  },
]

  const handleSearch = async () => {
    try {
    const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`;

    const geocodingResponse = await fetch(geocodingUrl);
    const geocodingData = await geocodingResponse.json();
  
    const { latitude, longitude } = geocodingData.results[0];

    const forecastUrl = `https://api.open-meteo.com/v1/dwd-icon?latitude=${latitude}&longitude=${longitude}&timezone=GMT&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max`;
    const response = await fetch(forecastUrl);
      const data = await response.json();
      setForecast(data.daily);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
      </header>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter a location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="forecast-container">
        {forecast && forecast?.time?.map((time, index) => (
          index < 5 &&
          <div className="day-container" key={index}>
            <h2>{time}</h2>
           
            {weatherDescription.map((weather, weatherIndex) => {
             return weather.code.map((code) => {
               if (code === forecast.weathercode[index]) {
               return (
               <>
                <img
               src={`${weatherIndex+1}.png`}
               alt={weather.description}
               style={{width: "150px", height: "150px"}}
             />
               <p>{weather.description}</p>
               </>
               )
              } 
              })
            })}
            <p>{forecast.temperature_2m_min[index]+'/'+forecast.temperature_2m_max[index]}°C</p>
            <p>{forecast.windspeed_10m_max[index]} km/h</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
