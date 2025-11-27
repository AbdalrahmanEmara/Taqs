# Taqs Weather App

A modern, responsive weather application built with React that provides real-time weather information and 3-day forecasts for cities worldwide.

![Taqs Weather App](screen.png)

## Features

- **Real-time Weather Data**: Get current weather conditions including temperature, humidity, wind speed, and UV index
- **5-Day Forecast**: View detailed weather predictions for the next 3 days
- **Manual Location Access**: Click "My Location" button to share your location for local weather
- **Smart City Search**: Search for any city worldwide with intelligent autocomplete suggestions
  - Debounced search (500ms) to minimize API calls
  - Click outside to close suggestions
  - Suggestions reappear when refocusing on search bar
- **Temperature Units**: Toggle between Celsius and Fahrenheit with visual switch
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **Modern UI**: Clean, gradient-based design with custom Tailwind CSS styling
- **Privacy Focused**: Location access is opt-in, not automatic

## Tech Stack

- **Frontend Framework**: React 19.2.0
- **Styling**: Tailwind CSS 3.4.18
- **HTTP Client**: Axios 1.12.2
- **Icons**: React Icons 5.5.0
- **API**: WeatherAPI.com & GeoDB Cities API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AbdalrahmanEmara/Taqs
cd Taqs
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- **`npm start`**: Runs the app in development mode
- **`npm test`**: Launches the test runner in interactive watch mode
- **`npm run build`**: Builds the app for production to the `build` folder
- **`npm run eject`**: Ejects from Create React App (one-way operation)

## Project Structure

```
Taqs/
├── public/              # Static files
│   ├── index.html      # HTML template
│   └── favicon.ico     # App icon
├── src/
│   ├── components/     # React components
│   │   ├── App.js                  # Root component
│   │   ├── Header.js               # App header
│   │   ├── Search.js               # City search with autocomplete
│   │   ├── SearchSuggestions.js    # Search dropdown
│   │   ├── WeatherDetails.js       # Main weather display
│   │   ├── TodayWeather.js         # Current weather card
│   │   ├── Forecast.js             # 5-day forecast container
│   │   ├── ComingDay.js            # Individual forecast day
│   │   ├── HighlightCards.js       # Weather highlights grid
│   │   ├── HighlightCard.js        # Individual highlight card
│   │   ├── MoreDayInfo.js          # Additional day information
│   │   ├── HourlyWeather.js        # Hourly forecast
│   │   ├── SunriseSunset.js        # Sunrise/sunset times
│   │   ├── Spinner.js              # Loading indicator
│   │   └── Error.js                # Error display
│   ├── context/
│   │   └── weatherContext.jsx      # Global weather state management
│   ├── index.css       # Global styles
│   └── index.js        # App entry point
├── tailwind.config.js  # Tailwind CSS configuration
└── package.json        # Project dependencies
```

## Architecture

### State Management

The app uses React Context API with `useReducer` for global state management:

- **weatherContext.jsx**: Manages weather data, loading states, errors, coordinates, and temperature units
- **Reducer Actions**:
  - `readyToFetch`: Prepares for data fetching
  - `loadingCoords`: Sets coordinates and loading state
  - `weather/loaded`: Updates weather data after successful fetch
  - `changeTempType`: Toggles between Celsius and Fahrenheit
  - `error`: Handles error states

### Key Features Implementation

#### Geolocation
- Manual location access via "My Location" button in header
- Respects user privacy by not auto-requesting location
- Seamlessly loads weather data when location is granted
- Provides clear error messages if location access fails

#### Smart Search with Debouncing
- **Debounced input**: 500ms delay using lodash to prevent excessive API calls
- **useRef implementation**: Maintains stable debounce reference across re-renders
- **Intelligent caching**: Stores previous search results for instant re-display
- **Click-outside detection**: Closes suggestions when clicking elsewhere on page
- **Focus handling**: Reappears cached suggestions when clicking back on search bar
- **Auto-cleanup**: Clears suggestions and cancels pending requests when input is empty
- Fetches city suggestions from GeoDB Cities API
- Removes duplicate city entries using Map-based deduplication

#### Weather Data Flow
1. User clicks "My Location" button or searches for a city
2. Coordinates are dispatched to weather context (with loading state)
3. WeatherAPI.com is called with coordinates for 5-day forecast
4. Weather data is processed and stored in context
5. Components subscribe to context and reactively display data
6. Loading spinner shows during data fetch
7. Error handling with user-friendly messages for network/API issues

### Custom Tailwind Configuration

- **Custom Colors**: Primary blue, background light/dark variants
- **Custom Fonts**: Inter and Noto Sans
- **Custom Breakpoints**: `miniMob` (400px), `mob` (530px), `tablet` (800px)
- **Gradient Utilities**: Radial and linear gradient helpers

## API Configuration

The app uses two APIs:

1. **WeatherAPI.com** - For weather data and 5-day forecasts
   - Provides current conditions, hourly forecasts, and daily predictions
   - Includes UV index, wind speed, humidity, feels-like temperature

2. **GeoDB Cities API** (via RapidAPI) - For city search and autocomplete
   - Returns up to 10 city suggestions per query
   - Includes city name, country, and coordinates

> **Note**: API keys are currently hardcoded in `Search.js`. For production, move these to environment variables using `.env` file:
> ```
> REACT_APP_WEATHER_API_KEY=your_key_here
> REACT_APP_GEODB_API_KEY=your_key_here
> ```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Recent Updates

### v2.0 - Enhanced UX & Performance (November 2025)
- ✨ Added manual "My Location" button for privacy-focused location access
- 🚀 Optimized search with proper debouncing using useRef pattern
- 🎯 Implemented click-outside detection to close search suggestions
- 💾 Added suggestion caching for instant re-display on focus
- 🧹 Improved state cleanup when clearing search input
- 🐛 Fixed debounce issues that caused excessive API calls
- ♿ Enhanced accessibility with better keyboard and click handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- City data provided by [GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
