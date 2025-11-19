import Header from "./Header";
import Search from "./Search";
import WeatherDetails from "./WeatherDetails";

function App() {
  return (
    <div className="App mx-auto p-6 md:w-full  lg:max-w-4xl max-w-full relative bg-linear-to-br from-sky-500 to-indigo-500">
      <Header />
      <Search />
      <WeatherDetails />
    </div>
  );
}

export default App;
