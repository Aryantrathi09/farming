import { useEffect } from 'react'
import useStore from '../store/useStore'
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi'

const getWeatherIcon = (weatherCode) => {
  if (weatherCode >= 200 && weatherCode < 300) return <WiThunderstorm className="w-12 h-12" />
  if (weatherCode >= 300 && weatherCode < 600) return <WiRain className="w-12 h-12" />
  if (weatherCode >= 600 && weatherCode < 700) return <WiSnow className="w-12 h-12" />
  if (weatherCode >= 801) return <WiCloudy className="w-12 h-12" />
  return <WiDaySunny className="w-12 h-12" />
}

function Weather() {
  const { weather, fetchWeather } = useStore()

  useEffect(() => {
    // Example coordinates - you should get these from user's location or farm location
    const defaultLat = 40.7128
    const defaultLon = -74.0060
    fetchWeather(defaultLat, defaultLon)
  }, [fetchWeather])

  if (weather.loading) {
    return (
      <div className="p-4">
        <p>Loading weather data...</p>
      </div>
    )
  }

  if (weather.error) {
    return (
      <div className="p-4 text-red-600">
        <p>Error loading weather data. Please check your API key.</p>
      </div>
    )
  }

  if (!weather.current) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Weather Conditions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Weather */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Current Weather</h3>
          <div className="flex items-center space-x-4">
            {getWeatherIcon(weather.current.weather[0].id)}
            <div>
              <p className="text-3xl font-bold">{Math.round(weather.current.main.temp)}°C</p>
              <p className="text-gray-600">{weather.current.weather[0].description}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Humidity</p>
              <p className="font-semibold">{weather.current.main.humidity}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Wind Speed</p>
              <p className="font-semibold">{Math.round(weather.current.wind.speed)} m/s</p>
            </div>
          </div>
        </div>

        {/* Forecast */}
        {weather.forecast && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">3-Hour Forecast</h3>
            <div className="space-y-2">
              {weather.forecast.list.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getWeatherIcon(item.weather[0].id)}
                    <div className="ml-2">
                      <p className="font-semibold">{Math.round(item.main.temp)}°C</p>
                      <p className="text-sm text-gray-600">
                        {new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{item.weather[0].description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Weather Alerts */}
      {weather.current.alerts && (
        <div className="mt-6 bg-red-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-red-700 mb-2">Weather Alerts</h3>
          <div className="space-y-2">
            {weather.current.alerts.map((alert, index) => (
              <div key={index} className="text-red-600">
                <p className="font-semibold">{alert.event}</p>
                <p className="text-sm">{alert.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Weather 