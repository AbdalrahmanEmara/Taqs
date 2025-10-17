import ComingDay from "./ComingDay";

export default function Forecast({ forecastDays, tempType }) {
  return (
    <div className="forecast-details col-span-3 lg:col-span-2">
      <h1 className="font-bold p-2 text-[20px]">5-Day Forecast</h1>
      <div className="flex gap-3 flex-wrap">
        {forecastDays.map((day, i) => (
          <ComingDay
            key={i}
            day={new Date(day.date).toLocaleDateString("en-US", {
              weekday: "short",
            })}
            icon={day.day.condition.icon}
            maxTempC={day.day.maxtemp_c}
            minTempC={day.day.mintemp_c}
            maxTempF={day.day.maxtemp_f}
            minTempF={day.day.mintemp_f}
            tempType={tempType}
          />
        ))}
      </div>
    </div>
  );
}
