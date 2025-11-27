import React from 'react'
import { useWeather } from '../context/weatherContext';

export default function SearchSuggestions({suggestions, setSuggestions, setShowSuggestions, setCityQuery, setCachedSuggestions}) {
  const {dispatch} = useWeather();

  const handleCitySelect = (city) => {
    dispatch({ type: "loadingCoords", payload: { lat: city.lat, lng: city.lng } });
    setSuggestions([]);
    setCachedSuggestions([]);
    setShowSuggestions(false);
    setCityQuery("");
  };

  return (
    <div className="search-container absolute z-50">
          <ul className="text-cyan-600  bg-[#0E1421] mt-2 rounded-xl p-3 shadow-lg">
            {suggestions.map((s, i) => (
              <li
                className="py-2 pl-2 rounded-lg hover:text-slate-50 hover:bg-slate-600 cursor-pointer"
                key={i}
                onClick={() => handleCitySelect(s)}>
                {s.city}, {s.country}
              </li>
            ))}
          </ul>
        </div>
  )
}
