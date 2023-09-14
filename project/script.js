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

    // lets get the date for the api
    // Define the number of days in the future you want to retrieve
    const numberOfDays = 2;

    // Create an array to store the dates
    const futureDates = [];

    // Get the current date and time
    const currentDate = new Date();
    console.log(currentDate, "currentDate");

    for (let i = 1; i <= numberOfDays; i++) {
      // Clone the current date to futureDate
      const futureDate = new Date(currentDate);

      // Calculate the future date by adding 'i' days to futureDate
      futureDate.setDate(futureDate.getDate() + i);

      // Format the date to YYYY-MM-DD
      const formattedFutureDate = futureDate.toISOString().split("T")[0];
      console.log(formattedFutureDate, "formattedFutureDate");

      // Push the formatted future date to the futureDates array
      futureDates.push(formattedFutureDate);

      // Fetch weather data for each future date using forEach
      try {
        const futureResponse = await fetch(
          `https://api.weatherapi.com/v1/future.json?key=${API_KEY}&q=${cityName}&dt=${formattedFutureDate}`
        );
        console.log(
          `URL for future weather data: https://api.weatherapi.com/v1/future.json?key=${API_KEY}&q=${cityName}&dt=${formattedFutureDate}`
        );

        console.log(futureResponse, "futureResponse ");
        console.log(futureResponse.status); // Log the HTTP status code
        if (futureResponse.ok) {
          const futureData = await futureResponse.json();
          console.log(futureData, "futureData");
          displayFutureWeather(futureData);
        } else {
          console.error("Failed to fetch future 2-day forecast data");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
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

// Function to display future 2-day weather
function displayFutureWeather(futureData) {
  // Access and display the data for the next 2 days from futureData
  // You can format the display as per your requirements
  console.log("Future 2-Day Forecast Data:", futureData);
}
