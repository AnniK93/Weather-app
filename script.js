//Forecast week
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  return days[day];

}

function displayForecastWeek(response){
 let forecast = response.data.daily;
 let forecastWeekElement = document.querySelector("#forecast-week");
 let forecastWeekHTML = `<div class="row">`;
 
forecast.forEach(function(forecastDay, index) {
  if (index < 6) {
 forecastWeekHTML = forecastWeekHTML + 
 `<div class="col-2">
    <div class="weather-forecast-date"><strong>${formatDay(forecastDay.dt)}</strong></div>
       <div class="forecast-icon">🌦</div>
       <div class="weather-forecast-temperatures">
       <span class="weather-forecast-temperature-max"><strong>${Math.round(forecastDay.temp.max)}°C</strong></span> /
       <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}°C </span>
      </div>
  </div>`;
}
});
forecastWeekHTML = forecastWeekHTML + `</div>`;
forecastWeekElement.innerHTML = forecastWeekHTML; 
}


function getForecastWeek(coordinates) {
let apiKey = "6697611895f9d8bb5ac23403332f6cdd";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(displayForecastWeek);
}

//Search city
function showWeather(response) {
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let h1Element = document.querySelector("h1");
  h1Element.innerHTML = `${response.data.name}`;

  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(celsiusTemperature);
  let tempElement = document.querySelector("#currentDegrees");
  tempElement.innerHTML = `${temperature}`;

  let weatherDescription = `${response.data.weather[0].description}`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${weatherDescription}`;

  getForecastWeek(response.data.coord);

  let weatherIconElement = document.querySelector("#weather-icon");

  if (`${response.data.weather[0].icon}` === "01d") {
    weatherIconElement.innerHTML = "☀";
    document.body.style.backgroundImage = "url('./src/sunny.jpg')";
  } else {
    if (`${response.data.weather[0].icon}` === "01n") {
      weatherIconElement.innerHTML = "🌙";
      document.body.style.backgroundImage = "url('./src/clear_night.jpg')";
    } else {
      if (`${response.data.weather[0].icon}` === "02d") {
        weatherIconElement.innerHTML = "🌤";
        document.body.style.backgroundImage = "url('./src/few_clouds.jpg')";
      } else {
        if (
          `${response.data.weather[0].icon}` === "09d"
        ) {
          weatherIconElement.innerHTML = "🌧";
          document.body.style.backgroundImage = "url('./src/rain.jpg')";
        } else {
        if (
          `${response.data.weather[0].icon}` === "09n" ||
          `${response.data.weather[0].icon}` === "10n"
        ) {
          weatherIconElement.innerHTML = "🌧";
          document.body.style.backgroundImage = "url('./src/rain_night.jpg')";
        } else {
          if (`${response.data.weather[0].icon}` === "10d") {
            weatherIconElement.innerHTML = "🌦";
            document.body.style.backgroundImage = "url('./src/rain.jpg')";
          } else {
            if (`${response.data.weather[0].icon}` === "03d") {
              weatherIconElement.innerHTML = "⛅️";
              document.body.style.backgroundImage = "url('./src/scattered_clouds.jpg')";
            } else {
              if (
                `${response.data.weather[0].icon}` === "04d"
              ) {
                weatherIconElement.innerHTML = "☁️";
                document.body.style.backgroundImage = "url('./src/broken_clouds.jpg')";
              } else {
              if (
                `${response.data.weather[0].icon}` === "04n" ||
                `${response.data.weather[0].icon}` === "02n" ||
                `${response.data.weather[0].icon}` === "03n"
              ) {
                weatherIconElement.innerHTML = "☁️";
                document.body.style.backgroundImage = "url('./src/cloudy.jpg')";
              } else {
                if (
                  `${response.data.weather[0].icon}` === "13d" ||
                  `${response.data.weather[0].icon}` === "13n"
                ) {
                  weatherIconElement.innerHTML = "🌨";
                  document.body.style.backgroundImage = "url('./src/snow.jpg')";
                } else {
                  if (
                    `${response.data.weather[0].icon}` === "11d" ||
                    `${response.data.weather[0].icon}` === "11n"
                  ) {
                    weatherIconElement.innerHTML = "⛈";
                    document.body.style.backgroundImage = "url('./src/thunder.jpg')";
                  } else {
                    if (
                      `${response.data.weather[0].icon}` === "50d" ||
                      `${response.data.weather[0].icon}` === "50n"
                    ) {
                      weatherIconElement.innerHTML = "🌫";
                      document.body.style.backgroundImage = "url('./src/foggy.jpg')";
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
}

  let humidity = `${response.data.main.humidity}`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;

  let windSpeed = `${response.data.wind.speed}`;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `Wind: ${windSpeed}m/sec`;

  let windDegreeElement = document.querySelector("#wind-icon");

  if (
    (`${response.data.wind.deg}` >= 337 &&
      `${response.data.wind.deg}` <= 360) ||
    (`${response.data.wind.deg}` >= 0 && `${response.data.wind.deg}` <= 23)
  ) {
    windDegreeElement.innerHTML = "⬇️";
  } else {
    if (`${response.data.wind.deg}` > 23 && `${response.data.wind.deg}` <= 68) {
      windDegreeElement.innerHTML = "↙️";
    } else {
      if (
        `${response.data.wind.deg}` > 68 &&
        `${response.data.wind.deg}` <= 113
      ) {
        windDegreeElement.innerHTML = "⬅️";
      } else {
        if (
          `${response.data.wind.deg}` > 113 &&
          `${response.data.wind.deg}` <= 158
        ) {
          windDegreeElement.innerHTML = "↖️";
        } else {
          if (
            `${response.data.wind.deg}` > 158 &&
            `${response.data.wind.deg}` <= 203
          ) {
            windDegreeElement.innerHTML = "⬆️";
          } else {
            if (
              `${response.data.wind.deg}` > 203 &&
              `${response.data.wind.deg}` <= 248
            ) {
              windDegreeElement.innerHTML = "↗️";
            } else {
              if (
                `${response.data.wind.deg}` > 248 &&
                `${response.data.wind.deg}` <= 293
              ) {
                windDegreeElement.innerHTML = "➡️";
              } else {
                windDegreeElement.innerHTML = "↘️";
              }
            }
          }
        }
      }
    }
  }
}

function searchCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#searchCity");

  if (cityName.value) {
    let apiKey = "6697611895f9d8bb5ac23403332f6cdd";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showWeather);
  } else {
    alert("Type name of city");
  }
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

//Select City

function searchMoscow(event) {
  event.preventDefault();
  let apiKey = "6697611895f9d8bb5ac23403332f6cdd";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=moscow&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

let selectMoscow = document.querySelector("#moscow");
selectMoscow.addEventListener("click", searchMoscow);

function searchBerlin(event) {
  event.preventDefault();
  let apiKey = "6697611895f9d8bb5ac23403332f6cdd";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=berlin&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

let selectBerlin = document.querySelector("#berlin");
selectBerlin.addEventListener("click", searchBerlin);

function searchLondon(event) {
  event.preventDefault();
  let apiKey = "6697611895f9d8bb5ac23403332f6cdd";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

let selectLondon = document.querySelector("#london");
selectLondon.addEventListener("click", searchLondon);

function searchNewYork(event) {
  event.preventDefault();
  let apiKey = "6697611895f9d8bb5ac23403332f6cdd";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=new+york&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

let selectNewYork = document.querySelector("#new-york");
selectNewYork.addEventListener("click", searchNewYork);

//Current location

function handlePosition(position) {
  console.log(position);
  let lat = `${position.coords.latitude}`;
  let lon = `${position.coords.longitude}`;
  let apiKey = "6697611895f9d8bb5ac23403332f6cdd";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function searchCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let buttonCurrentLocation = document.querySelector("#current-location");
buttonCurrentLocation.addEventListener("click", searchCurrentLocation);
//Random location

let cityArray = [
  "Hongkong",
  "Kuala Lumpur",
  "Pune",
  "Berlin",
  "Paris",
  "Rome",
  "Bangkok",
  "Antananarivo",
  "Cairo",
  "Madrid",
  "Lima",
  "Beijing",
  "Tokyo",
  "Sydney",
  "Wellington",
  "Cardiff",
  "Delhi",
  "Caracas",
  "Vilnius",
  "Minsk",
  "Lomé",
  "Ouagadougou",
  "Kaunas",
  "Montreal",
  "Sherbrooke",
  "Calgary",
  "Louisiana",
  "Chicago",
  "Brasilia",
  "Lisbon",
  "Riga",
  "Stockholm",
  "Helsinki",
  "Singapore",
  "New York",
  "Los Angeles",
  "San Francisco",
  "Mexico City",
  "Taipeh",
  "Adelaide",
  "Brighton",
  "Dortmund",
  "Dijon",
  "Montpellier",
  "Barcelona",
  "Canberra",
  "Kabul",
  "Tirana",
  "Dhaka",
  "Brussels",
  "Vienna",
  "Munich",
  "Buenos Aires",
  "Baku",
  "Sarajevo",
  "Sofia",
  "Yaoundé",
  "Kinshasa",
  "Ottawa",
  "Phnom Penh",
  "Havana",
  "Quito",
  "Tallinn",
  "Addis Ababa",
  "Libreville",
  "Tbilisi",
  "Accra",
  "Athens",
  "Budapest",
  "Reykjavik",
  "Jakarta",
  "Nairobi",
  "Bishkek",
  "Tripoli",
  "Valletta",
  "Monaco",
  "Windhoek",
  "Cape Town",
  "Pyongyang",
  "Belfast",
  "Oslo",
  "Muscat",
  "Islamabad",
  "Doha",
  "Riyadh",
  "Mogadishu",
  "Seoul",
  "Nuuk",
  "Bern",
  "Zurich",
  "Damascus",
  "Jerusalem",
  "Ankara",
  "Montevideo",
  "Vatican City",
  "Hanoi",
  "Lusaka",
];

function searchRandomLocation(event) {
  event.preventDefault();
  let randomCity = cityArray[Math.floor(Math.random() * cityArray.length)];
  let apiKey = "6697611895f9d8bb5ac23403332f6cdd";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${randomCity}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

let buttonRandomLocation = document.querySelector("#random-location");
buttonRandomLocation.addEventListener("click", searchRandomLocation);




//Day & time
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = now.getDay();
let currentDay = days[now.getDay()];
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let currentTime = `${hours}:${minutes}`;

let element = document.querySelector("#currentTime");
element.innerHTML = `${currentDay} ${currentTime}`;

//Temperature Celsius -> Fahrenheit -> Celsius
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#currentDegrees");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 +32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
 event.preventDefault();
 fahrenheitLink.classList.remove("active");
 celsiusLink.classList.add("active");
 let temperatureElement = document.querySelector("#currentDegrees");
temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//The next 24 hours

hours = now.getHours();

//+3
let currentPlusThree = `${hours + 3}`;

function formatTimePlusThree() {
  if (currentPlusThree > 23) {
    return (formattedPlusThree = `${currentPlusThree - 24}`);
  } else {
    return (formattedPlusThree = `${currentPlusThree}`);
  }
}
formatTimePlusThree();

function addZerotoCurrentPlusThree() {
  if (formattedPlusThree < 10) {
    formattedPlusThree = "0" + formattedPlusThree;
  }
  return formattedPlusThree;
}

addZerotoCurrentPlusThree();

let plusThreeHours = document.querySelector("#plusThreeHours");
plusThreeHours.innerHTML = `${formattedPlusThree}:00`;

//+6
let currentPlusSix = `${hours + 6}`;

function formatTimePlusSix() {
  if (currentPlusSix > 23) {
    return (formattedPlusSix = `${currentPlusSix - 24}`);
  } else {
    return (formattedPlusSix = `${currentPlusSix}`);
  }
}
formatTimePlusSix();

function addZerotoCurrentPlusSix() {
  if (formattedPlusSix < 10) {
    formattedPlusSix = "0" + formattedPlusSix;
  }
  return formattedPlusSix;
}

addZerotoCurrentPlusSix();

let plusSixHours = document.querySelector("#plusSixHours");
plusSixHours.innerHTML = `${formattedPlusSix}:00`;

//+9
let currentPlusNine = `${hours + 9}`;

function formatTimePlusNine() {
  if (currentPlusNine > 23) {
    return (formattedPlusNine = `${currentPlusNine - 24}`);
  } else {
    return (formattedPlusNine = `${currentPlusNine}`);
  }
}
formatTimePlusNine();

function addZerotoCurrentPlusNine() {
  if (formattedPlusNine < 10) {
    formattedPlusNine = "0" + formattedPlusNine;
  }
  return formattedPlusNine;
}

addZerotoCurrentPlusNine();

let plusNineHours = document.querySelector("#plusNineHours");
plusNineHours.innerHTML = `${formattedPlusNine}:00`;

//+12
let currentPlusTwelve = `${hours + 12}`;

function formatTimePlusTwelve() {
  if (currentPlusTwelve > 23) {
    return (formattedPlusTwelve = `${currentPlusTwelve - 24}`);
  } else {
    return (formattedPlusTwelve = `${currentPlusTwelve}`);
  }
}
formatTimePlusTwelve();

function addZerotoCurrentPlusTwelve() {
  if (formattedPlusTwelve < 10) {
    formattedPlusTwelve = "0" + formattedPlusTwelve;
  }
  return formattedPlusTwelve;
}

addZerotoCurrentPlusTwelve();

let plusTwelveHours = document.querySelector("#plusTwelveHours");
plusTwelveHours.innerHTML = `${formattedPlusTwelve}:00`;
//+15
let currentPlusFifteen = `${hours + 15}`;

function formatTimePlusFifteen() {
  if (currentPlusFifteen > 23) {
    return (formattedPlusFifteen = `${currentPlusFifteen - 24}`);
  } else {
    return (formattedPlusFifteen = `${currentPlusFifteen}`);
  }
}
formatTimePlusFifteen();

function addZerotoCurrentPlusFifteen() {
  if (formattedPlusFifteen < 10) {
    formattedPlusFifteen = "0" + formattedPlusFifteen;
  }
  return formattedPlusFifteen;
}

addZerotoCurrentPlusFifteen();

let plusFifteenHours = document.querySelector("#plusFifteenHours");
plusFifteenHours.innerHTML = `${formattedPlusFifteen}:00`;

//+18
let currentPlusEighteen = `${hours + 18}`;

function formatTimePlusEighteen() {
  if (currentPlusEighteen > 23) {
    return (formattedPlusEighteen = `${currentPlusEighteen - 24}`);
  } else {
    return (formattedPlusEighteen = `${currentPlusEighteen}`);
  }
}
formatTimePlusEighteen();

function addZerotoCurrentPlusEighteen() {
  if (formattedPlusEighteen < 10) {
    formattedPlusEighteen = "0" + formattedPlusEighteen;
  }
  return formattedPlusEighteen;
}

addZerotoCurrentPlusEighteen();
let plusEighteenHours = document.querySelector("#plusEighteenHours");
plusEighteenHours.innerHTML = `${formattedPlusEighteen}:00`;

