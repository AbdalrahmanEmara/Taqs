import { useState, useEffect } from "react";
import { MdOutlineSearch } from "react-icons/md";
import axios from "axios";

const KEY = "b4144a3a3ae54582aa974229251610";

export default function Search({ setWeather, cityQuery, setCityQuery, submit, setSubmit, setIsLoading, setError }) {

  useEffect(
    function () {
      if (!cityQuery || !submit) return;

      async function getQuery() {
        try {
          setIsLoading(true);

          const res = await axios.get(
            "http://api.weatherapi.com/v1/forecast.json",
            {
              params: {
                key: KEY,
                q: cityQuery,
                days: 5,
                api: "no",
                alert: "no",
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
          } = res.data.current;

          const {
            name: city,
            country,
          } = res.data.location;

          const forecastDays = res.data.forecast.forecastday;

          // const condition = res.data.current.condition.text;

          setWeather({ tempC, tempF, humidity, feelsLikeC, feelsLikeF, wind, condition, city, country });

          console.log(tempC, tempF);

          console.log(res.data);
          setSubmit(false);
          setIsLoading(false);
        } catch (err) {
          console.error(err.message);
          setError(err.message);
        }
      }
      getQuery();
    },
    [submit]
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
