import { useState, useEffect, useRef, useCallback } from "react";
import { MdOutlineSearch } from "react-icons/md";
import axios from "axios";
import { useWeather } from "../context/weatherContext";
import SearchSuggestions from "./SearchSuggestions";
import { debounce } from "lodash";
import { CiYoutube } from "react-icons/ci";

const KEY = "81a355aac55648eb805160737252411";
const CITYNAMEKEY = "cd2ff3b48cmsh5bf99a28c9068a1p177b0fjsnd1d2bdf449bf";

export default function Search() {
  const bouncingDelay = 500;
  const [cityQuery, setCityQuery] = useState("");
  const inputRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  // const [submit, setSubmit] = useState(false);
  const [error, setError] = useState("");

  const { dispatch, lat, lng } = useWeather();

  useEffect(
    function () {
      if (!lat && !lng) return;

      async function getQuery() {
        try {
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

          console.log(res);

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
          console.log(res);

          const currentWeather = {
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
          };
          dispatch({ type: "weather/loaded", payload: currentWeather });
        } catch (err) {
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
          dispatch({ type: "error", payload: error });
        } finally {
          setCityQuery("");
          setSuggestions([]);
        }
      }
      getQuery();
    },
    [lat, lng, dispatch, error]
  );
  
  const debouncedFetchSuggestions = useCallback(
    debounce(async (query) => {
      try {
        const res = await axios.get(
          "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
          {
            params: { namePrefix: query, limit: 10 },
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
    }, bouncingDelay, {
      "leading": false,
      "trailing": true
    }),
    []
  );

  useEffect(() => {
    if (!cityQuery) {
      setSuggestions([]);
      return;
    }
    debouncedFetchSuggestions(cityQuery);
  }, [cityQuery, debouncedFetchSuggestions]);

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-2 flex items-center bg-[#0E1421] rounded-lg">
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
        <SearchSuggestions
          suggestions={suggestions}
          setSuggestions={setSuggestions}
        />
      )}
    </>
  );
}
