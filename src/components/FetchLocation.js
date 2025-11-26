import { useWeather } from '../context/weatherContext';

export default function FetchLocation() {
  const {dispatch} = useWeather();

  async function fetchLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location obtained:", position);
          dispatch({
            type: "loadingCoords",
            payload: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        },
        (error) => {
          // Handle errors (permission denied, timeout, etc.)
          console.error("Geolocation error:", error);
          dispatch({
            type: "error",
            payload: `Location error: ${error.message}`,
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      dispatch({
        type: "error",
        payload: "Geolocation is not supported by your browser",
      });
    }
  }

  return fetchLocation;
}
