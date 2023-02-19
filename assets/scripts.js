var APIKey = "35860f199216a9759f17e01b3000e2e2";
var searchBTN = document.getElementById("search-BTN");
var historyDiv = document.querySelector("#weatherHistoryBTN");

var userInput = document.getElementById("user-input"); // user's input of city name
var weatherList = [];
var forecastList = [];

function switchDiv(divVal){
    switch (divVal){
        case 7: // 8th hours
            return $('#date-1');
        case 15: // 16th hours
            return $('#date-2');
        case 23: // 24th hours
            return $('#date-3');
        case 31: // 32th hours
            return $('#date-4');
        case 39: // 40th hours
            return $('#date-5');
        case -1:
            break;
    }
}

function forecast(dataVal){
    var currentDate, currentDiv, dateList, temperature,currentWind;
    for (var h = 7; h < dataVal.list.length; h += 8){
        forecastList.push(dataVal);
        localStorage.setItem("forecastList", JSON.stringify(forecastList));
        dateList = dataVal.list[h];
        
        currentDate = new Date (dateList.dt * 1000);
        
        temperature = dateList.main.temp;
        currentWind = dateList.wind.speed;
        currentHumid = dateList.main.humidity;
        
        currentDiv = switchDiv(h);
        
        currentDiv.append(
            "<p>" +currentDate.toDateString() +"<br>"+"Temp: "+  convertToF(temperature) + " ℉" 
            + "<br>Wind: " + currentWind + "MPH<br>Humidity: " + currentHumid + "%</p>"
        );
    }
}

// Get current weather and the forecast
function getWeatherFrom(cityName){
    
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName +"&appid=" + APIKey;
    weatherList.push(cityName);

    localStorage.setItem("weatherList", JSON.stringify(weatherList));
    fetch(weatherURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // get current city day
        var today = new Date(data.dt*1000);
        var temperature = data.main.temp;
        var windVal = data.wind.speed;
        var humidVal = data.main.humidity;

        $('#city-name').append(
            "<p>" + data.name + " (" +today.toDateString() +")<br>"+"Temp: "+  convertToF(temperature) + " ℉" 
            + "<br>Wind: " + windVal + "MPH<br>Humidity: " + humidVal + "%</p>"
        );
    });

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ cityName +"&appid=" + APIKey;

    fetch(forecastURL)
    .then(function (forcastResponse) {
        return forcastResponse.json();
    })
    .then(function (forecastData) {
        forecast(forecastData);
    });
}

// Helper method for temperature
function convertToF(kelvin){
    total = ((kelvin-273.15)*1.8)+32;
    return total.toFixed(2);
}

function storeWeather() {
    localStorage.setItem("weatherList", JSON.stringify(weatherList));
}

function init(){
    var history = JSON.parse(localStorage.getItem("weatherList"));

    if (history !== null){
        weatherList = history;
    }
    for (var i = 0; i < weatherList.length; i++){
        getWeatherFrom(weatherList[i]);
    }
    
}

function renderWeather(){
    $('#city-name').empty();
    $('#date-1').empty();
    $('#date-2').empty();
    $('#date-3').empty();
    $('#date-4').empty();
    $('#date-5').empty();
    
    for (var i = 0; i < weatherList.length; i++){
        var currentWeather = weatherList[i];
        var today = new Date(currentWeather.dt*1000);
        var temperature = currentWeather.main.temp;
        var windVal = currentWeather.wind.speed;
        var humidVal = currentWeather.main.humidity;
        $('#city-name').append(
            "<p>" + currentWeather.name + " (" +today.toDateString() +")<br>"+"Temp: "+  convertToF(temperature) + " ℉" 
            + "<br>Wind: " + windVal + "MPH<br>Humidity: " + humidVal + "%</p>"
        );
        for (var j = 0; j < forecastList.length; j++){
            currentWeather = forecastList[i];
            today = new Date(currentWeather.dt*1000);
            temperature = currentWeather.main.temp;
            windVal = currentWeather.wind.speed;
            humidVal = currentWeather.main.humidity;
            var currentDiv = switchDiv(h);
        
            currentDiv.append(
                "<p>" +currentDate.toDateString() +"<br>"+"Temp: "+  convertToF(temperature) + " ℉" 
                + "<br>Wind: " + currentWind + "MPH<br>Humidity: " + currentHumid + "%</p>"
            );

        }
    }
}

// click to search something
searchBTN.addEventListener('click', function (event) {
    //event.preventDefault();
    getWeatherFrom(userInput.value); // Get input by calling a value
    // Store input values to weather list (keep history)
    storeWeather();
});
// $('#weatherHistoryBTN')
// historyDiv
historyDiv.addEventListener("click", function(event){
    var text = event.target;

    if (text.matches("button") === true){
        storeWeather();
        for (var i = 0; i < weatherList.length; i++){
            getWeatherFrom(weatherList[i]);
        }
    }
});

init();