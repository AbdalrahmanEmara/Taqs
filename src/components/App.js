import {useState} from 'react';
import Header from "./Header";
import Search from "./Search";
import WeatherDetails from "./WeatherDetails";

function App() {
  const [weather, setWeather] = useState(null);
  const [cityQuery, setCityQuery] = useState('');
  const [submit, setSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tempType, setTempType] = useState("C");

  return (
    <div className="App mx-auto p-6 md:w-full  lg:max-w-4xl max-w-full relative bg-linear-to-br from-sky-500 to-indigo-500">
      <Header tempType={tempType} onChangeTempType={setTempType} />
      <Search setWeather={setWeather} cityQuery={cityQuery} setCityQuery={setCityQuery} submit={submit} setSubmit={setSubmit} setIsLoading={setIsLoading} setError={setError} />
      <WeatherDetails weather={weather} isLoading={isLoading} tempType={tempType} error={error} setError={setError} />
    </div>
  );
}

export default App;
