import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Weather = ({ data, city }) => {
  if (!data || !data.hourly)
    return <p className="text-center">Loading weather data...</p>;

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

  // Data for the past 15 days chart
  const getPastData = (dataset) => ({
    labels: past15DaysDates,
    datasets: [
      {
        label: "Temperature (°C)",
        data: dataset.temperature_180m.slice(0, 15),
        backgroundColor: "rgba(255, 99, 132, 0.5)", // #FF6384
      },
      {
        label: "Rain (mm)",
        data: dataset.rain.slice(0, 15),
        backgroundColor: "rgba(54, 162, 235, 0.5)", // #36A2EB
      },
      {
        label: "Wind Speed (km/h)",
        data: dataset.wind_speed_180m.slice(0, 15),
        backgroundColor: "rgba(75, 192, 192, 0.5)", // #4BC0C0
      },
      {
        label: "Soil Temperature (°C)",
        data: dataset.soil_temperature_54cm.slice(0, 15),
        backgroundColor: "rgba(153, 102, 255, 0.5)", // #9966FF
      },
      {
        label: "Soil Moisture (%)",
        data: dataset.soil_moisture_27_81cm.slice(0, 15),
        backgroundColor: "rgba(255, 159, 232, 0.5)", // #FF9FE8
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Past 15 Days Weather Data",
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 0,
          autoSkip: true,
        },
      },
    },
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">
        Weather in <span className="text-blue-500">{city}</span>
      </h2>

      {/* Current Weather Data */}
      <h3 className="text-lg font-semibold text-center">Current Weather</h3>
      <div className="text-center space-y-1">
        <p>
          <span className="text-[#FF6384] font-semibold">Temperature:</span>{" "}
          <b>{hourly.temperature_180m[0]}°C</b>
        </p>
        <p>
          <span className="text-[#36A2EB] font-semibold">Rain:</span>{" "}
          <b>{hourly.rain[0]} mm</b>
        </p>
        <p>
          <span className="text-[#4BC0C0] font-semibold">Wind Speed:</span>{" "}
          <b>{hourly.wind_speed_180m[0]} km/h</b>
        </p>
        <p>
          <span className="text-[#9966FF] font-semibold">
            Soil Temperature:
          </span>{" "}
          <b>{hourly.soil_temperature_54cm[0]}°C</b>
        </p>
        <p>
          <span className="text-[#FF9FE8] font-semibold">Soil Moisture:</span>{" "}
          <b>{hourly.soil_moisture_27_81cm[0]}%</b>
        </p>
      </div>

      {/* Chart for Past 15 Days */}
      <h3 className="text-lg font-semibold mt-4 text-center">Past 15 Days</h3>
      <div className="w-full max-w-5xl h-[350px] mx-auto mt-4">
        <Bar data={getPastData(hourly)} options={options} />
      </div>
    </div>
  );
};

// Define PropTypes for the Weather component
Weather.propTypes = {
  data: PropTypes.shape({
    hourly: PropTypes.shape({
      temperature_180m: PropTypes.arrayOf(PropTypes.number).isRequired,
      rain: PropTypes.arrayOf(PropTypes.number).isRequired,
      wind_speed_180m: PropTypes.arrayOf(PropTypes.number).isRequired,
      soil_temperature_54cm: PropTypes.arrayOf(PropTypes.number).isRequired,
      soil_moisture_27_81cm: PropTypes.arrayOf(PropTypes.number).isRequired,
    }).isRequired,
  }).isRequired,
  city: PropTypes.string.isRequired,
};

export default Weather;
