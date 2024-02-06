const apiKey = "2dec3a03383d4d7114154e30a49a80fe";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector("#cityName");
const searchBtn = document.querySelector(".search");
const icon = document.querySelector(".weather-icon");
const weatherSection = document.querySelector(".weather");
const errorMsg = document.querySelector(".error");

async function checkWeather(city) {
    try {
        response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }

        var data = await response.json();

        console.log(data);

        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".humid").innerHTML = data.main.humidity + "%";
        document.querySelector(".speed").innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main == "Clouds") {
            icon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Mist") {
            icon.src = "images/mist.png";
        } else if (data.weather[0].main == "Drizzle") {
            icon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Clear") {
            icon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            icon.src = "images/rain.png";
        }

        weatherSection.style.display = "flex";
        weatherSection.style.flexDirection = "column";
        errorMsg.style.display = "none";
    }
    catch (error) {
        errorMsg.style.display = "block";
        weatherSection.style.display = "none";
    }
}

function btnClick() {
    checkWeather(searchBox.value);
}

searchBtn.addEventListener("click", btnClick);

searchBox.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        btnClick();
    }
});