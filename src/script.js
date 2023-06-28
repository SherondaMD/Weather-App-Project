//Format Date & Time

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} - ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//Format Location

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = `${cityInput.value}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleCity);

//Format Weather

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let locationTemp = document.querySelector("#temperature");
  locationTemp.innerHTML = `${temperature}`;

  let city = (document.querySelector("#city").innterHTML = response.data.name);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${response.data.name}`;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp) + "°F";

  let description = document.querySelector("#temperature-description");
  description.innerHTML = response.data.weather[0].description;

  let h1 = document.querySelector("#city");
  h1.innerHTML = city;
}
//Format Search Engine Functions

function handleCity(event) {
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  getCity(cityInput.value);
}

function getCity(city) {
  let apiKey = "bc2cd97eaa209e7d22d8f3c84081655f";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

// Format Current Button
function retrievePosition(position) {
  let apiKey = "bc2cd97eaa209e7d22d8f3c84081655f";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

function handleLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("button");
button.addEventListener("click", handleLocation);

// Format Degrees °C to °F
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 99;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 37;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
