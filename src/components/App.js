import {useState} from 'react';
import Header from "./Header";
import Search from "./Search";
import WeatherDetails from "./WeatherDetails";

function App() {
  const [weather, setWeather] = useState(null);
  const [cityQuery, setCityQuery] = useState("");
  const [submit, setSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [tempType, setTempType] = useState("C");

  return (
    <div className="App m-auto p-6 md:max-w-3xl lg:max-w-4xl">
      <Header tempType={tempType} onChangeTempType={setTempType} />
      <Search setWeather={setWeather} cityQuery={cityQuery} setCityQuery={setCityQuery} submit={submit} setSubmit={setSubmit} setIsLoading={setIsLoading} setError={setError} />
      <WeatherDetails weather={weather} isLoading={isLoading} tempType={tempType} />
    </div>
  );
}

export default App;
