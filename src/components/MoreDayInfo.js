import React from "react";
// import BigBox from "./BigBox";
import { useWeather } from "../context/weatherContext";
import HourlyWeather from "./HourlyWeather";
import SunriseSunset from "./SunriseSunset";
import Tomorrow from "./Tomorrow";

export default function MoreDayInfo() {
  const { weather } = useWeather();
  const currentHour = new Date().getHours();
  console.log( currentHour);
  const { hour } = weather.forecastDays[0];
  const hours = hour.slice(currentHour, currentHour + 5);

  return (
    <div className="bigBox pb-6 grid-cols-4 row-start-2 row-span-1 gap-3">
      <div className="col-span-4 mob:col-span-3 flex flex-col justify-between gap-6">
        <div>
          <h1 className="text-xl font-semibold mb-4">Today / Week</h1>
          <ul className="flex gap-1 hours-status flex-shrink-0 flex-row bg-radial from-[#162850] to-[#121A2D] p-4 rounded-3xl overflow-hidden">
            {hours.map((hour) => (
              <HourlyWeather hour={hour} key={hour.time} />
            ))}
          </ul>
        </div>
        <Tomorrow hours={hours} />
      </div>
      <SunriseSunset />
    </div>
  );
}
