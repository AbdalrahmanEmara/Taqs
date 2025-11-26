import React from "react";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { TbUvIndex } from "react-icons/tb";
import { FaTemperatureHalf } from "react-icons/fa6";

import Card from "./HighlightCard";

export default function Cards() {
  return (
    <>
      <div className="col-span-6 md:col-span-2 bg-radial from-[#162850] to-[#121A2D] p-4 rounded-2xl">
        <p className="mb-4 font-semibold text-lg ml-2">Today Highlight</p>
        <div className="grid grid-rows-2 grid-cols-2 gap-3 flex-wrap text-center">
          <Card name={"Humidity"} value={"60%"}>
            <WiHumidity className="text-sky-500 text-4xl" />
          </Card>
          <Card name={"Wind Speed"} value={"15 km/h"}>
            <FaWind className="text-sky-500 text-4xl" />
          </Card>
          <Card
            name={"Feels Like"}
            value={"30"}
            >
            <FaTemperatureHalf className="text-sky-500 text-4xl" />
          </Card>
          <Card
            name={"UV Index"}
            value={"5"}
            >
            <TbUvIndex className="text-sky-500 text-4xl" />
          </Card>
        </div>
      </div>
    </>
  );
}
