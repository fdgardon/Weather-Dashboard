var inPut = document.getElementById("input-box");
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

$(function () {
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'))
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
    result.classList.remove("hidden")
    city.textContent = data.name
    temp.textContent = data.main.temp
    wind.textContent = data.wind.speed
    humidity.textContent = data.main.humidity
    icon.setAttribute("src", "https://openweathermap.org/img/wn/"+data.weather[0].icon+".png");



})
}



searchBtn.addEventListener("click", function(){
   var search = inPut.value
   console.log(search)
   cityWeather(search);
})

function fiveDays (lat,lon){
    var url = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+apiKey+"&units=imperial";
    fetch(url).then(function(response){
        console.log(response)
        return response.json()
    }).then(function(data){
        console.log(data)

          // add 5 day forecast title
          var futureForecastTitle = $("#forecast");
          

          // using data from response, set up each day of 5 day forecast
          for (var i = 1; i <= 5; i++) {
              // add class to future cards to create card containers
              var futureCard = $(".days");
              futureCard.addClass("future-card-details");

              // add date to 5 day forecast
              var futureDate = $("#future-date-" + i);
              date = moment().add(i, "d").format("M/D/YYYY");
              futureDate.text(date);

              // add icon to 5 day forecast
              var futureIcon = $("#icon-" + i);
              futureIcon.addClass("icon");
              var futureIconCode = response.daily[i].weather[0].icon;
              futureIcon.attr("src", `https://openweathermap.org/img/wn/${futureIconCode}@2x.png`);

              // add temp to 5 day forecast
              var futureTemp = $("#future-temp-" + i);
              futureTemp.text("Temp: " + response.daily[i].temp.day + " \u00B0F");

              // add humidity to 5 day forecast
              var futureHumidity = $("#future-humidity-" + i);
              futureHumidity.text("Humidity: " + response.daily[i].humidity + "%");
          }
    

    })

}