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
    <div className="bigBox" >
      <div className="flex gap-6 flex-col sm:gap-8 ">
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
            High: {weather.tempC} Low: {weather.tempC}
          </p>
        </div>
      </div>
      <div className="flex items-end  flex-col">
        <div>
          <img
            src={weather.condition.icon}
            className="text-primary w-40 mt-3 sm:w-48"
            alt="weather-icon"
          />

          <div className="text-center">
            <p className="text-2xl font-semibold mb-1 ">
              {weather.forecastDays[0].day.condition.text}
            </p>
            <p>
              Feels like{" "}
              {Math.round(tempType === "C" ? weather.tempC : weather.tempF)}°
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

//         <span className="text-6xl font-bold">
//           {Math.round(tempType === "C" ? weather.tempC : weather.tempF)}°
//         </span>
//         <p className="weather-description text-xl text-slate-400 mb-5">
//           {weather.condition.text}
//         </p>
//         <p className="location text-xl font-bold">
//           {weather.city},{" "}
//           {weather.country.split(" ").length > 1
// ? weather.country.split(" ").map((w) => w[0].toUpperCase())
//             : weather.country}
//         </p>
//         <p className="date text-slate-400 ">{formattedDate}</p>
