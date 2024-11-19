const form = document.getElementById("weatherForm");
const locationInput = document.getElementById("location");
const weatherInfo = document.getElementById("weatherInfo");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const loading = document.getElementById("loading");

const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your OpenWeather API key

// Fetch weather data from API
async function getWeather(location) {
  try {
    loading.classList.remove("hidden");
    weatherInfo.classList.add("hidden");

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Location not found");
    }

    const data = await response.json();
    return {
      city: data.name,
      temp: data.main.temp,
      desc: data.weather[0].description,
    };
  } catch (error) {
    alert(error.message);
    return null;
  } finally {
    loading.classList.add("hidden");
  }
}

// Update the DOM with weather info
function displayWeather(data) {
  if (!data) return;
  cityName.textContent = `City: ${data.city}`;
  temperature.textContent = `Temperature: ${data.temp}°C`;
  description.textContent = `Description: ${data.desc}`;
  weatherInfo.classList.remove("hidden");
}

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = locationInput.value.trim();
  if (location) {
    const weatherData = await getWeather(location);
    displayWeather(weatherData);
    locationInput.value = ""; // Clear input
  }
});
