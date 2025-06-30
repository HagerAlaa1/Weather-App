"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apiKey = "06c5f5d4a22faeb359f11c474e4fe719";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorEl = document.querySelector(".error");
const NoValueErrorEl = document.querySelector(".no-value-error");
const weatherEl = document.querySelector(".weather");
function checkWeather(city) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(apiUrl + city + `&appid=${apiKey}`);
            let data = yield response.json();
            console.log(response, data);
            const cityName = document.querySelector(".city");
            const Temperature = document.querySelector(".temp");
            const Humidity = document.querySelector(".humidity");
            const Wind = document.querySelector(".wind");
            if (!response.ok) {
                errorEl.style.display = "block";
                weatherEl.style.display = "none";
                throw new Error(data.message);
            }
            else {
                console.log(data);
                cityName.innerHTML = data.name;
                Temperature.innerHTML = Math.round(data.main.temp) + "°C";
                Humidity.innerHTML = data.main.humidity + "%";
                Wind.innerHTML = data.wind.speed + " km/h";
                if (data.weather[0].main == "Clouds") {
                    weatherIcon.src = "images/clouds.png";
                }
                else if (data.weather[0].main == "Clear") {
                    weatherIcon.src = "images/clear.png";
                }
                else if (data.weather[0].main == "Rain") {
                    weatherIcon.src = "images/rain.png";
                }
                else if (data.weather[0].main == "Drizzle") {
                    weatherIcon.src = "images/drizzle.png";
                }
                else if (data.weather[0].main == "Mist") {
                    weatherIcon.src = "images/mist.png";
                }
                else if (data.weather[0].main == "Snow") {
                    weatherIcon.src = "images/snow.png";
                }
                weatherEl.style.display = "block";
                errorEl.style.display = "none";
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
const callTheWeatherFn = () => {
    if (searchBox.value === "") {
        weatherEl.style.display = "none";
        errorEl.style.display = "none";
        NoValueErrorEl.style.display = "block";
    }
    else {
        NoValueErrorEl.style.display = "none";
        checkWeather(searchBox.value);
    }
};
searchBtn.addEventListener("click", () => {
    callTheWeatherFn();
});
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        callTheWeatherFn();
    }
});
//# sourceMappingURL=index.js.map