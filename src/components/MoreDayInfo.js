import React from "react";
// import BigBox from "./BigBox";
import { useWeather } from "../context/weatherContext";
import HourlyWeather from "./HourlyWeather";

export default function MoreDayInfo() {
  const { weather, tempType } = useWeather();
  const { sunrise, sunset } = weather.forecastDays[0].astro;
  console.log(sunrise, sunset);
  const { hour } = weather.forecastDays[0];
  const hours = hour.slice(0, 5);
  console.log(hours);

  return (
    <div className="bigBox pb-6 grid-cols-4 row-start-2 gap-3">
      <div className="col-span-3 flex flex-col justify-between gap-6">
        <div>
          <h1 className="text-xl font-semibold mb-4">Today / Week</h1>
          <ul className="flex gap-1 hours-status flex-shrink-0 flex-row bg-radial from-[#162850] to-[#121A2D] p-4 rounded-3xl overflow-hidden">
            {hours.map((hour) => (
              <HourlyWeather hour={hour} />
            ))}
          </ul>
        </div>
        <div className="bg-gradient-to-r from-[#0E1421] via-[#1D325F] to-[#0E1421] flex justify-between p-3 rounded-3xl relative">
          <div className="flex items-center gap-2 p-1">
            <div className="flex flex-col text-sm">
              <span>Tomorrow</span>
              <span>{hours[1].condition.text}</span>
            </div>
            <span className="text-3xl font-semibold">
              {tempType === "C" ? `${hours[1].temp_c}°` : `${hours[1].temp_f}°`}
            </span>
          </div>
          <img
            alt="icon"
            src="./storm_728136.png"
            className="w-20 absolute right-0 bottom-1"
          />
        </div>
      </div>
      <div className="bg-[#14203A] py-5 px-3 rounded-3xl mt-2 flex flex-col justify-around">
        <div>
        <span className="text-slate-500 text-2xl md:text-xl font-semibold block mb-2">Sunrise</span>
        <div className="relative">
          <p className="text-xl font-semibold">{sunrise.split(" ")[0]}</p>
          <span className="absolute right-0 top-2">{sunrise.split(" ")[1]}</span>
        </div>

        </div>
        <div>
        <span className="text-slate-500 text-2xl md:text-xl font-semibold block mb-2">Sunset</span>
        <div className="relative">
          <p className="text-xl font-semibold">{sunset.split(" ")[0]}</p>
          <span className="absolute right-0 top-2">{sunset.split(" ")[1]}</span>
        </div>

        </div>

      </div>
    </div>
  );
}
