// Aaconst apiKey = "4419d6fe3e5d26d11c10e0d4f4adbf06";pki provide ki gayi API key yahan set kar di gayi hai
const apiKey = "4419d6fe3e5d26d11c10e0d4f4adbf06";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherBox = document.getElementById("weather-box");
const errorMsg = document.getElementById("error-msg");

async function checkWeather(city) {
    if (!city) {
        errorMsg.innerText = "Please enter a city name!";
        errorMsg.style.display = "block";
        weatherBox.style.display = "none";
        return;
    }

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        if (!response.ok) {
            // Agar API se koi error aaye (jaise Invalid Key ya City Not Found)
            errorMsg.innerText = data.message ? (data.message.charAt(0).toUpperCase() + data.message.slice(1)) : "City not found!";
            errorMsg.style.display = "block";
            weatherBox.style.display = "none";
            return;
        }

        // Data set karein
        document.getElementById("city").innerText = data.name;
        document.getElementById("temp").innerText = Math.round(data.main.temp) + "°C";
        document.getElementById("description").innerText = data.weather[0].description;
        document.getElementById("humidity").innerText = data.main.humidity + "%";
        document.getElementById("wind").innerText = data.wind.speed + " km/h";

        // Weather box dikhayein aur error hide karein
        weatherBox.style.display = "block";
        errorMsg.style.display = "none";
    } catch (error) {
        console.error("Fetch failed:", error);
        errorMsg.innerText = "Failed to fetch data. Check your internet connection.";
        errorMsg.style.display = "block";
        weatherBox.style.display = "none";
    }
}

// Search button click par
searchBtn.addEventListener("click", () => {
    checkWeather(cityInput.value.trim());
});

// Enter key press par
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(cityInput.value.trim());
    }
});
