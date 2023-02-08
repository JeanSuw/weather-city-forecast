var APIKey = "35860f199216a9759f17e01b3000e2e2";
var searchBTN = document.getElementById("search-BTN");

var userInput = document.getElementById("user-input").value; // user's input of city name

var cityNameDiv = document.getElementById("city-name");
var todayDate = document.getElementById("today-date");
var todayTemp = document.getElementById("today-temp");
var todayWind = document.getElementById("today-wind");
var todayHumidity = document.getElementById("today-humidity");


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
        //console.log ("Check the data: " + data.main.temp);
        var cityVal = document.createElement('city-name');
        var today = new Date(data.dt*1000);
        var Fahrenheit = document.createElement('today-temp');
        var windSpeed = document.createElement('today-wind');
        var humid = document.createElement('today-humidity');
        
        cityVal.textContent = data.name + " (" + today.toDateString() + ")";
        Fahrenheit.textContent = convertToF(data.main.temp) + " ℉";
        windSpeed.textContent = data.wind.speed + " MPH";
        humid.textContent = data.main.humidity + "%";
        

        cityNameDiv.appendChild(cityVal);
        todayTemp.appendChild(Fahrenheit);
        todayWind.appendChild(windSpeed);
        todayHumidity.appendChild(humid);

    });
    console.log(weatherURL);
}
// ℉=((K-273.15)*1.8)+32
function convertToF(kelvin){
    total = ((kelvin-273.15)*1.8)+32;
    return total.toFixed(2);
}



// get current city day

// get 5 more days 

// click action on search
// searchBTN.addEventListener('click', getWeatherFrom(userInput));
getWeatherFrom("London");
