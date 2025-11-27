import Header from "./Header";
import Search from "./Search";
import WeatherDetails from "./WeatherDetails";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App mx-auto p-6 md:w-full  lg:max-w-6xl max-w-full relative bg-[#060C1A]">
      <Header />
      <Search />
      <WeatherDetails />

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "12px" }}
        toastOptions={{
          success: {
            duration: 2000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "14px 24px",
            backgroundColor: "#0E1421",
            color: "#FFF",
          },
        }}></Toaster>
    </div>
  );
}

export default App;
