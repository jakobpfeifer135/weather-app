var APIKey = "f30dc0b71f772a037a522282770190be";
var searchBar = document.querySelector("#search-form");
var cityInput = document.querySelector("#city-input");
var cityContainer = document.querySelector("#cityContainer");
var forecast = document.querySelector("#forecast");
var today = dayjs().format("MMMM DD, YYYY");

searchBar.addEventListener("submit", function (event) {
  event.preventDefault();

  var cityValue = cityInput.value;
  fetchCityData(cityValue);
});

function fetchCityData(city) {
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=imperial";
  cityContainer.innerHTML = "";
  forecast.innerHTML = "";

  // Add a date display to the cityContainer
  var currentDate = dayjs().format("MMMM DD, YYYY");
  var dateDisplay = document.createElement("p");
  dateDisplay.textContent = "Current Date: " + currentDate;
  cityContainer.append(dateDisplay);

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var nameOfCity = document.createElement("h2");
      var wind = document.createElement("h2");
      var humidity = document.createElement("h2");
      var temperature = document.createElement("h2");
      var valueIcon = data.weather[0].icon;
      var icon = "http://openweathermap.org/img/wn/" + valueIcon + ".png";
      var lat = data.coord.lat;
      var lon = data.coord.lon;

      nameOfCity.textContent = data.name;

      cityContainer.append(nameOfCity);
      wind.textContent = "Wind speed: " + data.wind.speed + " MPH";
      cityContainer.append(wind);
      humidity.textContent = "Humidity: " + data.main.humidity + "%";
      cityContainer.append(humidity);
      temperature.textContent = "Temperature: " + data.main.temp + " F";
      cityContainer.append(temperature);
      var cityIcon = document.createElement("img");
      cityIcon.setAttribute("src", icon);
      cityContainer.append(cityIcon);

      var fiveDayUrl =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&exclude={part}&appid=" +
        APIKey +
        "&units=imperial";

      fetch(fiveDayUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (forecastData) {
          console.log(forecastData);
          for (var i = 1; i < 6; i++) {
            var forecastCard = document.createElement("div");
            forecastCard.className = "card col-lg-2 m-2";

            var cardDate = document.createElement("h3");
            cardDate.textContent = dayjs().add(i, "days").format("MMMM DD, YYYY");
            forecastCard.append(cardDate);

            var cardIcon = document.createElement("img");
            var iconCode = forecastData.daily[i].weather[0].icon;
            cardIcon.setAttribute(
              "src",
              "http://openweathermap.org/img/wn/" + iconCode + ".png"
            );
            forecastCard.append(cardIcon);

            var cardTemp = document.createElement("p");
            cardTemp.textContent =
              "Temperature: " + forecastData.daily[i].temp.day + " F";
            forecastCard.append(cardTemp);

            var cardWind = document.createElement("p");
            cardWind.textContent =
              "Wind Speed: " + forecastData.daily[i].wind_speed + " MPH";
            forecastCard.append(cardWind);

            var cardHumidity = document.createElement("p");
            cardHumidity.textContent =
              "Humidity: " + forecastData.daily[i].humidity + "%";
            forecastCard.append(cardHumidity);

            forecast.append(forecastCard);
          }
        })
        .catch(function (error) {
          console.log(
            "An error occurred while fetching weather data: " + error
          );
        });
    });
}
