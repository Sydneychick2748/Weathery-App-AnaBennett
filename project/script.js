const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");

 const API_KEY = "81c688300b9f4a07b49194332231109";
 


function inputCityName() {
  searchButton.addEventListener("click", function () {
    console.log("this is clicked");
    const cityName = cityInput.value;
    console.log("cityName", cityName);
    getWeather(cityName);
  });
}
inputCityName();

async function getWeather(cityName) {
  try {
    // You can use cityName and API_KEY to make an asynchronous API request here
    const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`
    );
    console.log(response, "response")
    const data = await response.json();
    console.log(data, "data")

    const city = data.location.name;
   const country = data.location.country;
   const region = data.location.region;



   
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
