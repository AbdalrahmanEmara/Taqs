export default function ComingDay({
  day,
  icon,
  dayObj,
  tempType,
}) {
  const {
    maxtemp_c: maxTempC,
    mintemp_c: minTempC,
    maxtemp_f: maxTempF,
    mintemp_f: minTempF,
  } = dayObj.day;
  return (
    <div className="coming-day basis-1/4 flex-grow lg:basis-1/6 py-4 px-5 flex flex-col items-center gap-y-2 bg-[#0E1421] rounded-lg">
      <p className="font-bold">{day}</p>
      <img src={icon} alt="icon" />
      <p>
        {Math.round(tempType === "C" ? minTempC : minTempF)}/
        {Math.round(tempType === "C" ? maxTempC : maxTempF)}
      </p>
    </div>
  );
}
