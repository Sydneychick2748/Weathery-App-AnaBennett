// HTML elements
const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");

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
    cityInput.value = "";
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

    const forecastData = await forecastResponse.json();
    console.log(forecastData, "forecastData");

    displayForecastWeather(forecastData);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Function to display forecast weather
function displayForecastWeather(forecastData) {
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

  const afterSearchWeather = document.getElementById("afterSearchWeather");
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
  // Split the input date string into an array using "-" as the separator
  const parts = dateStr.split("-");

  // Extract the year, convert it to an integer in base 10
  const year = parseInt(parts[0], 10);

  // Extract the month, subtract 1 because months are zero-based (0 = January)
  const month = parseInt(parts[1], 10) - 1;

  // Extract the day of the month
  const day = parseInt(parts[2], 10);

  // Create a Date object based on the extracted year, month, and day
  const dateObj = new Date(year, month, day);

  // Use the Date object to get the full day of the week name (e.g., "Monday")
  const dayOfWeek = dateObj.toLocaleDateString(undefined, { weekday: "long" });

  // Return the calculated day of the week
  return dayOfWeek;
}

// Function to display future 3-day weather
function displayFutureWeather(forecastData) {
  // Get the next 3 days of weather forecast
  const forecastDays = forecastData.forecast.forecastday;
  console.log(forecastDays, "forecastDays"); // This is an array of the forecast days

  // Select the container where we'll display the weather information
  const futureWeatherContainer = document.getElementById(
    "futureWeatherContainer"
  );
  // Clear the previous contents of futureWeatherContainer
  futureWeatherContainer.innerHTML = "";

  // Loop through the forecast days again to display the weather information
  forecastDays.forEach((day) => {
    // Extract the date and get the day of the week
    const dateStr = day.date;
    console.log(dateStr, "dateStr "); //gets you the dates

    //this is making variable and getting the function for making a date and passing it to the variable to use in the template
    const dayOfWeek = getDayOfWeek(dateStr);

    // Extract the maximum and minimum temperatures for the day used the global variables
    maxTemp = Math.floor(day.day.maxtemp_f);
    minTemp = Math.floor(day.day.mintemp_f);
    precipitation = day.day.daily_chance_of_rain;

    const dayElement = document.createElement("div");
    dayElement.classList.add("future-day");

    dayElement.innerHTML = `
    <h3>${dayOfWeek}</h3>
    <h3>${maxTemp}°F</h3>
    <p>High: ${maxTemp}°F</p>
    <p>Low: ${minTemp}°F</p>
    <p>Chance of Precipitation: ${precipitation}%</p>
  `;

    // Append the day's template to the container
    futureWeatherContainer.appendChild(dayElement);
  });

  // Initialize variables to keep track of the hottest day
  let hottestDayIndex = 0; // made this a global to access it for the display
  let hottestTemperature = Math.floor(forecastDays[0].day.maxtemp_f); //this is the temp for the first day in the array

  // Loop through the forecast days to find the hottest day
  forecastDays.forEach((day, index) => {
    const highOfTheDay = Math.floor(day.day.maxtemp_f);
    console.log(highOfTheDay, "highOfTheDay"); //these are all the highs of the days

    // Check if the current day is hotter than the previously recorded hottest day can use the reduce method but this made more sense to me
    if (highOfTheDay > hottestTemperature) {
      hottestDayIndex = index; // using the index in the foreach look to find each hot day using it like a key as persay
      hottestTemperature = highOfTheDay; // when you find the day that is hotter than the first in the array it will update to the hights of the day
    }
    console.log(hottestTemperature, "hottestTemperature ");
  });

  // Use hottestDayIndex to identify the hottest day
  const hottestDay = forecastDays[hottestDayIndex]; // Get the hottest day from the forecastDays array
  console.log(hottestDayIndex, "hottestDayIndex");

  const hottestDate = hottestDay.date; // Get the date of the hottest day
  console.log(hottestDate, "hottestDate");
  hottestTemperature = Math.floor(hottestDay.day.maxtemp_f); // Get the temperature of the hottest day in the api data

  // Get the day of the week for the hottest date
  const hottestDayOfWeek = getDayOfWeek(hottestDate); // Use the getDayOfWeek function to determine the day of the week

  // Display the hottest day of the week and temperature
  const displayHottestDay = document.getElementById("displayHottestDay");

  displayHottestDay.textContent = `The hottest day of the week is ${hottestDayOfWeek} with a high of ${hottestTemperature}°F`;
}
