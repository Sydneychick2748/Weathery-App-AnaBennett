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
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data, "data");
      displayWeather(data);
    } else {
      console.error("Failed to fetch weather data");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

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
  console.log(weatherIcon, "weatherIcon");
  const weatherMessage = data.current.condition.text;
  console.log(weatherMessage, "weatherMessage");

  const weatherDataTemplate = `
        <h2 id="cityNameCountry">${cityName}, ${country}</h2>
        <p id="currentTemp">Current Temperature: ${currentTemperature}°F</p>
        <p id="highTemp"></p>
        <p id="lowTemp"></p>
        <p id="precipitation"></p>
        <p id="weatherWarningMessage">${weatherIcon}</p>
        <p id="textIcon">${weatherMessage}</p>
    `;

  console.log(weatherDataTemplate, "weatherDataTemplate");

  afterSearchWeather.innerHTML = weatherDataTemplate;

  const temperatureMessageElement = document.createElement("p");
  if (currentTemperature > 75) {
    temperatureMessageElement.textContent = "It's Hot Today!";
  } else if (currentTemperature >= 45 && currentTemperature <= 74) {
    temperatureMessageElement.textContent = "It's Moderate Today!";
  } else {
    temperatureMessageElement.textContent = "It's Cold Today!";
  }
  afterSearchWeather.appendChild(temperatureMessageElement);

  afterSearchWeather.style.display = "block";
}
