import React from 'react'
import { useWeather } from '../context/weatherContext';

export default function SearchSuggestions({suggestions, setSuggestions}) {
  const {dispatch} = useWeather();

  return (
    <div className="search-container absolute">
          <ul className="text-slate-400  bg-slate-800 opacity-70 mt-2 rounded-xl p-3">
            {suggestions.map((s, i) => (
              <li
                className="py-2 pl-2 rounded-lg hover:text-slate-50 hover:bg-slate-600"
                key={i}
                onClick={() => {
                  dispatch({ type: "loadingCoords", payload: { lat: s.lat, lng: s.lng } });
                  setSuggestions([]);
                }}>
                {s.city}, {s.country}
              </li>
            ))}
          </ul>
        </div>
  )
}
