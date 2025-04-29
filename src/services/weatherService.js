const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getCurrentWeather = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const getWeatherForecast = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
}; 