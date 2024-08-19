document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const city = params.get('city');
  const apiKey = "f369a547d21ec361de1006a0fd0345d9";

  if (city) {
    fetchDetailedWeather(city, apiKey);
  } else {
    document.getElementById('detailed-weather-data').innerHTML = '<p>No city selected. Please go back and select a city.</p>';
  }

  document.getElementById('back-btn').addEventListener('click', function() {
    window.location.href = 'index.html';
  });
});

async function fetchDetailedWeather(city, apiKey) {
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const airQualityURL = `https://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid=${apiKey}`;

  try {
    const weatherResponse = await fetch(weatherURL);
    const weatherData = await weatherResponse.json();

    const airQualityResponse = await fetch(airQualityURL.replace('{lat}', weatherData.coord.lat).replace('{lon}', weatherData.coord.lon));
    const airQualityData = await airQualityResponse.json();

    displayDetailedWeather(weatherData, airQualityData);
  } catch (error) {
    console.error('Error fetching detailed weather data:', error);
    document.getElementById('detailed-weather-data').innerHTML = '<p>Error fetching weather data. Please try again later.</p>';
  }
}

function displayDetailedWeather(weatherData, airQualityData) {
  const detailedWeatherDiv = document.getElementById('detailed-weather-data');
  
  const sunriseTime = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString();
  const sunsetTime = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();

  detailedWeatherDiv.innerHTML = `
    <h2>${weatherData.name}</h2>
    <p>Temperature: ${weatherData.main.temp}°C</p>
    <p>Feels Like: ${weatherData.main.feels_like}°C</p>
    <p>Humidity: ${weatherData.main.humidity}%</p>
    <p>Highest Temperature: ${weatherData.main.temp_max}°C</p>
    <p>Lowest Temperature: ${weatherData.main.temp_min}°C</p>
    <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
    <p>Wind Direction: ${weatherData.wind.deg}°</p>
    <p>Visibility: ${weatherData.visibility / 1000} km</p>
    <p>Pressure: ${weatherData.main.pressure} hPa</p>
    <p>Sunrise: ${sunriseTime}</p>
    <p>Sunset: ${sunsetTime}</p>
    <p>Air Quality Index: ${airQualityData.list[0].main.aqi}</p>
  `;
}
