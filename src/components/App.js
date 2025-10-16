import Header from "./Header";
import Search from "./Search";
import WeatherDetails from "./WeatherDetails";

function App() {
  return (
    <div className="App m-auto p-6 md:max-w-3xl lg:max-w-4xl">
      <Header />
      <Search />
      <WeatherDetails />
    </div>
  );
}

export default App;
