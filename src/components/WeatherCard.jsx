// src/components/WeatherCard.jsx
import React from "react";

function WeatherCard({ data }) {
  return (
    <div className="bg-white shadow-md rounded-md p-6 max-w-sm w-full">
      <h2 className="text-xl font-semibold mb-2">{data.cityName}</h2>
      <p>Temperature: {data.temperature}°C</p>
      <p>Wind Speed: {data.windspeed} km/h</p>
      <p>Wind Direction: {data.winddirection}°</p>
    </div>
  );
}

export default WeatherCard;
