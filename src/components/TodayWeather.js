// import { TiWeatherPartlySunny } from "react-icons/ti";
// import OtherWeatherInfo from "./OtherWeatherInfo";
import { MdLocationOn } from "react-icons/md";
// import BigBox from "./BigBox";

export default function TodayWeather({ weather, tempType }) {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  console.log(weather);
  const weekday = formattedDate.split(" ")[0].slice(0, -1);
  return (
    <div className="bigBox row-span-1" >
      <div className="flex gap-8 flex-col ">
        <div className="text-white bg-[#742BEC] flex gap-1 text-sm font-semibold py-2 pl-3 pr-6 rounded-full items-center justify-center w-fit">
          <MdLocationOn />
          {weather.country}
        </div>

        <div>
          <p className="text-4xl font-semibold mb-1">{weekday}</p>
          <p className="text-sm">
            {formattedDate.split(" ").slice(1).join(" ")}
          </p>
        </div>

        <div className="my-3">
          <span className="text-[2.7rem] sm:text-[3.2rem] font-bold">
            {tempType === "C"
              ? `${Math.round(weather.tempC)}°C`
              : `${Math.round(weather.tempF)}°F`}
          </span>
          <p>
            High: {tempType === "C"
              ? `${Math.round(weather.forecastDays[0].day.maxtemp_c)}°C`
              : `${Math.round(weather.forecastDays[0].day.maxtemp_f)}°F`} Low: {tempType === "C"
              ? `${Math.round(weather.forecastDays[0].day.mintemp_c)}°C`
              : `${Math.round(weather.forecastDays[0].day.mintemp_c)}°F`}
          </p>
        </div>
      </div>
      <div className="flex items-end flex-col">
          <img
            src={weather.condition.icon}
            className="text-primary mt-6 w-24 miniMob:w-32 mob:w-40"
            alt="weather-icon"
          />

          <div className="text-center mob:pr-6">
            <p className="text-2xl font-semibold mb-1 ">
              {weather.forecastDays[0].hour[today.getHours()].condition.text}
            </p>
            <p>
              Feels like{" "}
              {Math.round(tempType === "C" ? weather.forecastDays[0].hour[0].feelslike_c : weather.forecastDays[0].hour[0].feelslike_f)}°
            </p>
          </div>
      </div>
    </div>
  );
}