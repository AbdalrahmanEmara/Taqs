import Forecast from "./Forecast";
import TodayWeather from "./TodayWeather";

export default function WeatherDetails({ weather, isLoading, tempType }) {


  return (
    <>
    {isLoading && <p className="text-primary flex mt-48 justify-center text-5xl font-bold">Loading...</p>}

    {!isLoading && weather &&     
    (<div className="grid grid-cols-3 gap-7 text-white mt-6">
      <TodayWeather weather={weather} tempType={tempType} />
      <Forecast forecastDays={weather.forecastDays} tempType={tempType} />
    </div>) }

    {!isLoading && !weather && <p className="text-primary flex mt-48 justify-center text-5xl font-bold">Enter city</p>}

      </>
  )
}