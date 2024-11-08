// src/components/Weather.js
import React from "react";

const Weather = ({ data, city }) => {
  const {
    temperature_180m,
    rain,
    wind_speed_180m,
    wind_direction_180m,
    soil_temperature_54cm,
    soil_moisture_27_81cm,
    precipitation,
  } = data.hourly;

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>Temperature: {temperature_180m[0]}°C</p>
      <p>Rain: {rain[0]} mm</p>
      <p>Wind Speed: {wind_speed_180m[0]} km/h</p>
      <p>Wind Direction: {wind_direction_180m[0]}°</p>
      <p>Soil Temperature: {soil_temperature_54cm[0]}°C</p>
      <p>Soil Moisture: {soil_moisture_27_81cm[0]}%</p>
      <p>Precipitation: {precipitation[0]} mm</p>
    </div>
  );
};

export default Weather;
