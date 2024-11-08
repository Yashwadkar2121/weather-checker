import React from "react";

const Weather = ({ data, city }) => {
  return (
    <div>
      <h2>Weather Conditions for {city}</h2>
      <h3>Temperature (180m): {data.hourly.temperature_180m}°C</h3>
      <h3>Rain: {data.hourly.rain} mm</h3>
      <h3>Wind Speed (180m): {data.hourly.wind_speed_180m} m/s</h3>
      <h3>Wind Direction (180m): {data.hourly.wind_direction_180m}°</h3>
      <h3>Soil Temperature (54 cm): {data.hourly.soil_temperature_54cm}°C</h3>
      <h3>
        Soil Moisture (27-81 cm): {data.hourly.soil_moisture_27_81cm} m³/m³
      </h3>
      <h3>Precipitation: {data.hourly.precipitation} mm</h3>
    </div>
  );
};

export default Weather;
