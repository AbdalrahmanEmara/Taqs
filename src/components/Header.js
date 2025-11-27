import { TiWeatherPartlySunny } from "react-icons/ti";
import { MdMyLocation } from "react-icons/md";
import { useWeather } from "../context/weatherContext";

export default function Header() {
  const { tempType, setTempType, requestLocation } = useWeather();

  return (
    <header className="flex text-white my-4 pb-3">
      <h1 className="grow flex items-center gap-3 text-xl font-bold">
        <TiWeatherPartlySunny className="inline-block text-primary text-3xl" />
        Weather Dash
      </h1>
      <div className="flex gap-4 items-center justify-center">
        <button
          onClick={requestLocation}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#742BEC] hover:bg-[#8c44ff] transition-colors duration-200"
          title="Get my location">
          <MdMyLocation className="text-xl" />
          <span className="text-sm font-semibold">My Location</span>
        </button>
        <div className="flex gap-2 items-center">
        °C{" "}
        {tempType === "C" ? (
          <button
            className="h-6 w-12 rounded-full box-border bg-slate-500 flex justify-start"
            onClick={() =>
              setTempType((cur) => (cur === "C" ? "F" : "C"))
            }>
            <span className="circle inline-block  py-3 px-3 rounded-full bg-slate-300 z-10 transition duration-300 "></span>
          </button>
        ) : (
          <button
            className="h-6 w-12 rounded-full box-border bg-slate-500 flex justify-end"
            onClick={() =>
              setTempType((cur) => (cur === "C" ? "F" : "C"))
            }>
            <span className="circle inline-block  py-3 px-3 rounded-full bg-green-500 z-10 transition duration-300"></span>
          </button>
        )}{" "}
        °F
        </div>
      </div>
    </header>
  );
}
