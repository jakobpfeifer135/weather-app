
var APIKey = "f30dc0b71f772a037a522282770190be";
var searchBar = document.querySelector("#search-form");
var cityInput = document.querySelector("#city-input")
var cityContainer = document.querySelector("#cityContainer")
var forecast = document.querySelector("#forecast")
var today = dayjs().format("MM/DD/YYYY")

searchBar.addEventListener("submit", function (event) {
    event.preventDefault();
    // var inputField = searchBar.querySelector("input[type='text']");
    // var city;
    // Update the queryURL with the user's input

    var cityValue = cityInput.value
    fetchCityData(cityValue)
});


function fetchCityData(city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    cityContainer.innerHTML = "";
    forecast.innerHTML = "";
    // Fetch the weather data for the user's input city
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
            cityContainer.append(nameOfCity)
            wind.textContent = data.wind.speed;
            cityContainer.append(wind)
            humidity.textContent = data.main.humidity;
            cityContainer.append(humidity)
            temperature.textContent = data.main.temp;
            cityContainer.append(temperature)
            var cityIcon = document.createElement("img")
            cityIcon.setAttribute("src", icon)
            cityContainer.append(cityIcon)
            //cityIcon.classlist.add("")

            // Handle the weather data here, for example:
            var fiveDayUrl= "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=" + APIKey + "&units=imperial";
            // var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";
            

            fetch(fiveDayUrl)
            .then(function(response){
                return response.json()
            })
            .then (function(forecastData){
                console.log(forecastData);
                for (var i = 0; i < 6; i++){
                    var fiveDayForecastDate = document.createElement("h3")
                    fiveDayForecastDate.textContent = dayjs().add(i,"days").format("DD/MM/YYYY")
                    forecast.append(fiveDayForecastDate);
                    var fiveDayTemp = document.createElement("h3")
                    fiveDayTemp = ;

                }
            })







            console.log("Weather data for " + city + ":");
            console.log(data);
        })
        .catch(function (error) {
            console.log("An error occurred while fetching weather data: " + error);
        });
}


//TODO MAJOR IMPLEMENTATIONS....

//TODO implement a search bar

//TODO add a form input otherwise known as search-bar that saves its users input in local storage and appends the name to the page under history

//TODO display current and future weather conditions

//TODO when we search for a city it displays: the cities name, the date, a corresponding icon for the weather, the temperature, wind speeds and humidity for the respective city

//TODO when our city has been selected display a 5 day forecast

//TODO when i click on each city saved in my history section it will display that cities information instead

//~ MINOR IMPLEMENTATIONS

//~ get bootstrap up and operational

//~ get css updated to update user interface

//~ get html's code from div's to semantic structure because of bootstrap

//~ get javascript var's that correspond to given class's and id's in html

//~ implement the weather api into our js and log its values

//~ link the search bar to local storage, and set/get/append to page with weather api

//~ add a dayjs into code to allow for time and date to be applied to the page use an interval to update in real time

//~  connect my current city box to match the selected city



// Create an HTML form with an input field and a submit button.
// Use JavaScript to handle form submission and retrieve the user's input.
// Store the user's input in local storage.
// Append the user's input (city name) to the history section on the page.