import React from "react";
import { useWeather } from "../context/weatherContext";

export default function HourlyWeather({hour}) {
  const {tempType} = useWeather();
  const date = new Date(hour.time_epoch);

  console.log(date);

  return (
    <li className="bg-[#0E1421] gap-3  rounded-[1rem] justify-center py-2 px-1 flex flex-col items-center border border-sky-900">
      <span>{date.getMilliseconds()}</span>
      <img src={hour.condition.icon} alt="icon"/>
      <span>{tempType === 'C' ? `${hour.temp_c}°` : `${hour.temp_f}°`}</span>
    </li>
  );
}
