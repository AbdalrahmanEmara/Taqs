import { useWeather } from "../context/weatherContext";
import Cards from "./HighlightCards";
import Forecast from "./Forecast";
import Spinner from "./Spinner";
import TodayWeather from "./TodayWeather";
import { BiSolidError } from "react-icons/bi";
import MoreDayInfo from "./MoreDayInfo";

export default function WeatherDetails() {
  const { weather, isLoading, error, tempType } = useWeather();
  return (
    <>
      {isLoading && (
        <p className="text-primary flex mt-48 justify-center text-5xl font-bold">
          <Spinner />
        </p>
      )}

      {!isLoading && !error && weather && (
        <div className="grid grid-cols-5 gap-y-7 gap-x-7 md:gap-x-7 miniMob:grid-rows-4 tablet:grid-rows-2 text-white mt-6">
          <TodayWeather weather={weather} tempType={tempType} />
          <MoreDayInfo />
          <Cards />
          <Forecast forecastDays={weather.forecastDays} tempType={tempType} />
        </div>
      )}

      {!isLoading && !error && !weather && (
        <p className="text-primary flex mt-48 justify-center text-5xl font-bold">
          Enter a city
        </p>
      )}

      {error && (
        <div className="flex justify-center flex-col gap-3 mt-48 items-center">
          <BiSolidError className="text-orange-600 text-7xl text-center" />
          <p className="text-orange-600 flex justify-center text-3xl font-bold text-center">
            {error}
          </p>
        </div>
      )}
    </>
  );
}
