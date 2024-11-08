// api/geocode.js
import axios from "axios";

export default async function handler(req, res) {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
  }

  try {
    // Make the request to Open-Meteo reverse geocoding API
    const response = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/reverse`,
      {
        params: { latitude, longitude },
      }
    );

    // Enable CORS for all origins
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Return the data from Open-Meteo to the frontend
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching geolocation data:", error);
    res.status(500).json({ error: "Failed to fetch location data" });
  }
}
