import { TiWeatherShower } from "react-icons/ti";

export default function ComingDay() {

  return (
    <div className="coming-day basis-1/4 flex-grow lg:basis-1/6 py-4 px-5 flex flex-col items-center gap-y-2 bg-slate-800 rounded-lg">
      <p className="font-bold">Mon</p>
      <TiWeatherShower className="text-primary text-4xl"/>
      <p>19/24</p>
    </div>
  )
}