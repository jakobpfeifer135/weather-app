
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
            wind.textContent = "Wind speed: " + data.wind.speed + " MPH";
            cityContainer.append(wind)
            humidity.textContent = "Humidity: " + data.main.humidity + "%";
            cityContainer.append(humidity)
            temperature.textContent = "temperature: " + data.main.temp + " F";
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
                for (var i = 0; i < 5; i++){
                    
                    var fiveDayForecastDate = document.createElement("h3")
                    fiveDayForecastDate.textContent = dayjs().add(i,"days").format("DD/MM/YYYY")
                    forecast.append(fiveDayForecastDate);
                    var fiveDayTemp = document.createElement("h4")
                    fiveDayTemp = forecastData.daily[i].temp.day;
                    forecast.append(fiveDayTemp);
                    var fiveDayWind = document.createElement("h4")
                    fiveDayWind = forecastData.daily[i].wind_speed;
                    forecast.append(fiveDayWind);
                    var fiveDayHumidity = document.createElement("h4");
                    fiveDayHumidity = forecastData.daily[i].humidity;
                    forecast.append(fiveDayHumidity);
                   

                }
            })

            console.log("Weather data for " + city + ":");
            console.log(data);
        })
        .catch(function (error) {
            console.log("An error occurred while fetching weather data: " + error);
        });
}


