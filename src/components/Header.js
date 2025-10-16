import { TiWeatherPartlySunny } from "react-icons/ti";

export default function Header() {
  return (
    <header className="flex text-white my-4 pb-3">
      <h1 className="grow flex items-center gap-3 text-xl font-bold">
        <TiWeatherPartlySunny className="inline-block text-primary text-3xl"/>
        Weather Dash
      </h1>
      <div className="flex gap-2 justify-center">
        °C <button className="h-6 w-12 rounded-full box-border bg-slate-500 flex justify-start">
            <span className="circle inline-block  py-3 px-3 rounded-full bg-slate-300 z-10"></span>
          </button> °F
      </div>
    </header>
  );
}
