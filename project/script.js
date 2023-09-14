// HTML elements
const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");
const afterSearchWeather = document.getElementById("afterSearchWeather");

// Global variables
let cityName,
region,
  country,
  currentTemperature,
  weatherIcon,
  iconUrl,
  weatherMessage,
  maxTemp,
  minTemp,
  precipitation;

// API Key
const API_KEY = "81c688300b9f4a07b49194332231109";

// Event listener for the search button
function inputCityName() {
  searchButton.addEventListener("click", function () {
    console.log("Button clicked");
    const cityNameValue = cityInput.value;
    console.log("City Name:", cityNameValue);
    getWeather(cityNameValue);
  });
}

 
//  `https://api.weatherapi.com/v1/future.json?key=81c688300b9f4a07b49194332231109&q=${cityName}&dt=${updateDate}`
// ineedthe next 2 days of the forecast and the futre 2 days so this if you change the date will give me the future 2 days 

// Initialize the event listener
inputCityName();

// Function to fetch weather data
async function getWeather(cityName) {
  try {
    //   const currentResponse = await fetch(
    //     `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`
    //   );
    
    //   console.log(currentResponse, "currentResponse ");
    //   console.log(currentResponse.status);
    //   if (currentResponse.ok) {
    //     const currentData = await currentResponse.json();
    //     console.log(currentData, "currentdata");
    //     displayCurrentWeather(currentData);
    //   } else {
    //     console.error("Failed to fetch current weather data");
    //   }

    // Fetch forecast data from another API
    const forecastResponse = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}`
    );
    console.log(forecastResponse, "forecastResponse ");
    console.log(forecastResponse.status); // Log the HTTP status code
    if (forecastResponse.ok) {
      const forecastData = await forecastResponse.json();
      console.log(forecastData, "forecastData");
      displayForecastWeather(forecastData);
    } else {
      console.error("Failed to fetch weather forecast data");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Function to display current weather
// function displayCurrentWeather(currentData) {
//   if (!currentData) {
//     return;
//   }
//   cityName = currentData.location.name;
//   console.log(cityName, "cityName");
//   country = currentData.location.country;
//   console.log(country, "country");
//   currentTemperature = Math.floor(currentData.current.temp_f);
//   console.log(currentTemperature, "currentTemperature");
// }

// Function to display forecast weather
function displayForecastWeather(forecastData) {
  if (!forecastData) {
    return;
  }
  cityName = forecastData.location.name;
  console.log(cityName, "cityName");
  region = forecastData.location.region;
  console.log(region, "region");
  country = forecastData.location.country;
  console.log(country, "country");
  currentTemperature = Math.floor(forecastData.current.temp_f);
  console.log(currentTemperature, "currentTemperature");
  weatherIcon = forecastData.current.condition.icon;
  iconUrl = `https:${weatherIcon}`;
  console.log(weatherIcon, "weatherIcon");
  weatherMessage = forecastData.current.condition.text;
  console.log(weatherMessage, "weatherMessage");
  maxTemp = Math.floor(forecastData.forecast.forecastday[0].day.maxtemp_f);
  console.log(maxTemp, "maxTemp");
  minTemp = Math.floor(forecastData.forecast.forecastday[0].day.mintemp_f);
  console.log(minTemp, "minTemp");
  precipitation = forecastData.forecast.forecastday[0].day.daily_chance_of_rain;
  console.log(precipitation, "precipitation ");

  // Create the weather data template
  const weatherDataTemplate = `
        <h2 id="cityNameCountry">${cityName}, ${region}</h2>
        <h4 id="cityNameCountry">${country}</h4>
        <p id="currentTemp">Current Temperature: ${currentTemperature}°F</p>
        <img src="${iconUrl}" alt="Weather Icon">
        <p id="textIcon">${weatherMessage}</p>
        <p id="highTemp">Today's High: ${maxTemp}°F</p>
        <p id="lowTemp"> Today's Low: ${minTemp}°F</p>
        <p id="precipitation">Chance of Precipitation: ${precipitation}%</p>
    `;

  console.log(weatherDataTemplate, "weatherDataTemplate");

  // Display the weather data
  afterSearchWeather.innerHTML = weatherDataTemplate;

  // Create and display temperature message element
  const temperatureMessageElement = document.createElement("p");
  if (currentTemperature >= 75) {
    temperatureMessageElement.textContent = "It's Hot Today ☀️🥵🌡 ";
    temperatureMessageElement.classList.add("hot-message");
  } else if (currentTemperature >= 45 && currentTemperature <= 74) {
    temperatureMessageElement.textContent = "It's Moderate Today🌻😎🌡";
    temperatureMessageElement.classList.add("moderate-message");
  } else {
    temperatureMessageElement.textContent = "It's Cold Today ❄️🥶🌡";
    temperatureMessageElement.classList.add("cold-message");
  }
  afterSearchWeather.appendChild(temperatureMessageElement);

  afterSearchWeather.style.display = "block";
}
