async function fetchWeather() {
    let searchInput = document.getElementById("search-bar").value;
    const weatherDataSection = document.getElementById("weather-data");
    weatherDataSection.style.display = "block";
    const apiKey = "40be63b4e836afca7f1d21a3fdae8b8c";
 
 
    if (searchInput === "") {
        weatherDataSection.innerHTML = `
        <div>
          <h2>Empty Input!</h2>
          <p>Please try again with a valid <u>city name</u>.</p>
        </div>
        `;
        return;
    }
 
 
    async function getLonAndLat() {
        const countryCode = 1;
        const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.replace(" ", "%20")},${countryCode}&limit=1&appid=${apiKey}`;
        const response = await fetch(geocodeURL);
        if (!response.ok) {
            console.log ("Bad response!", response.status);
            return;
        }
       
        const data = await response.json();
        if (data.length == 0){
            console.log("Something went wrong here!");
            weatherDataSection.innerHTML =  `
            <div>
              <h2>Invalid Input: "${searchInput}"</h2>
              <p>Please try again with a valid <u>city name</u>.</p>
            </div>
            `;
        } else {
            return data[0];
        }
 
 
 
 
    }
 
 
    async function getWeatherData(lon,lat) {
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response = await fetch(weatherURL);
        if (!response.ok){
            console.log("Bad response!", response.status);
            return;
        }
        const data = await response.json();
 
 
        weatherDataSection.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100" />
        <div>
          <h2>${data.name}</h2>
          <p><strong>Temperature:</strong> ${Math.round((data.main.temp - 273.15) * 1.8 + 32)}°F</p>
          <p><strong>Description:</strong> ${data.weather[0].description}</p>
        </div>
        `
        weatherDataSection.style.display = "flex";
        weatherDataSection.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100" />
        <div>
          <h2>${data.name}</h2>
          <p><strong>Temperature:</strong> ${Math.round((data.main.temp - 273.15) * 1.8 + 32)}°F</p>
          <p><strong>Description:</strong> ${data.weather[0].description}</p>
        </div>
        `;
    }
 
 
    async function fetchHumidity(lon,lat) {
        let humidityDataSection = document.getElementById("humidity-data");
        // const humidityDescription = document.getElementById("humidity-description");
        const humidityURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response = await fetch(humidityURL);
        if (!response.ok) {
            console.log("Bad response!", response.status);
            return;
        }
        const data = await response.json();
 
 
        humidityDataSection.innerHTML = `
        <div>
            <p>${data.main.humidity} %</p>
        </div>
        `;
    }
 
 




    
 
    document.getElementById("search-bar").value = "";
    const geocodeData = await getLonAndLat();
        if (geocodeData) {
            await getWeatherData(geocodeData.lon, geocodeData.lat);
            await fetchHumidity(geocodeData.lon, geocodeData.lat);
        }
    getWeatherData(geocodeData.lon, geocodeData.lat);
 
 
 
 
 }
 