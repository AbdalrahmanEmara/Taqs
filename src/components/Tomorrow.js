import React from 'react'
import { useWeather } from '../context/weatherContext'

export default function Tomorrow({hours}) {
  const {tempType} = useWeather();
  return (
            <div className="bg-gradient-to-r from-[#0E1421] via-[#1D325F] to-[#0E1421] flex justify-between p-3 rounded-3xl relative">
          <div className="flex items-center gap-2 p-1">
            <div className="flex flex-col text-sm">
              <span className="font-semibold">Tomorrow</span>
              <span className="text-slate-700 text-xs">
                {hours[0]?.condition.text}
              </span>
            </div>
            <span className="text-3xl font-semibold">
              {tempType === "C" ? `${hours[0].temp_c}°` : `${hours[0].temp_f}°`}
            </span>
          </div>
          <img
            alt="icon"
            src="./lightning_4089304.png"
            className="w-20 absolute right-0 bottom-1"
          />
        </div>
  )
}
