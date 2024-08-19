document.addEventListener('DOMContentLoaded', function() {
    const apiKey = "f369a547d21ec361de1006a0fd0345d9";
    
    // Array of cities
    const cities = ["Chicago", "New York", "Dubai"];
  
    cities.forEach(city => {
      fetchWeatherData(city, apiKey);
    });
  });
  
  async function fetchWeatherData(city, apiKey) {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(weatherURL);
      const data = await response.json();
      updateCityCard(city, data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
  
  function updateCityCard(city, data) {
    const cityCard = document.querySelector(`.city-card[data-city="${city}"]`);
    
    if (cityCard) {
      const temperatureElem = cityCard.querySelector('.temperature');
      const descriptionElem = cityCard.querySelector('.description');
      
      if (data && temperatureElem && descriptionElem) {
        temperatureElem.textContent = `Temperature: ${data.main.temp}°C`;
        descriptionElem.textContent = `Description: ${data.weather[0].description}`;
      }
    }
  }
  