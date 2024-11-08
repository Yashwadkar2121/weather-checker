// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./components/Weather";
import Search from "./components/Search";

const App = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Loading location...");
  const [searchCity, setSearchCity] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        fetchWeather(latitude, longitude);
      },
      (error) => {
        console.error("Error fetching location:", error);
        setCity("Location unavailable");
      }
    );
  }, []);

  const fetchWeather = async (lat, lon, cityName = "Your Location") => {
    try {
      // Fetch weather data
      const weatherResponse = await axios.get(
        "https://api.open-meteo.com/v1/forecast",
        {
          params: {
            latitude: lat,
            longitude: lon,
            past_days: 15,
            forecast_days: 15,
            hourly:
              "temperature_180m,rain,wind_speed_180m,wind_direction_180m,soil_temperature_54cm,soil_moisture_27_81cm,precipitation",
            timezone: "auto",
          },
        }
      );
      setWeatherData(weatherResponse.data);
      setCity(cityName);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setCity("Location error");
      // Show an alert on error
      window.alert(
        "There was an error fetching the weather data. Please try again."
      );
    }
  };

  const handleSearch = async () => {
    try {
      const geoResponse = await axios.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        {
          params: {
            name: searchCity,
          },
        }
      );

      if (geoResponse.data.results.length > 0) {
        const { latitude, longitude, name } = geoResponse.data.results[0];
        setLatitude(latitude);
        setLongitude(longitude);
        fetchWeather(latitude, longitude, name); // Pass city name to fetchWeather
      } else {
        setCity("City not found");
        // Show an alert if the city is not found
        window.alert(
          "City not found. Please check the spelling or try another city."
        );
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      setCity("Search error");
      // Show an alert on error
      window.alert(
        "Please Enter a Current city ! There was an error fetching the city coordinates. Please try again."
      );
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <Search
        city={searchCity}
        setCity={setSearchCity}
        handleSearch={handleSearch}
      />
      {weatherData && <Weather data={weatherData} city={city} />}
    </div>
  );
};

export default App;
