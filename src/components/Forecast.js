import ComingDay from "./ComingDay";

export default function Forecast({ forecastDays, tempType }) {
  return (
    <div className="col-span-5 tablet:col-span-2">
      <h1 className="font-bold p-2 text-[20px]">5-Day Forecast</h1>
      <div className="flex gap-3 flex-wrap">
        {forecastDays.map((day, i) => (
          <ComingDay
            key={i}
            day={new Date(day.date).toLocaleDateString("en-US", {
              weekday: "short",
            })}
            dayObj={day}
            icon={day.day.condition.icon}
            tempType={tempType}
          />
        ))}
      </div>
    </div>
  );
}
