const searchBtn = document.getElementById("searchButton");
const userInput = document.getElementById("cityInput");
const apiKey = "c1d9e5f9eb3a85a67f539b13f0da5c26";
const nameH1 = document.getElementById("cityName");
const tempP = document.getElementById("temperature");
const descP = document.getElementById("description");
const humidityParent = document.getElementById("humidityWindSpeed");
const errorMessageEl = document.getElementById("errorMessage");
const ParentWeather = document.getElementById("weatherData");
searchBtn.addEventListener("click", searchCity);

function resetWeatherData() {
  nameH1.innerText = "";
  tempP.innerText = "";
  descP.innerText = "";
  humidityParent.innerHTML = "";
  errorMessageEl.innerText = "";
  ParentWeather.classList.add("hidden");
}

async function searchCity() {
  const city = userInput.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  if (city.trim() === "") {
    alert("Enter a valid city name");
    return;
  }

  resetWeatherData(); // Clear previous data

  try {
    const response = await fetch(url);
    const data = await response.json();
    errorMessageEl.innerText = ``;
    if (ParentWeather.classList.contains("hidden")) {
      ParentWeather.classList.remove("hidden");
    }
    if (data.cod === "404") {
      errorMessageEl.innerText = `city not found`;
    } else {
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      nameH1.innerText = `${city}`;
      tempP.innerText = `${Math.round(temperature)}°C`;
      descP.innerText = `${description}`;
      humidityParent.innerHTML = `
          <p>Humidity: ${humidity}%</p> 
          <p>Wind speed: ${windSpeed} m/s</p> 
      `;
    }
  } catch (error) {
    errorMessageEl.innerText = `Error fetching data. Please try again later.`;
    ParentWeather.classList.add("hidden");
  }
}
// async function getWeather() {
//   const city = document.getElementById('city').value;
//   const weatherDiv = document.getElementById('weather');

//   if (city === "") {
//     weatherDiv.innerHTML = "Please enter a city name!";
//     return;
//   }

//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     if (data.cod === "404") {
//       weatherDiv.innerHTML = "City not found!";
//     } else {
//       const temperature = data.main.temp;
//       const description = data.weather[0].description;
//       const humidity = data.main.humidity;
//       const windSpeed = data.wind.speed;

//       weatherDiv.innerHTML = `
//         <h3>Weather in ${city}</h3>
//         <p>Temperature: ${temperature}°C</p>
//         <p>Description: ${description}</p>
//         <p>Humidity: ${humidity}%</p>
//         <p>Wind Speed: ${windSpeed} m/s</p>
//       `;
//     }
//   } catch (error) {
//     weatherDiv.innerHTML = "Error fetching data. Please try again later.";
//   }
// }
