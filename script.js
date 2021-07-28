let preferredUnit = prompt(
  "Would you like to use this app in Celsius or Fahrenheit?"
);
if (preferredUnit !== null) {
  preferredUnit = preferredUnit.toLowerCase();
}
if (preferredUnit === "fahrenheit" || preferredUnit === "f") {
  let fahrenheitCurrentElement = document.querySelector("#current-temperature");
  let fahrenheitCurrentHTML = `<div class="currentTemperature">`;
  fahrenheitCurrentHTML =
    fahrenheitCurrentHTML +
    `
  <img src="http://openweathermap.org/img/wn/02d@2x.png" class="weather-symbol" id="weather-icon" />
    <span id="currentDegrees">66</span
    ><span class="unit"
    ><span id="celsius"> °F</span>
    </span>
`;
  fahrenheitCurrentHTML = fahrenheitCurrentHTML + `</div>`;
  console.log(fahrenheitCurrentElement);
  fahrenheitCurrentElement.innerHTML = fahrenheitCurrentHTML;

  //Forecast week
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }

  function displayForecastWeek(response) {
    let forecast = response.data.daily;
    let forecastWeekElement = document.querySelector("#forecast-week");
    let forecastWeekHTML = `<div class="row">`;

    forecast.forEach(function (forecastDay, index) {
      if (index < 7 && index > 0) {
        forecastWeekHTML =
          forecastWeekHTML +
          `<div class="col-2">
    <div class="weather-forecast-date"><strong>${formatDay(
      forecastDay.dt
    )}</strong></div>
       <img src="http://openweathermap.org/img/wn/${
         forecastDay.weather[0].icon
       }@2x.png" alt="${forecastDay.weather[0].description}" width="42"/>
       <div class="weather-forecast-temperatures">
       <span class="weather-forecast-temperature-max"><strong>${Math.round(
         forecastDay.temp.max
       )}°F</strong></span> /
       <span class="weather-forecast-temperature-min"> ${Math.round(
         forecastDay.temp.min
       )}°F </span>
      </div>
  </div>`;
      }
    });
    forecastWeekHTML = forecastWeekHTML + `</div>`;
    forecastWeekElement.innerHTML = forecastWeekHTML;
  }

  function getForecastWeek(coordinates) {
    let apiKey = "6697611895f9d8bb5ac23403332f6cdd";
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayForecastWeek);
  }

  function formatHour(timestamp) {
    let date = new Date(timestamp * 1000);
    let hour = date.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    return hour;
  }

  function displayForecastHour(response) {
    let forecast = response.data.hourly;
    let forecastHourElement = document.querySelector("#forecast-hours");
    let forecastHourHTML = `<div class="row">`;

    forecast.forEach(function (forecastHour, index) {
      if (index < 7 && index > 0) {
        forecastHourHTML =
          forecastHourHTML +
          `<div class="col-2">
    <div class="weather-forecast-date"><strong>${formatHour(
      forecastHour.dt
    )}:00</strong></div>
       <img src="http://openweathermap.org/img/wn/${
         forecastHour.weather[0].icon
       }@2x.png" alt="${forecastHour.weather[0].description}" width="42"/>
       <div class="weather-forecast-temperatures">
       <span class="weather-forecast-temperature"><strong>${Math.round(
         forecastHour.temp
       )}°F</strong></span>
       </div>
  </div>`;
      }
    });
    forecastHourHTML = forecastHourHTML + `</div>`;
    forecastHourElement.innerHTML = forecastHourHTML;
  }
  function getForecastHour(coordinates) {
    let apiKey = "6697611895f9d8bb5ac23403332f6cdd";
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayForecastHour);
  }

  //Search city
  function showWeather(response) {
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
    getForecastHour(response.data.coord);

    //console.log(response);
    let weatherIconElement = document.querySelector("#weather-icon");
    weatherIconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

    if (`${response.data.weather[0].icon}` === "01d") {
      document.body.style.backgroundImage = "url('./src/sunny.jpg')";
    } else {
      if (`${response.data.weather[0].icon}` === "01n") {
        document.body.style.backgroundImage = "url('./src/clear_night.jpg')";
      } else {
        if (`${response.data.weather[0].icon}` === "02d") {
          document.body.style.backgroundImage = "url('./src/few_clouds.jpg')";
        } else {
          if (
            `${response.data.weather[0].icon}` === "09d" ||
            `${response.data.weather[0].icon}` === "10d"
          ) {
            document.body.style.backgroundImage = "url('./src/rain.jpg')";
          } else {
            if (
              `${response.data.weather[0].icon}` === "09n" ||
              `${response.data.weather[0].icon}` === "10n"
            ) {
              document.body.style.backgroundImage =
                "url('./src/rain_night.jpg')";
            } else {
              if (`${response.data.weather[0].icon}` === "03d") {
                document.body.style.backgroundImage =
                  "url('./src/scattered_clouds.jpg')";
              } else {
                if (`${response.data.weather[0].icon}` === "04d") {
                  document.body.style.backgroundImage =
                    "url('./src/broken_clouds.jpg')";
                } else {
                  if (
                    `${response.data.weather[0].icon}` === "04n" ||
                    `${response.data.weather[0].icon}` === "02n" ||
                    `${response.data.weather[0].icon}` === "03n"
                  ) {
                    document.body.style.backgroundImage =
                      "url('./src/cloudy.jpg')";
                  } else {
                    if (
                      `${response.data.weather[0].icon}` === "13d" ||
                      `${response.data.weather[0].icon}` === "13n"
                    ) {
                      document.body.style.backgroundImage =
                        "url('./src/snow.jpg')";
                    } else {
                      if (
                        `${response.data.weather[0].icon}` === "11d" ||
                        `${response.data.weather[0].icon}` === "11n"
                      ) {
                        document.body.style.backgroundImage =
                          "url('./src/thunder.jpg')";
                      } else {
                        if (
                          `${response.data.weather[0].icon}` === "50d" ||
                          `${response.data.weather[0].icon}` === "50n"
                        ) {
                          document.body.style.backgroundImage =
                            "url('./src/foggy.jpg')";
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
      if (
        `${response.data.wind.deg}` > 23 &&
        `${response.data.wind.deg}` <= 68
      ) {
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
      let units = "imperial";
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
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=moscow&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showWeather);
  }

  let selectMoscow = document.querySelector("#moscow");
  selectMoscow.addEventListener("click", searchMoscow);

  function searchBerlin(event) {
    event.preventDefault();
    let apiKey = "6697611895f9d8bb5ac23403332f6cdd";
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=berlin&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showWeather);
  }

  let selectBerlin = document.querySelector("#berlin");
  selectBerlin.addEventListener("click", searchBerlin);

  function searchLondon(event) {
    event.preventDefault();
    let apiKey = "6697611895f9d8bb5ac23403332f6cdd";
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showWeather);
  }

  let selectLondon = document.querySelector("#london");
  selectLondon.addEventListener("click", searchLondon);

  function searchNewYork(event) {
    event.preventDefault();
    let apiKey = "6697611895f9d8bb5ac23403332f6cdd";
    let units = "imperial";
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
    let units = "imperial";
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
    let units = "imperial";
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
} else {
  if (
    preferredUnit === "celsius" ||
    preferredUnit === "c" ||
    preferredUnit === null
  ) {
    //Forecast week
    function formatDay(timestamp) {
      let date = new Date(timestamp * 1000);
      let day = date.getDay();
      let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
      return days[day];
    }

    function displayForecastWeek(response) {
      let forecast = response.data.daily;
      let forecastWeekElement = document.querySelector("#forecast-week");
      let forecastWeekHTML = `<div class="row">`;

      forecast.forEach(function (forecastDay, index) {
        if (index < 7 && index > 0) {
          forecastWeekHTML =
            forecastWeekHTML +
            `<div class="col-2">
    <div class="weather-forecast-date"><strong>${formatDay(
      forecastDay.dt
    )}</strong></div>
       <img src="http://openweathermap.org/img/wn/${
         forecastDay.weather[0].icon
       }@2x.png" alt="${forecastDay.weather[0].description}" width="42"/>
       <div class="weather-forecast-temperatures">
       <span class="weather-forecast-temperature-max"><strong>${Math.round(
         forecastDay.temp.max
       )}°C</strong></span> /
       <span class="weather-forecast-temperature-min"> ${Math.round(
         forecastDay.temp.min
       )}°C </span>
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

    function formatHour(timestamp) {
      let date = new Date(timestamp * 1000);
      let hour = date.getHours();
      if (hour < 10) {
        hour = `0${hour}`;
      }
      return hour;
    }

    function displayForecastHour(response) {
      let forecast = response.data.hourly;
      let forecastHourElement = document.querySelector("#forecast-hours");
      let forecastHourHTML = `<div class="row">`;

      forecast.forEach(function (forecastHour, index) {
        if (index < 7 && index > 0) {
          forecastHourHTML =
            forecastHourHTML +
            `<div class="col-2">
    <div class="weather-forecast-date"><strong>${formatHour(
      forecastHour.dt
    )}:00</strong></div>
       <img src="http://openweathermap.org/img/wn/${
         forecastHour.weather[0].icon
       }@2x.png" alt="${forecastHour.weather[0].description}" width="42"/>
       <div class="weather-forecast-temperatures">
       <span class="weather-forecast-temperature"><strong>${Math.round(
         forecastHour.temp
       )}°C</strong></span>
       </div>
  </div>`;
        }
      });
      forecastHourHTML = forecastHourHTML + `</div>`;
      forecastHourElement.innerHTML = forecastHourHTML;
    }
    function getForecastHour(coordinates) {
      let apiKey = "6697611895f9d8bb5ac23403332f6cdd";
      let units = "metric";
      let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
      axios.get(apiUrl).then(displayForecastHour);
    }

    //Search city
    function showWeather(response) {
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
      getForecastHour(response.data.coord);

      let weatherIconElement = document.querySelector("#weather-icon");
      weatherIconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );

      if (`${response.data.weather[0].icon}` === "01d") {
        document.body.style.backgroundImage = "url('./src/sunny.jpg')";
      } else {
        if (`${response.data.weather[0].icon}` === "01n") {
          document.body.style.backgroundImage = "url('./src/clear_night.jpg')";
        } else {
          if (`${response.data.weather[0].icon}` === "02d") {
            document.body.style.backgroundImage = "url('./src/few_clouds.jpg')";
          } else {
            if (
              `${response.data.weather[0].icon}` === "09d" ||
              `${response.data.weather[0].icon}` === "10d"
            ) {
              document.body.style.backgroundImage = "url('./src/rain.jpg')";
            } else {
              if (
                `${response.data.weather[0].icon}` === "09n" ||
                `${response.data.weather[0].icon}` === "10n"
              ) {
                document.body.style.backgroundImage =
                  "url('./src/rain_night.jpg')";
              } else {
                if (`${response.data.weather[0].icon}` === "03d") {
                  document.body.style.backgroundImage =
                    "url('./src/scattered_clouds.jpg')";
                } else {
                  if (`${response.data.weather[0].icon}` === "04d") {
                    document.body.style.backgroundImage =
                      "url('./src/broken_clouds.jpg')";
                  } else {
                    if (
                      `${response.data.weather[0].icon}` === "04n" ||
                      `${response.data.weather[0].icon}` === "02n" ||
                      `${response.data.weather[0].icon}` === "03n"
                    ) {
                      document.body.style.backgroundImage =
                        "url('./src/cloudy.jpg')";
                    } else {
                      if (
                        `${response.data.weather[0].icon}` === "13d" ||
                        `${response.data.weather[0].icon}` === "13n"
                      ) {
                        document.body.style.backgroundImage =
                          "url('./src/snow.jpg')";
                      } else {
                        if (
                          `${response.data.weather[0].icon}` === "11d" ||
                          `${response.data.weather[0].icon}` === "11n"
                        ) {
                          document.body.style.backgroundImage =
                            "url('./src/thunder.jpg')";
                        } else {
                          if (
                            `${response.data.weather[0].icon}` === "50d" ||
                            `${response.data.weather[0].icon}` === "50n"
                          ) {
                            document.body.style.backgroundImage =
                              "url('./src/foggy.jpg')";
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
        if (
          `${response.data.wind.deg}` > 23 &&
          `${response.data.wind.deg}` <= 68
        ) {
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
  } else {
    if (preferredUnit === "") {
      alert("Please type 'Celsius' or 'Fahrenheit'.");
      document.location.reload();
    } else {
      alert("Please type 'Celsius' or 'Fahrenheit'.");
      document.location.reload();
    }
  }
}
