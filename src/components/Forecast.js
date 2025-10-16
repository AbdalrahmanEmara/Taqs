import ComingDay from "./ComingDay";

export default function Forecast() {
  
  return(
    <div className="forecast-details col-span-3 lg:col-span-2">
      <h1 className="font-bold p-2 text-[20px]">5-Day Forecast</h1>
      <div className="flex gap-3 flex-wrap">
        <ComingDay />
        <ComingDay />
        <ComingDay />
        <ComingDay />
        <ComingDay />
      </div>
    </div>

  )
}