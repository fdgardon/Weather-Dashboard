var inPut = document.getElementById("input-box");
var historyList = document.getElementById("historyList")
var searchBtn = document.getElementById("searchBtn");
var clearBtn = document.getElementById("clear-hisotry");
var currentWeather = document.getElementById("current-weather");
var temp = document.getElementById("temperature");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var forcast = document.getElementById("forecast");
var day1 = document.getElementById("day-1");
var day2 = document.getElementById("day-2");
var day3 = document.getElementById("day-3");
var day4 = document.getElementById("day-4");
var day5 = document.getElementById("day-5"); 
var result = document.getElementById("results")
var city = document.getElementById("cityName")
var icon = document.getElementById("icon")
var currentDay = document.getElementById("currentDay")
var tempFirst = document.querySelector(".tempFirst")
var windFirst = document.querySelector(".windFirst")
var humidityFirst = document.querySelector(".humidityFirst")
var tempSecond = document.querySelector(".tempSecond")
var windSecond = document.querySelector(".windSecond")
var humiditySecond = document.querySelector(".humiditySecond")
var tempThird = document.querySelector(".tempThird")
var windThird = document.querySelector(".windThird")
var humidityThird = document.querySelector(".humidityThird")
var tempFourth = document.querySelector(".tempFourth")
var windFourth = document.querySelector(".windFourth")
var humidityFourth = document.querySelector(".humidityFourth")
var tempFifth = document.querySelector(".tempFifth")
var windFifth = document.querySelector(".windFifth")
var humidityFifth = document.querySelector(".humidityFifth")
var searchHistory = [];

$(function () {
  $('#currentDay').text(dayjs().format('(MM/DD/YYYY)'))
} );

var apiKey = "280407854f36853e734d02d20ac15962"

function cityWeather (cityName){
var url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey+"&units=imperial";
fetch(url).then(function(response){
    console.log(response)
    return response.json()
}).then(function(data){
    console.log(data)
    fiveDays(data.coord.lat,data.coord.lon)
    //fiveDays(data.coord.cnt)
    result.classList.remove("hidden")
    city.textContent = data.name
    temp.textContent = data.main.temp
    wind.textContent = data.wind.speed
    humidity.textContent = data.main.humidity
   icon.setAttribute('src', 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png')
   
})
}
searchBtn.addEventListener("click", function(e){
    e.preventDefault();  
    var search = inPut.value
    console.log(search)
    cityWeather(search);

    historyList.textContent = search
    localStorage.setItem("city", JSON.stringify(search)); 
    
});


function fiveDays (lat,lon){
   var url = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+apiKey+"&units=imperial";

    fetch(url).then(function(response){
        console.log(response)
        return response.json()
    }).then(function(data){
        console.log(data)

        var dataSet1 = data.list[4];
        var dataSet2 = data.list[12];
        var dataSet3 = data.list[20];
        var dataSet4 = data.list[28];
        var dataSet5 = data.list[36];
      // each day accesses information from specific objects in the API array
      day1.children[0].textContent = reverseDate(dataSet1.dt_txt);
      day1.children[1].setAttribute('src', 'https://openweathermap.org/img/w/' + dataSet1.weather[0].icon + '.png')
      tempFirst.textContent = dataSet1.main.temp
      windFirst.textContent = dataSet1.wind.speed
      humidityFirst.textContent = dataSet1.main.humidity
      
      day2.children[0].textContent = reverseDate(dataSet2.dt_txt);
      day2.children[1].setAttribute('src', 'https://openweathermap.org/img/w/' + dataSet2.weather[0].icon + '.png')
      tempSecond.textContent = dataSet2.main.temp
      windSecond.textContent = dataSet2.wind.speed
      humiditySecond.textContent = dataSet2.main.humidity
      
      day3.children[0].textContent = reverseDate(dataSet3.dt_txt);
      day3.children[1].setAttribute('src', 'https://openweathermap.org/img/w/' + dataSet3.weather[0].icon + '.png')
      tempThird.textContent = dataSet3.main.temp
      windThird.textContent = dataSet3.wind.speed
      humidityThird.textContent = dataSet3.main.humidity
      
      day4.children[0].textContent = reverseDate(dataSet4.dt_txt);
      day4.children[1].setAttribute('src', 'https://openweathermap.org/img/w/' + dataSet4.weather[0].icon + '.png')
      tempFourth.textContent = dataSet4.main.temp
      windFourth.textContent = dataSet4.wind.speed
      humidityFourth.textContent = dataSet4.main.humidity
      
      day5.children[0].textContent = reverseDate(dataSet5.dt_txt);
      day5.children[1].setAttribute('src', 'https://openweathermap.org/img/w/' + dataSet5.weather[0].icon + '.png')
      tempFifth.textContent = dataSet5.main.temp
      windFifth.textContent = dataSet5.wind.speed
      humidityFifth.textContent = dataSet5.main.humidity

    })
}

// function to format date given by API
function reverseDate(text) {
    var date = text.split(' ')[0].split('-');
    var month = date[1];
    var day = date[2];
    var year = date[0];
    return month + '/' + day + '/' + year;
}










