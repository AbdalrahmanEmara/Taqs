import { createContext, useContext, useEffect, useReducer, useState } from "react";

const WeatherContext = createContext();

const initialState = {
  weather: "",
  lat: "",
  lng: "",
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "readyToFetch":
      return {
        ...state,
        error: "",
        isLoading: false,
      };
    case "loadingCoords":
      return {
        ...state,
        // weather: null,
        lat: action.payload.lat,
        lng: action.payload.lng,
        isLoading: true,
        error: "",
      };

    case "weather/loaded":
      return {
        ...state,
        weather: action.payload,
        error: "",
        isLoading: false,
      };

    case "changeTempType":
      return { ...state, tempType: (state.tempType === "C" ? "F" : "C") };

    case "error":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
}

function WeatherProvider({ children }) {
  const [tempType, setTempType] = useState('C');
  const [{ weather, isLoading, error, lat, lng } , dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position);
          dispatch({
            type: "loadingCoords",
            payload: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    }

    fetchLocation();
  }, []);

  return (
    <WeatherContext.Provider value={{ dispatch, weather, isLoading, error, lat, lng, tempType, setTempType }}>{children}</WeatherContext.Provider>
  );
}

function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) 
    throw new Error("Weather context was used outside the WeatherProvider");

  return context;
}

export { useWeather, WeatherProvider };