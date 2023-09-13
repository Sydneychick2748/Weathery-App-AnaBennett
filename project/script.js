// Keep the same variable and function names
const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");
const afterSearchWeather = document.getElementById("afterSearchWeather");

const API_KEY = "81c688300b9f4a07b49194332231109";

function inputCityName() {
  searchButton.addEventListener("click", function () {
    console.log("Button clicked");
    const cityName = cityInput.value;
    console.log("City Name:", cityName);
    getWeather(cityName);
  });
}

inputCityName();

async function getWeather(cityName) {
  //   try {
  //     // Fetch current weather data
  //     const currentResponse = await fetch(
  //       `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`
  //     );

  //     if (currentResponse.ok) {
  //       const data = await currentResponse.json();
  //       console.log(data, "current data");
  //       displayWeather(data);
  //     } else {
  //       console.error("Failed to fetch current weather data");
  //     }

  // Fetch forecast data from another API
  const forecastResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}`
  );
  console.log(forecastResponse, "forecastResponse ");
  console.log(forecastResponse.status); // Log the HTTP status code
  if (forecastResponse.ok) {
    const data = await forecastResponse.json();
    console.log(data, "forecast data");
    displayWeather(data);
  } else {
    console.error("Failed to fetch weather forecast data");
  }
}
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }

function displayWeather(data) {
  if (!data) {
    return;
  }
  const cityName = data.location.name;
  console.log(cityName, "cityName");
  const country = data.location.country;
  console.log(country, "country");
  const currentTemperature = data.current.temp_f;
  console.log(currentTemperature, "currentTemperature");
  const weatherIcon = data.current.condition.icon;
  const iconUrl = `https:${weatherIcon}`;
  console.log(weatherIcon, "weatherIcon");
  const weatherMessage = data.current.condition.text;
  console.log(weatherMessage, "weatherMessage");
  const maxTemp = data.forecast.forecastday[0].day.maxtemp_f;
  console.log(maxTemp, "maxTemp");
  const minTemp = data.forecast.forecastday[0].day.mintemp_f;
  console.log(minTemp, "minTemp");

  const weatherDataTemplate = `
        <h2 id="cityNameCountry">${cityName}, ${country}</h2>
        <p id="currentTemp">Current Temperature: ${currentTemperature}°F</p>
        <p id="highTemp">Max Temperature: ${maxTemp}°F</p>
        <p id="lowTemp">Min Temperature: ${minTemp}°F</p>
        <p id="precipitation"></p>
        
        <img src="${iconUrl}" alt="Weather Icon">
        <p id="textIcon">${weatherMessage}</p>
    `;

  console.log(weatherDataTemplate, "weatherDataTemplate");

  afterSearchWeather.innerHTML = weatherDataTemplate;

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
