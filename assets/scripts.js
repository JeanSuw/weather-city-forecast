var APIKey = "35860f199216a9759f17e01b3000e2e2";
var searchBTN = document.getElementById("search-BTN");

var userInput = document.getElementById("user-input"); // user's input of city name

var cityNameDiv = document.getElementById("city-name");
var todayDate = document.getElementById("today-date");
var todayTemp = document.getElementById("today-temp");
var todayWind = document.getElementById("today-wind");
var todayHumidity = document.getElementById("today-humidity");

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
    var dateText, currentDate, currentDiv, dateList, temperature,currentWind;
    for (var h = 7; h < dataVal.list.length; h += 8){
        dateList = dataVal.list[h];
        dateText = $('<p>');
        
        currentDate = new Date (dateList.dt * 1000);
        
        temperature = dateList.main.temp;
        currentWind = dateList.wind.speed;
        currentHumid = dateList.main.humidity;
        
        currentDiv = switchDiv(h);
        
        currentDiv.append(
            "<p>" +currentDate.toDateString() +"</p><p>"+"Temp: "+  convertToF(temperature) + " ℉</p>" 
            + "<p>Wind: " + currentWind + "MPH</p><p>Humidity: " + currentHumid + "%</p>"
        );
    }
}

// Get current weather and the forecast
function getWeatherFrom(cityName){
    
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName +"&appid=" + APIKey;

    fetch(weatherURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // get current city day
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

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ cityName +"&appid=" + APIKey;

    fetch(forecastURL)
    .then(function (forcastResponse) {
        return forcastResponse.json();
    })
    .then(function (forecastData) {
        forecast(forecastData);
    });
}

function clearOutput(){
    // start over the lists
}



// Helper method for temperature
function convertToF(kelvin){
    total = ((kelvin-273.15)*1.8)+32;
    return total.toFixed(2);
}

// click to search something
searchBTN.addEventListener('click', function (event) {
    //event.preventDefault();
    getWeatherFrom(userInput.value); // Get input by calling a value
});
