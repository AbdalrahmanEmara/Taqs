import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { MdOutlineSearch } from "react-icons/md";
import axios from "axios";
import { useWeather } from "../context/weatherContext";
import SearchSuggestions from "./SearchSuggestions";
import { debounce } from "lodash";

const KEY = "81a355aac55648eb805160737252411";
const CITYNAMEKEY = "cd2ff3b48cmsh5bf99a28c9068a1p177b0fjsnd1d2bdf449bf";

export default function Search() {
  const bouncingDelay = 500;
  const [cityQuery, setCityQuery] = useState("");
  const inputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cachedSuggestions, setCachedSuggestions] = useState([]);
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
  
  // Stable function that won't change on re-renders
  const fetchSuggestions = useCallback(async (query) => {
    try {
      console.log('Fetching suggestions for:', query);
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
      console.log('Got response:', res.data.data);
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
      setCachedSuggestions(finalFormData);
      setShowSuggestions(true);
    } catch (err) {
      console.error('Error fetching suggestions:', err.message);
      setSuggestions([]);
      setCachedSuggestions([]);
    }
  }, []);

  // Create debounced version using useMemo so it's stable
  const debouncedFetchSuggestions = useMemo(
    () => debounce(fetchSuggestions, bouncingDelay),
    [fetchSuggestions]
  );

  useEffect(() => {
    if (!cityQuery || cityQuery.trim() === "") {
      setSuggestions([]);
      setCachedSuggestions([]);
      setShowSuggestions(false);
      debouncedFetchSuggestions.cancel();
      return;
    }
    debouncedFetchSuggestions(cityQuery);
  }, [cityQuery, debouncedFetchSuggestions]);

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedFetchSuggestions.cancel();
    };
  }, [debouncedFetchSuggestions]);

  // Click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchContainerRef}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-2 flex items-center bg-[#0E1421] rounded-lg">
        <MdOutlineSearch className="inline-block text-2xl mx-2 text-gray-400" />
        <input
          type="text"
          value={cityQuery}
          onChange={(e) => setCityQuery(e.target.value)}
          onFocus={() => {
            if (cachedSuggestions.length > 0 && cityQuery) {
              setSuggestions(cachedSuggestions);
              setShowSuggestions(true);
            }
          }}
          placeholder="Search for a city..."
          className="bg-transparent outline-none text-white flex-grow p-1"
          ref={inputRef}
        />
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <SearchSuggestions
          suggestions={suggestions}
          setSuggestions={setSuggestions}
          setShowSuggestions={setShowSuggestions}
          setCityQuery={setCityQuery}
          setCachedSuggestions={setCachedSuggestions}
        />
      )}
    </div>
  );
}
