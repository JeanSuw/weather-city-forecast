var APIKey = "35860f199216a9759f17e01b3000e2e2";
var searchBTN = document.getElementById("search-BTN");

var userInput = document.getElementById("user-input"); // user's input of city name

var cityNameDiv = document.getElementById("city-name");
var todayDate = document.getElementById("today-date");
var todayTemp = document.getElementById("today-temp");
var todayWind = document.getElementById("today-wind");
var todayHumidity = document.getElementById("today-humidity");

//var day1Div = document.getElementById("date-1");
var day1Div = $('#date-1');
//var day2Div = document.getElementById("date-2");
var day2Div = $('#date-2');
//var day3Div = document.getElementById("date-3");
var day3Div = $('#date-3');
//var day4Div = document.getElementById("date-4");
var day4Div = $('#date-4');
//var day5Div = document.getElementById("date-5");
var day5Div = $('#date-5');

function switchDiv(divVal){
    switch (divVal){
        case 7: // 8th hours
            return day1Div;
        case 15: // 16th hours
            return day2Div;
        case 23: // 24th hours
            return day3Div;
        case 31: // 32th hours
            return day4Div;
        case 39: // 40th hours
            return day5Div;
        case -1:
            break;
    }
}

function forecast(dataVal){
    var dateText, currentDate, currentDiv;
    for (var h = 7; h < dataVal.list.length; h += 8){
        dateText = $('<p>');
        currentDate = new Date (dataVal.list[h].dt * 1000);
        console.log("h = " + h);
        dateText.text(currentDate.toDateString());
        currentDiv = switchDiv(h);
        currentDiv.append(dateText);
    }
}


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
        //console.log(forecastData.list[0].dt);
        //console.log(forecastData.list[8].dt);
        //console.log(forecastData.list[16].dt);
        //console.log(forecastData.list[24].dt);
        console.log(forecastData.list);
        console.log(forecastData.list.length);
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
// Testing methods
//getWeatherFrom("London");
