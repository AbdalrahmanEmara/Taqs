export default function OtherWeatherInfo({ type, value }) {
  
  return (
    <div className="border-t border-slate-600 p-3 basis-1/3 flex-grow flex flex-col items-center">
      <p>{type}</p>
      <span>{value}</span>
    </div>
  )
}