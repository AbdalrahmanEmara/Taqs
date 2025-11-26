import React from 'react'
import { useWeather } from '../context/weatherContext';
import FetchLocation from './FetchLocation';

export default function Error() {
  // In your component
const { error, lat, lng } = useWeather();

const handleLocation = function () {
  FetchLocation();
}

if (error && !lat && !lng) {
  return (
    <div>
      <p>{error}</p>
      <button onClick={() => handleLocation} >
        Enter Location Manually
      </button>
    </div>
  );
}
}
