import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "05017894b8b0ac83af72659f3dc9d03c";
  const fetchURL = "https://api.openweathermap.org/data/2.5/weather";

  const handleSearch = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await fetch(`${fetchURL}?q=${cityName}&appid=${apiKey}`);
        const data = await response.json();
        if(data.message==='city not found'){
            setWeatherData(null);
            setError("city not found");
        }
        else{
        setWeatherData(data);
        setError("");
        }
        console.log(data);
      } catch (err) {
        setError("City not found. Please try again.");
        setWeatherData(null);
      }
      setCityName("");
    }
  };

  const handleChange = (event) => {
    setCityName(event.target.value);
  };

const formatTemperature = (temp) => {
    if (temp === undefined || temp === null) {
      return "";
    }
    if (weatherData && weatherData.main && weatherData.main.temp) {
      return `${Math.round(weatherData.main.temp - 273.15)}`;
    }
    return "";
  };
  
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date * 1000).toLocaleDateString("en-US", options);
  };

  return (
    <>
      <div className='body'>
        <div className="app-wrap">
          <header>
            <input
              type="text"
              className="search-box mr-5"
              placeholder="Search for a city..."
              value={cityName}
              onChange={handleChange}
              onKeyPress={handleSearch}
            />
          </header>
          <p className='text-white'>Press Enter</p>
          {weatherData && (
            <main>
              <section className="location">
                <div className="city">
                <i class="fa fa-map-marker" aria-hidden="true"></i> {weatherData.name}, {weatherData.sys?.country}
                </div>
                <div className="date">
                  {formatDate(weatherData.dt)}
                </div>
              </section>
              <div className="current">
                <div className="temp">
                    {
                        weatherData!=null?(<>{formatTemperature(weatherData.main.temp)}</>):(<>
                        <h1>Please enter correct city</h1>
                        </>)
                    }
                  
                  <span>°c</span>
                </div>
                <div className="weather">
                  {weatherData.weather[0].description}
                </div>
                <div className="hi-low">
                    {
                        weatherData?(<>
                        <h3 className='text-white'>Humidity: {weatherData.main.humidity}</h3>
                        </>):(<>
                        <h1>Please Enter Correct city</h1>
                        </>)
                    }
                </div>
              </div>
            </main>
          )}
          {error && <div className="error"><h1 className='error'>{error}</h1></div>}
        </div>
      </div>
    </>
  );
};

export default Home;
