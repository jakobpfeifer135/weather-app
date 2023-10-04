//all global variables
var APIKey = "f30dc0b71f772a037a522282770190be";
var searchBar = document.querySelector("#search-form");
var cityInput = document.querySelector("#city-input");
var cityContainer = document.querySelector("#cityContainer");
var forecast = document.querySelector("#forecast");
var today = dayjs().format("MMMM DD, YYYY");
//listens for clicks or enters on the search bar element
searchBar.addEventListener("submit", function (event) {
  event.preventDefault();
//pulls the users input and sets it as a usable variable
  var cityValue = cityInput.value;
  fetchCityData(cityValue);
});
//fetching the data from the city input value as in which city was asked for
function fetchCityData(city) {
    forecast.innerHTML = "";
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=imperial";
  cityContainer.innerHTML = "";
 

  // Adding a date display to the cityContainer
  var currentDate = dayjs().format("MMMM DD, YYYY");
  var dateDisplay = document.createElement("p");
  dateDisplay.textContent = "Current Date: " + currentDate;
  cityContainer.append(dateDisplay);
// a list of variables fetching each key piece of data such as temp and so forth
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
        //appending all of the data to the current date card
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
        //pulls the lat and lon from previous fetch to supply the real time data
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
          //pulling the additional 5 days of data and adding to the page
          for (var i = 1; i < 6; i++) {
            var forecastCard = document.createElement("div");
            forecastCard.className = "card col-lg-2 m-2";

            var cardDate = document.createElement("h3");
            cardDate.textContent = dayjs().add(i, "days").format("MMMM DD, YYYY");
            forecastCard.append(cardDate);
            // uses the icon png to add it to the page
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
        //throws a console error if a bad input occurs
        .catch(function (error) {
          console.log(
            "An error occurred while fetching weather data: " + error
          );
        });
        //start of local storage coding
        function saveCityToLocalStorage(city) {
            // Get the current list of saved cities from local storage
            var savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
            
            // Check if the city is not already in the list before adding it
            if (!savedCities.includes(city)) {
                savedCities.push(city);
            }
        
            // Save the updated list back to local storage
            localStorage.setItem("savedCities", JSON.stringify(savedCities));

        }
        searchBar.addEventListener("submit", function (event) {
            event.preventDefault();
        
            var cityValue = cityInput.value;
            fetchCityData(cityValue);
        
            // Save the entered city to local storage
            saveCityToLocalStorage(cityValue);
        });
        function displaySavedCities() {
            var savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
        
            var historyContainer = document.querySelector("#History");
            historyContainer.innerHTML = "";
        
            savedCities.forEach(function (city) {
                var cityButton = document.createElement("button");
                cityButton.textContent = city;
                cityButton.classList.add("btn", "btn-primary", "mb-2");
        
                // Add an event listener to the city button to fetch weather data when clicked
                cityButton.addEventListener("click", function () {
                    fetchCityData(city);
                });
        
                historyContainer.appendChild(cityButton);
            });
        }
        
        // display saved cities when the page loads
        displaySavedCities();
    });
}
