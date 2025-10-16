import Forecast from "./Forecast";
import TodayWeather from "./TodayWeather";

export default function WeatherDetails() {


  return (
    <div className="grid grid-cols-3 gap-7 text-white mt-6">
      <TodayWeather />
      <Forecast />
    </div> 
  )
}