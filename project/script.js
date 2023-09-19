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

    // Clear the input field after the search button is clicked
    cityInput.value = ""; // Set the value to an empty string
  });
}

// Call the function to register the event listener
inputCityName();

// Function to fetch weather data
async function getWeather(cityName) {
  try {
    const forecastResponse = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=3`
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

// const customDateLabels = ["Today", "Tomorrow", "Day After Tomorrow"];
// // Function to display future 3-day weather
// function displayFutureWeather(forecastData) {
//   // Get the next 3 days of weather forecast
//   const forecastDays = forecastData.forecast.forecastday;

//   // Select the container where we'll display the weather information
//   const futureWeatherContainer = document.getElementById(
//     "futureWeatherContainer"
//   );

//   // Loop through the next 3 days and display the weather information
//   forecastDays.forEach((day, index) => {
//     // Get the custom label for the date based on the index
//     const customLabel = customDateLabels[index];

//     const highOfTheDay = Math.floor(day.day.maxtemp_f);
//     const maxTemp = Math.floor(day.day.maxtemp_f);
//     const minTemp = Math.floor(day.day.mintemp_f);
//     const precipitation = day.day.daily_chance_of_rain;

//     // Create the template for each day
//     const dayElement = document.createElement("div");
//     dayElement.classList.add("future-day");
//     dayElement.innerHTML = `
//       <h3>${customLabel}</h3>
//       <h3>${highOfTheDay}°F</h3>
//       <p>High: ${maxTemp}°F</p>
//       <p>Low: ${minTemp}°F</p>
//       <p>Chance of Precipitation: ${precipitation}%</p>
//     `;

//     // Append the day's template to the container
//     futureWeatherContainer.appendChild(dayElement);
//   });
// }
function getDayOfWeek(dateStr) {
  const parts = dateStr.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Months are zero-based (0 = January)
  const day = parseInt(parts[2], 10);

  const dateObj = new Date(year, month, day);
  const dayOfWeek = dateObj.toLocaleDateString(undefined, { weekday: "long" });

  return dayOfWeek;
}
// Function to display future 3-day weather
function displayFutureWeather(forecastData) {
  // Get the next 3 days of weather forecast
  const forecastDays = forecastData.forecast.forecastday;

  // Select the container where we'll display the weather information
  const futureWeatherContainer = document.getElementById(
    "futureWeatherContainer"
  );

  // Clear the previous contents of futureWeatherContainer
  futureWeatherContainer.innerHTML = "";

  // Initialize variables to keep track of the hottest day
  let hottestDayIndex = 0;
  let hottestTemperature = Math.floor(forecastDays[0].day.maxtemp_f);

  // Loop through the next 3 days and display the weather information
  forecastDays.forEach((day, index) => {
    const highOfTheDay = Math.floor(day.day.maxtemp_f);

    // Check if the current day is hotter than the previously recorded hottest day
    if (highOfTheDay > hottestTemperature) {
      hottestDayIndex = index;
      hottestTemperature = highOfTheDay;
    }

    const dateStr = day.date;
    const dayOfWeek = getDayOfWeek(dateStr);

    const maxTemp = Math.floor(day.day.maxtemp_f);
    const minTemp = Math.floor(day.day.mintemp_f);
    const precipitation = day.day.daily_chance_of_rain;

    // Create the template for each day
    const dayElement = document.createElement("div");
    dayElement.classList.add("future-day");
    dayElement.innerHTML = `
      <h3>${dayOfWeek}</h3>
      <h3>${highOfTheDay}°F</h3>
      <p>High: ${maxTemp}°F</p>
      <p>Low: ${minTemp}°F</p>
      <p>Chance of Precipitation: ${precipitation}%</p>
    `;

    // Append the day's template to the container
    futureWeatherContainer.appendChild(dayElement);
  });

  // Use hottestDayIndex to identify the hottest day
  const hottestDay = forecastDays[hottestDayIndex];
  const hottestDate = hottestDay.date;
  hottestTemperature = Math.floor(hottestDay.day.maxtemp_f);

  // Get the day of the week for the hottest date
  const hottestDayOfWeek = getDayOfWeek(hottestDate);

  // Display the hottest day of the week and temperature
  const displayHottestDay = document.getElementById("displayHottestDay");
  displayHottestDay.textContent = `The hottest day of the week is ${hottestDayOfWeek} with a high of ${hottestTemperature}°F`;
}
