

const apiKey :string = "06c5f5d4a22faeb359f11c474e4fe719";

const apiUrl: string = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input") as HTMLInputElement;

const searchBtn = document.querySelector(".search button") as HTMLButtonElement ;

const weatherIcon = document.querySelector(".weather-icon") as HTMLImageElement;

const errorEl = document.querySelector(".error") as HTMLDivElement

const NoValueErrorEl = document.querySelector(".no-value-error") as HTMLDivElement

const weatherEl = document.querySelector(".weather") as HTMLDivElement

interface data {
    name: string
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
        grnd_level: number
    },
    wind:{
    speed:string
    },
    weather: Array<{
    main :string
    }>,
    cod: number ,
    message: string
}

async function checkWeather (city: string) : Promise<void> {
    try {
        const response:Response= await fetch (apiUrl + city +`&appid=${apiKey}`);
        let data:data= await response.json();
        console.log(response, data);
        const cityName = document.querySelector(".city") as HTMLInputElement
        const Temperature = document.querySelector(".temp") as HTMLParagraphElement
        const Humidity = document.querySelector(".humidity") as HTMLParagraphElement
        const Wind = document.querySelector(".wind")as HTMLParagraphElement
        if(!response.ok){
            errorEl.style.display = "block";
            weatherEl.style.display = "none"
            throw new Error(data.message)
        }
        else {console.log(data);
            cityName.innerHTML =data.name;
            Temperature.innerHTML = Math.round(data.main.temp) + "°C";
            Humidity.innerHTML =data.main.humidity + "%";
            Wind.innerHTML =data.wind.speed + " km/h";

            if(data.weather[0].main == "Clouds") {
                weatherIcon.src = "images/clouds.png";
            }else if(data.weather[0].main == "Clear") {
                weatherIcon.src = "images/clear.png";
            }else if(data.weather[0].main == "Rain") {
                weatherIcon.src = "images/rain.png";
            }else if(data.weather[0].main == "Drizzle") {
                weatherIcon.src = "images/drizzle.png";
            }else if(data.weather[0].main == "Mist") {
                weatherIcon.src = "images/mist.png";
            }else if(data.weather[0].main == "Snow") {
                weatherIcon.src = "images/snow.png";
            }
             weatherEl.style.display = "block";
             errorEl.style.display = "none";
            }
    }
    catch(error) {console.log(error);}
}

const callTheWeatherFn = () => {
    if (searchBox.value === "") {
        weatherEl.style.display = "none";
        errorEl.style.display ="none"
        NoValueErrorEl.style.display = "block";
    }
    else {
        NoValueErrorEl.style.display = "none";
        checkWeather(searchBox.value)
    }
}

searchBtn.addEventListener("click", () => {
    callTheWeatherFn()
})

searchBox.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        callTheWeatherFn()
    }
});

