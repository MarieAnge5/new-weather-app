function formatDate(timestamp){
let date = new Date(timestamp); 
let hours = date.getHours(); 
if (hours < 10) {
    hours = `0${hours}`;
  }

let minutes = date.getMinutes(); 
if (minutes < 10) {
    minutes = `0${minutes}`;
  }
let days = [
    "Sunday", 
    "Monday", 
    "Tuesday", 
    "Wednesday", 
    "Thursday", 
    "Friday",
    "Saturday"
]; 
let day = days[date.getDay()];

return `${day}  ${hours}:${minutes}`; 
}

function formatHours (timestamp) {
  let date = new Date(timestamp); 
let hours = date.getHours(); 
if (hours < 10) {
    hours = `0${hours}`;
  }

let minutes = date.getMinutes(); 
if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`; 
}

function displayTemperature(response){
    let temperatureElement = document.querySelector("#temperature"); 
    let cityElement = document.querySelector("#city"); 
    let descriptionElement = document.querySelector ("#description"); 
    let humidityElement = document.querySelector("#humidity"); 
    let windElement = document.querySelector ("#wind"); 
    let dateElement = document.querySelector("#date"); 
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name; 
    descriptionElement.innerHTML = response.data.weather[0].description; 
    humidityElement.innerHTML = response.data.main.humidity; 
    windElement.innerHTML = Math.round(response.data.wind.speed);  
    dateElement.innerHTML = formatDate(response.data.dt * 1000); 
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
    iconElement.setAttribute("alt", response.data.weather[0].description); 
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast"); 
  forecastElement.innerHTML = null; 
  let forecast = null;
  

  for (let index = 0; index < 5; index++) {
  forecast = response.data.list[index]; 
  forecastElement.innerHTML += ` <div class="row weather-forecast" id="forecast">
        <div class="col-4">
          <br />
            ${formatHours(forecast.dt * 1000)}
            </div>
           <div class="col-4">
            <span>
            <br />
            ${Math.round(forecast.main.temp_max)}°|
            </span>
            <strong>${Math.round(forecast.main.temp_min)}°</strong>
        </div>
        <div class="col-4">
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" width="70"/>
        </div>
    </div>`; 

  }
}

function searchCity(city) {
let apiKey = "c63f7f05a246deac63fc695506319dbf";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature); 

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`; 
axios.get(apiUrl).then(displayForecast); 

}


function handleCity(event) {
  event.preventDefault(); 
  let cityInputElement =document.querySelector("#city-input"); 
  searchCity(cityInputElement.value); 
}

function showFahrenheitTemperature(event) {
  event.preventDefault(); 
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32; 
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature); 
}

function showCelsiusTemperature(event){
  event.preventDefault(); 
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature); 
}
let celsiusTemperature = null; 


let form = document.querySelector("#search-form"); 
form.addEventListener("submit", handleCity); 

let fahrenheitLink = document.querySelector("#fahrenheit-link"); 
fahrenheitLink.addEventListener("click", showFahrenheitTemperature); 

let celsiusLink = document.querySelector("#celsius-link"); 
celsiusLink.addEventListener("click", showCelsiusTemperature); 