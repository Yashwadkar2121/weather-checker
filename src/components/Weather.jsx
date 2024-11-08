// src/components/Weather.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Weather = ({ data, city }) => {
  if (!data || !data.hourly) return <p>Loading weather data...</p>;

  const { hourly } = data;

  // Helper function to calculate the past 15 days' dates
  const getPast15DaysDates = () => {
    const dates = [];
    for (let i = 15; i > 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toLocaleDateString());
    }
    return dates;
  };

  const past15DaysDates = getPast15DaysDates();

  // Data for the past 15 days chart (without Wind Direction)
  const getPastData = (dataset) => ({
    labels: past15DaysDates,
    datasets: [
      {
        label: "Temperature (°C)",
        data: dataset.temperature_180m.slice(0, 15),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Rain (mm)",
        data: dataset.rain.slice(0, 15),
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Wind Speed (km/h)",
        data: dataset.wind_speed_180m.slice(0, 15),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Soil Temperature (°C)",
        data: dataset.soil_temperature_54cm.slice(0, 15),
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.5)",
      },
      {
        label: "Soil Moisture (%)",
        data: dataset.soil_moisture_27_81cm.slice(0, 15),
        borderColor: "rgb(255, 159, 232)",
        backgroundColor: "rgba(255, 159, 232, 0.5)",
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Past 15 Days Weather Data",
      },
    },
  };

  return (
    <div>
      <h2>Weather in {city}</h2>

      {/* Current Weather Data */}
      <h3>Current Weather</h3>
      <p>Temperature: {hourly.temperature_180m[0]}°C</p>
      <p>Rain: {hourly.rain[0]} mm</p>
      <p>Wind Speed: {hourly.wind_speed_180m[0]} km/h</p>
      <p>Soil Temperature: {hourly.soil_temperature_54cm[0]}°C</p>
      <p>Soil Moisture: {hourly.soil_moisture_27_81cm[0]}%</p>
      <p>Precipitation: {hourly.precipitation[0]} mm</p>

      {/* Chart for Past 15 Days */}
      <h3>Past 15 Days</h3>
      <Line data={getPastData(hourly)} options={options} />
    </div>
  );
};

export default Weather;
