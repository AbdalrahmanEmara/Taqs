import React from "react";
import { useWeather } from "../context/weatherContext";

export default function HourlyWeather({hour}) {
  const {tempType} = useWeather();
  const time = new Date(hour.time);

  console.log(time);

  return (
    <li className="bg-[#0E1421]  rounded-[1.2rem] justify-center py-2 px-1 flex flex-col items-center border border-sky-900">
      <span>{time.getHours()}</span>
      <img src={hour.condition.icon} alt="icon"/>
      <span>{tempType === 'C' ? `${hour.temp_c}°` : `${hour.temp_f}°`}</span>
    </li>
  );
}
