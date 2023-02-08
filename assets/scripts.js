var APIKey = "35860f199216a9759f17e01b3000e2e2";
var searchBTN = document.getElementById("search-BTN");

var userInput = document.getElementById("user-input").value; // user's input of city name


// Way to call city (by itself) by using name
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// For example: https://api.openweathermap.org/data/2.5/weather?q=London&appid={API key}
// Take out the bracket!

function getWeatherFrom(cityName){
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName +"&appid=" + APIKey;

    fetch(weatherURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log ("Check the data: " + data);

    });
    console.log(weatherURL);
}


// get current city day

// get 5 more days 

// click action on search
// searchBTN.addEventListener('click', getWeatherFrom(userInput));
getWeatherFrom("London");
