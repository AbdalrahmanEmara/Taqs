import React from 'react'
import { useWeather } from '../context/weatherContext';

export default function SunriseSunset() {
  const { weather } = useWeather();
  const { sunrise, sunset } = weather.forecastDays[0].astro;

  return (
          <div className="col-span-4 mob:col-span-1 mob:flex-col py-3 bg-[#14203A] px-3 rounded-3xl mt-2 flex flex-row  justify-around items-center">
        <div>
          <span className="text-slate-500 text-2xl md:text-xl font-semibold block mb-2">
            Sunrise
          </span>
          <div className="relative">
            <p className="text-xl font-semibold">{sunrise.split(" ")[0]}</p>
            <span className="absolute right-0 top-1 mob:top-6">
              {sunrise.split(" ")[1]}
            </span>
          </div>
        </div>
        <div>
          <span className="text-slate-500 text-2xl md:text-xl font-semibold block mb-2">
            Sunset
          </span>
          <div className="relative">
            <p className="text-xl font-semibold">{sunset.split(" ")[0]}</p>
            <span className="absolute right-0 top-1 mob:top-6">
              {sunset.split(" ")[1]}
            </span>
          </div>
        </div>
      </div>
  )
}
