
async function fetchWeather() {
  console.log("fetchWeather function called");
  let searchInput = document.getElementById("search").value;
  const weatherDataSection = document.getElementById("weather-data");
  weatherDataSection.style.display = "block";
  const apiKey = "f369a547d21ec361de1006a0fd0345d9";

  console.log("Search input:", searchInput);

  // Validate input
  if (searchInput == "") {
    weatherDataSection.innerHTML = `
    <div>
      <h2>Empty Input!</h2>
      <p>Please try again with a valid <u>city name</u>.</p>
    </div>
    `;
    return;
  }

  try {
    const geocodeData = await getLonAndLat(searchInput, apiKey);
    if (geocodeData) {
      await getWeatherData(geocodeData.lon, geocodeData.lat, apiKey);
      showMoreInfoButton(searchInput);
    }
  } catch (error) {
    console.error("Error in fetchWeather:", error);
    weatherDataSection.innerHTML = `
    <div>
      <h2>Error</h2>
      <p>An error occurred while fetching weather data. Please try again later.</p>
    </div>
    `;
  }

  document.getElementById("search").value = "";
}
// Get longitude and latitude function
async function getLonAndLat(searchInput, apiKey) {
  console.log("getLonAndLat function called");
  const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.replace(" ", "%20")}&limit=1&appid=${apiKey}`;

  
  try {
    const response = await fetch(geocodeURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Geocode data:", data);
    
    const exactMatch = data.find(location => location.name.toLowerCase() === searchInput.toLowerCase());
    
    if (!exactMatch) {
      throw new Error("No exact matching city found");
    }
    
    return exactMatch;
  } catch (error) {
    console.error("Error in getLonAndLat:", error);
    const weatherDataSection = document.getElementById("weather-data");
    weatherDataSection.innerHTML = `
    <div>
      <h2>Invalid Input: "${searchInput}"</h2>
      <p>Please try again with a valid <u>city name</u>.</p>
    </div>
    `;
    return null;
  }
}
// Get weather data function
async function getWeatherData(lon, lat, apiKey) {
  console.log("getWeatherData function called");
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  
  try {
    const response = await fetch(weatherURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Weather data:", data);

    const weatherDataSection = document.getElementById("weather-data");
    weatherDataSection.style.display = "flex";
    weatherDataSection.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100" />
    <div>
      <h2>${data.name}</h2>
      <p><strong>Temperature:</strong> ${Math.round(data.main.temp - 273.15)}°C</p>
      <p><strong>Description:</strong> ${data.weather[0].description}</p>
    </div>
    <button id="more-info-btn" style="display: none;">More Info</button>
    `;
  } catch (error) {
    console.error("Error in getWeatherData:", error);
    const weatherDataSection = document.getElementById("weather-data");
    weatherDataSection.innerHTML = `
    <div>
      <h2>Error</h2>
      <p>An error occurred while fetching weather data. Please try again later.</p>
    </div>
    `;
  }
}

// The showMoreInfoButton function displays the More Info button and adds a click event listener
function showMoreInfoButton(city) {
  console.log("Displaying More Info button for city:", city);
  const moreInfoBtn = document.getElementById('more-info-btn');
  
  if (moreInfoBtn) {
    moreInfoBtn.style.display = 'block'; // Make the button visible
    moreInfoBtn.addEventListener('click', function() {
      window.location.href = `detailed-weather.html?city=${encodeURIComponent(city)}`;
    });
    console.log("More Info button made visible and click event added.");
  } else {
    console.error("More Info button not found in the DOM.");
  }
}



// The search button triggers the fetchWeather function
document.getElementById('submit').addEventListener('click', fetchWeather);


// Font size adjustment
document.getElementById('increase-font').addEventListener('click', function() {
  changeFontSize(1.15); // 
});

document.getElementById('decrease-font').addEventListener('click', function() {
  changeFontSize(0.95); // 
});

function changeFontSize(factor) {
  let body = document.body;
  let currentFontSize = window.getComputedStyle(body).fontSize;
  let newFontSize = parseFloat(currentFontSize) * factor;
  body.style.fontSize = `${newFontSize}px`;
}

// Toggle theme and save preference
document.getElementById('toggle-theme').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');

  // Save theme preference in localStorage
  if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
  } else {
      localStorage.setItem('theme', 'light');
  }
});

// Apply saved theme on page load
window.addEventListener('load', function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
  }
});
