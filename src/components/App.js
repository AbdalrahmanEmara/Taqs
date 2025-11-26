import Header from "./Header";
import Search from "./Search";
import WeatherDetails from "./WeatherDetails";

function App() {
  return (
    <div className="App mx-auto p-6 md:w-full  lg:max-w-6xl max-w-full relative bg-[#060C1A]">
      <Header />
      <Search />
      <WeatherDetails />
    </div>
  );
}

export default App;
