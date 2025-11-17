import { useState, useEffect, useRef } from "react";
import { MdOutlineSearch } from "react-icons/md";
import axios from "axios";

const KEY = "b4144a3a3ae54582aa974229251610";
const CITYNAMEKEY = "cd2ff3b48cmsh5bf99a28c9068a1p177b0fjsnd1d2bdf449bf";

export default function Search({
  setWeather,
  cityQuery,
  setCityQuery,
  submit,
  setSubmit,
  setIsLoading,
  setError,
}) {
  const inputRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  useEffect(
    function () {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    },
    [submit]
  );

  useEffect(
    function () {
      async function fetchLocation () {
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log(position);
              setLat(position.coords.latitude);
              setLng(position.coords.longitude);
            }
          )
        }
      }

      fetchLocation();
    }
  , [])

  useEffect(
    function () {
      if (!cityQuery && !submit && (!lat && !lng)) return;

      async function getQuery() {
        try {
          setIsLoading(true);
          setError("");

          const res = await axios.get(
            "https://api.weatherapi.com/v1/forecast.json",
            {
              params: {
                key: KEY,
                q: `${lat},${lng}`,
                days: 5,
                api: "no",
                alerts: "no",
              },
            }
          );

          const {
            temp_c: tempC,
            temp_f: tempF,
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
          setSuggestions([]);
        }
      }
      getQuery();
    },
    [lat, lng, submit]
  );

  useEffect(
    function () {
      if (!cityQuery) return;

      const timer = setTimeout(async function () {
        try {
          const res = await axios.get(
            "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
            {
              params: { namePrefix: cityQuery, limit: 10 },
              headers: {
                "x-rapidapi-key": CITYNAMEKEY,
                "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
              },
            }
          );

          const arr = res.data.data;

          const uniqueData = Array.from(
            new Map(
              arr.map((item) => [`${item.city}|${item.country}`, item])
            ).values()
          );

          const finalFormData = uniqueData.map((item) => {
            return {
              city: item.city,
              country: item.country,
              lat: item.latitude,
              lng: item.longitude,
            };
          });

          setSuggestions(finalFormData);
        } catch (err) {
          console.error(err.message);
        }
      }, 1000);

      return () => clearTimeout(timer);
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
    <>
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
          ref={inputRef}
        />
      </form>
      {suggestions[0]?.city && (
        <div className="search-container absolute">
          <ul className="text-slate-400  bg-slate-800 opacity-70 mt-2 rounded-xl p-3">
            {suggestions.map((s, i) => (
              <li
                className="py-2 pl-2 rounded-lg hover:text-slate-50 hover:bg-slate-600"
                key={i}
                onClick={() => {
                  setLat(suggestions[i].lat);
                  setLng(suggestions[i].lng);
                  setSubmit(true);
                }}>
                {s.city}, {s.country}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
