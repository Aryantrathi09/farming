import { useState } from 'react'
import { FaTemperatureHigh, FaWind, FaCloudRain, FaSun } from 'react-icons/fa'

function Weather() {
  const [weatherData] = useState({
    current: {
      temperature: 25,
      condition: 'Sunny',
      humidity: 65,
      windSpeed: 12,
      precipitation: 0
    },
    forecast: [
      {
        day: 'Today',
        high: 28,
        low: 18,
        condition: 'Sunny',
        precipitation: 0
      },
      {
        day: 'Tomorrow',
        high: 26,
        low: 17,
        condition: 'Partly Cloudy',
        precipitation: 20
      },
      {
        day: 'Wednesday',
        high: 24,
        low: 16,
        condition: 'Rain',
        precipitation: 80
      },
      {
        day: 'Thursday',
        high: 22,
        low: 15,
        condition: 'Rain',
        precipitation: 90
      },
      {
        day: 'Friday',
        high: 25,
        low: 16,
        condition: 'Cloudy',
        precipitation: 30
      }
    ],
    alerts: [
      {
        type: 'warning',
        message: 'Heavy rain expected on Wednesday and Thursday',
        time: '2024-03-13'
      },
      {
        type: 'info',
        message: 'Optimal conditions for planting on Friday',
        time: '2024-03-15'
      }
    ]
  })

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <FaSun className="text-yellow-500" />
      case 'partly cloudy':
        return <FaCloudRain className="text-gray-500" />
      case 'rain':
        return <FaCloudRain className="text-blue-500" />
      case 'cloudy':
        return <FaCloudRain className="text-gray-400" />
      default:
        return <FaSun className="text-yellow-500" />
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Weather Forecast</h1>

      {/* Current Weather */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Current Weather</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {getWeatherIcon(weatherData.current.condition)}
              <div className="ml-4">
                <p className="text-4xl font-bold">{weatherData.current.temperature}°C</p>
                <p className="text-gray-600">{weatherData.current.condition}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <FaWind className="text-gray-500 mr-2" />
                <span>{weatherData.current.windSpeed} km/h</span>
              </div>
              <div className="flex items-center">
                <FaCloudRain className="text-gray-500 mr-2" />
                <span>{weatherData.current.precipitation}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Weather Alerts */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Weather Alerts</h2>
          <div className="space-y-4">
            {weatherData.alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  alert.type === 'warning'
                    ? 'bg-red-50 text-red-800'
                    : 'bg-blue-50 text-blue-800'
                }`}
              >
                <p className="font-medium">{alert.message}</p>
                <p className="text-sm mt-1">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">5-Day Forecast</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {weatherData.forecast.map((day, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">{day.day}</p>
              <div className="my-2">{getWeatherIcon(day.condition)}</div>
              <p className="text-2xl font-bold">{day.high}°C</p>
              <p className="text-gray-600">{day.low}°C</p>
              <p className="text-sm text-gray-500 mt-2">
                {day.precipitation}% chance of rain
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Weather 