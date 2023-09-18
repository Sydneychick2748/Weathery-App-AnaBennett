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

// Call the function to register the event listener
inputCityName();

// Function to fetch weather data
async function getWeather(cityName) {
  try {
    const forecastResponse = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=4`
    );
    console.log(forecastResponse, "forecastResponse ");
    console.log(forecastResponse.status); // Log the HTTP status code
    if (forecastResponse.ok) {
      const forecastData = await forecastResponse.json();
      console.log(forecastData, "forecastData");
      displayForecastWeather(forecastData);
    } else {
      console.error("Failed to fetch weather forecast data");
      // Display an error message on the page
      afterSearchWeather.innerHTML =
        "<p>Error: Unable to fetch weather data</p>";
    }
  } catch (error) {
    console.error("An error occurred:", error);
    // Display an error message on the page
    afterSearchWeather.innerHTML = "<p>An error occurred</p>";
  }
}

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

  // Show the weather container when you have the data
  document.getElementById("weatherContainer").style.display = "block";


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
  displayFutureWeather(forecastData);

  afterSearchWeather.style.display = "block";
}

// Function to display future 2-day weather
function displayFutureWeather(forecastData) {
  // Get the next 3 days of weather forecast
  const forecastDays = forecastData.forecast.forecastday;
  const nextThreeDays = forecastDays.slice(1, 4); // Change the slice to get the next 3 days

  // Loop through the next 2 days and display the weather information
  nextThreeDays.forEach((day, index) => {
    const date = new Date(day.date);
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    const averageTemp = Math.floor(day.day.avgtemp_f);

    const maxTemp = Math.floor(day.day.maxtemp_f);
    const minTemp = Math.floor(day.day.mintemp_f);
    const precipitation = day.day.daily_chance_of_rain;

    // Create the template for each day
    const dayTemplate = `
      <div class="future-day">
        <h3>${dayOfWeek}</h3>
        <h3>${averageTemp}°F</h3>
        <p>High: ${maxTemp}°F</p>
        <p>Low: ${minTemp}°F</p>
        <p>Chance of Precipitation: ${precipitation}%</p>
      </div>
    `;
    // Append the day's template to the container
    const dayElement = document
      .createRange()
      .createContextualFragment(dayTemplate);
    dayElement.querySelector(".future-day").classList.add("custom-class"); // Add a custom class
    futureWeatherContainer.appendChild(dayElement);

    // Log the data for each day
    console.log(`Day ${index + 1} (${dayOfWeek}):`);
     console.log(`averageTemp : ${averageTemp}°F`);
    console.log(`High Temperature: ${maxTemp}°F`);
    console.log(`Low Temperature: ${minTemp}°F`);
    console.log(`Chance of Precipitation: ${precipitation}%`);
  });
}
