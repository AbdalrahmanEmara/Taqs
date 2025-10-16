import { TiWeatherPartlySunny } from "react-icons/ti";
import OtherWeatherInfo from "./OtherWeatherInfo";
export default function TodayWeather() {
  return (
    <div className="today-weather col-span-3 lg:col-span-1 bg-slate-800 rounded-lg p-5">

      <div className="main-info flex flex-col items-center">
        <TiWeatherPartlySunny className="text-primary text-7xl mb-4" />
        <span className="text-6xl font-bold">22°</span>
        <p className="weather-description text-xl text-slate-400 mb-5">Partly Cloudy</p>
        <p className="location text-xl font-bold">New York, US</p>
        <p className="date text-slate-400 ">Saturday, 20 April</p>
      </div>

      <div className="other-weather-info flex flex-wrap gap-3 mt-7">
        <OtherWeatherInfo type={"Feels Like"} value={`25°`} />
        <OtherWeatherInfo type={"Humidity"} value={`60%`} />
        <OtherWeatherInfo type={"Wind"} value={`15 km/h`} />
        <OtherWeatherInfo type={"UV Index"} value={`5`} />
      </div>

    </div>
  );
}
