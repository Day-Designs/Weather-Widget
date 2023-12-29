function formatDate(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return "Last updated: " + day + " " + hours + ":" + minutes;
}
let now = new Date();
let heading = document.querySelector("#selected-city-time");
heading.innerHTML = formatDate(now);

function changeFahrenheit(event) {
  let temperatureElement = document.querySelector("#tempeture-converter");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(temperature * 1.8 + 32);
}

let fahrenheit = document.querySelector("#fer");
fahrenheit.addEventListener("click", changeFahrenheit);

function changeCelsius(event) {
  let temperatureElement = document.querySelector("#tempeture-converter");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let celsius = document.querySelector("#cel");
celsius.addEventListener("click", changeCelsius);

function pullWeather(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#city-input").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=f09d3949047ab6c9e3bcaf79cf61f619&units=imperial`;

  axios.get(url).then(showCity);
}

function showCity(response) {
  let cityDisplay = document.querySelector("#selected-city-display");
  cityDisplay.innerHTML = response.data.name;

  let tempCon = document.querySelector("#tempeture-converter");
  tempCon.innerHTML = Math.round(response.data.main.temp);

  let weatherDescription = response.data.weather[0].description;

  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = weatherDescription;

  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = response.data.wind.speed;

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" class="weather-app-icon" />`;
}

function findMe(event) {
  event.preventDefault();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(logCurrentPosition);
  }
  let previousPosition = document.querySelector("#search-label");
  previousPosition.innerHTML = "Search:";
}

function logCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a2dda52dce059eb8a14e95aaa0db6ab7&units=imperial`;
  axios.get(url).then(showCurrentLocationWeather);
}

function showCurrentLocationWeather(response) {
  let cityDisplay = document.querySelector("#selected-city-display");
  cityDisplay.innerHTML = response.data.name;

  let tempCon = document.querySelector("#tempeture-converter");
  tempCon.innerHTML = Math.round(response.data.main.temp);

  let weatherDescription = response.data.weather[0].description;

  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = weatherDescription;

  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = response.data.wind.speed;

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" class="weather-app-icon" />`;
}
let cityInput = document.querySelector("#city-input");
let currentCity = cityInput.value;
let form = document.querySelector("#seach-engine");
form.addEventListener("submit", pullWeather);
let url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=f09d3949047ab6c9e3bcaf79cf61f619&units=imperial`;
let button = document.querySelector("#current-location");
button.addEventListener("click", findMe);
