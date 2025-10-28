import { TiWeatherPartlySunny } from "react-icons/ti";

export default function Header({ tempType, onChangeTempType }) {
  
  return (
    <header className="flex text-white my-4 pb-3">
      <h1 className="grow flex items-center gap-3 text-xl font-bold">
        <TiWeatherPartlySunny className="inline-block text-primary text-3xl" />
        Weather Dash
      </h1>
      <div className="flex gap-2 justify-center">
        °C{" "}
        {tempType === "C" ? (
          <button
            className="h-6 w-12 rounded-full box-border bg-slate-500 flex justify-start"
            onClick={() => onChangeTempType((cur) => (cur === "C" ? "F" : "C"))}>
            <span className="circle inline-block  py-3 px-3 rounded-full bg-slate-300 z-10 transition duration-300 "></span>
          </button>
        ) : (
          <button
            className="h-6 w-12 rounded-full box-border bg-slate-500 flex justify-end"
            onClick={() => onChangeTempType((cur) => (cur === "C" ? "F" : "C"))}>
            <span className="circle inline-block  py-3 px-3 rounded-full bg-green-500 z-10 transition duration-300"></span>
          </button>
        )}{" "}
        °F
      </div>
    </header>
  );
}
