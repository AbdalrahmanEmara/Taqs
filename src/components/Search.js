import { useState, useEffect } from "react";
import { MdOutlineSearch } from "react-icons/md";
import axios from "axios";

const KEY = "b4144a3a3ae54582aa974229251610";

export default function Search({
  setWeather,
  cityQuery,
  setCityQuery,
  submit,
  setSubmit,
  setIsLoading,
  setError,
}) {
  useEffect(
    function () {
      if (!cityQuery || !submit) return;

      async function getQuery() {
        try {
          setIsLoading(true);
          setError("");

          const res = await axios.get(
            "https://api.weatherapi.com/v1/forecast.json",
            {
              params: {
                key: KEY,
                q: cityQuery,
                days: 5,
                api: "no",
                alerts: "no",
              },
            }
          );

          const {
            heatindex_c: tempC,
            heatindex_f: tempF,
            humidity,
            feelslike_c: feelsLikeC,
            feelslike_f: feelsLikeF,
            wind_kph: wind,
            condition,
            uv,
          } = res.data.current;

          const { name: city, country } = res.data.location;

          const forecastDays = res.data.forecast.forecastday;

          setWeather({
            tempC,
            tempF,
            humidity,
            feelsLikeC,
            feelsLikeF,
            wind,
            condition,
            city,
            country,
            uv,
            forecastDays,
          });
        } catch (err) {
          setWeather(null);
          if (err.response) {
            // Server responded with error status
            if (err.response.status === 400) {
              setError("City not found. Please check the spelling.");
            } else if (err.response.status === 401) {
              setError("Invalid API key.");
            } else if (err.response.status === 403) {
              setError("API key limit exceeded.");
            } else {
              setError("Unable to fetch weather data. Please try again.");
            }
            console.error("API Error:", err.response.data);
          } else if (err.request) {
            // Request made but no response
            setError("No internet connection. Please check your network.");
            console.error("Network Error:", err.request);
          } else {
            // Other errors
            setError("Something went wrong. Please try again.");
            console.error("Unexpected error:", err.message);
          }
        } finally {
          setSubmit(false);
          setIsLoading(false);
          setCityQuery("");
        }
      }
      getQuery();
    },
    [
      submit,
      cityQuery,
      setWeather,
      setError,
      setIsLoading,
      setSubmit,
      setCityQuery,
    ]
  );

  return (
    <form
      className="p-2 flex items-center bg-slate-800 rounded-lg"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmit(true);
      }}>
      <MdOutlineSearch className="inline-block text-2xl mx-2 text-gray-400" />
      <input
        type="text"
        value={cityQuery}
        onChange={(e) => setCityQuery((cityQuery) => e.target.value)}
        placeholder="Search for a city..."
        className="bg-transparent outline-none text-white flex-grow p-1"
      />
    </form>
  );
}
