export default function ComingDay({ day, icon, maxTempC, minTempC, maxTempF, minTempF }) {

  return (
    <div className="coming-day basis-1/4 flex-grow lg:basis-1/6 py-4 px-5 flex flex-col items-center gap-y-2 bg-slate-800 rounded-lg">
      <p className="font-bold">{day}</p>
      <img src={icon} />
      <p>{Math.round(minTempC)}/{Math.round(maxTempC)}</p>
    </div>
  )
}