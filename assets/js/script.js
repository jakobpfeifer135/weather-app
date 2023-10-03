
var APIKey = "184e02df0f0a7ee566582a1603acf7a6";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + inputField + "&appid=" + APIKey;
var searchBar = document.querySelector("#search-form");

var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";

searchCity.addEventListener('click', function(event) {
    event.preventDefault();
    var searchBar = document.querySelector('#search-input').value ?? '';
    
    // variable for api needs to be in search bar
    fetch('https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}')
    .then(function (data) {
       var weatherInfo = data.json();
       weatherInfo.then(res => {
        var main = res;
        console.log(res)
       })
      })
      .catch(function (error) {
        console.log(error);
      });
});


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