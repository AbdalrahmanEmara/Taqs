import { TiWeatherPartlySunny } from "react-icons/ti";
import OtherWeatherInfo from "./OtherWeatherInfo";
export default function TodayWeather({ weather, tempType }) {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return (
    <div className="today-weather col-span-3 lg:col-span-1 bg-slate-800 rounded-lg p-5">
      <div className="main-info flex flex-col items-center">
        <img src={weather.condition.icon} className="text-primary w-24 mb-2" alt="weather-icon" />
        <span className="text-6xl font-bold">
          {Math.round(tempType === "C" ? weather.tempC : weather.tempF)}°
        </span>
        <p className="weather-description text-xl text-slate-400 mb-5">
          {weather.condition.text}
        </p>
        <p className="location text-xl font-bold">
          {weather.city},{" "}
          {weather.country.split(" ").length > 1
            ? weather.country.split(" ").map((w) => w[0].toUpperCase())
            : weather.country}
        </p>
        <p className="date text-slate-400 ">{formattedDate}</p>
      </div>

      <div className="other-weather-info flex flex-wrap gap-3 mt-7">
        <OtherWeatherInfo
          type={"Feels Like"}
          value={`${Math.round(
            tempType === "C" ? weather.feelsLikeC : weather.feelsLikeF
          )}°`}
        />
        <OtherWeatherInfo type={"Humidity"} value={`${weather.humidity}%`} />
        <OtherWeatherInfo type={"Wind"} value={`${weather.wind} km/h`} />
        <OtherWeatherInfo type={"UV Index"} value={weather.uv} />
      </div>
    </div>
  );
}
