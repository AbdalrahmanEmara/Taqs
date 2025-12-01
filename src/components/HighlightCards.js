import React from "react";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { TbUvIndex } from "react-icons/tb";
import { FaTemperatureHalf } from "react-icons/fa6";

import Card from "./HighlightCard";
import { useWeather } from "../context/weatherContext";

export default function Cards() {
  const {weather, tempType} = useWeather();
  return (
    <>
      <div className="col-span-5 tablet:col-span-2 row-span-1 bg-radial from-[#1b3877] to-[#0b101f] p-4 rounded-3xl">
        <p className="mb-4 font-semibold text-xl ml-2">Today Highlight</p>
        <div className="grid grid-rows-2 grid-cols-2 gap-4 flex-wrap text-center">
          <Card name={"Humidity"} value={weather.humidity}>
            <WiHumidity className="text-sky-500 text-4xl" />
          </Card>
          <Card name={"Wind Speed"} value={`${weather.wind} km/h`}>
            <FaWind className="text-sky-500 text-4xl" />
          </Card>
          <Card
            name={"Feels Like"}
            value={`${Math.round(tempType === "C" ? weather.forecastDays[0].hour[0].feelslike_c : weather.forecastDays[0].hour[0].feelslike_f)}°`}
            >
            <FaTemperatureHalf className="text-sky-500 text-4xl" />
          </Card>
          <Card
            name={"UV Index"}
            value={weather.uv}
            >
            <TbUvIndex className="text-sky-500 text-4xl" />
          </Card>
        </div>
      </div>
    </>
  );
}
