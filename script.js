const apiKey = '13304bfd2fab4923936123123241512'; // WeatherAPI key
const apiKey2 = '0qV2MDR1yvimMC5C0sqHOSqPI44U8q6D9WX6PIuBeDrAkzn0vMsL2J2n';  // Pexels API key

let city = 'London';

// Function to update Weather data
function updateWeather(){
    fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        .then(response => response.json())
        .then(data => {
        
        const name = data.location.name // Name of city
        const tempC = data.current.temp_c; // Temperature in °C
        const des = data.current.condition.text // Weather description
        const humidity = data.current.humidity; // Humidity percentage
        const windSpeed = data.current.wind_mph; // Wind speed in mph
        const WeatherImage = {
            "Images": {
                "Sunny": "./images/clear.png",
                "Partly cloudy": "images/clouds.png",
                "Cloudy": "images/clouds.png",
                "Overcast": "images/clouds.png",
                "Mist": "images/mist.png",
                "Light rain": "images/rain.png",
                "Moderate rain": "images/rain.png",
                "Heavy rain": "images/rain.png",
                "Light snow": "images/snow.png",
                "Moderate snow": "images/snow.png",
                "Heavy snow": "images/snow.png",
                "Patchy drizzle": "images/drizzle.png",
                "Thunderstorm": "images/rain.png"
            }
        };
        const weatherImg = WeatherImage.Images[des];

        document.querySelector(".cityName").textContent = name;
        document.querySelector(".temperature").innerHTML = `${tempC} °C`;
        document.querySelector(".description").innerHTML = des;
        document.querySelector(".humidity").innerHTML = `Humidity: ${humidity}%`;
        document.querySelector(".windSpeed").innerHTML = `Wind: ${windSpeed} m/h`;
        document.querySelector(".weatherImg").src = weatherImg;

    })
    .catch(() => {
        document.querySelector(".cityName").textContent = "City Not Found";
        document.querySelector(".temperature").innerHTML = `0 °C`;
        document.querySelector(".description").innerHTML = "-----";
        document.querySelector(".humidity").innerHTML = `Humidity: --%`;
        document.querySelector(".windSpeed").innerHTML = `Wind: -- m/h`;
    });
}

// Function to add Background Image 
function addBgImg(){
    fetch(`https://api.pexels.com/v1/search?query=${city}`, {
        headers: {
            Authorization: apiKey2
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.photos && data.photos.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.photos.length);
            const imageUrl = data.photos[randomIndex].src.large2x;
            console.log(`Image URL: ${imageUrl}`);
            bg = document.querySelector(".main")
            bg.style.backgroundImage = `url(${imageUrl})`
        } else {
            console.error('No photos found for the given query.');
        }
    })
    .catch(error => console.error('Error:', error));
}

// Event listener to the search icon
const search = document.querySelector("#search");
const submit = document.querySelector(".searchIcon");
submit.addEventListener("click", () => {
    const enteredCity = search.value.trim();
    if (enteredCity) {
        city = enteredCity
        document.getElementById('myToggle').checked = false
        updateWeather();
        addBgImg();
        search.value = "";
    } else {
        alert("Please enter a city name.");
    }
});
search.addEventListener("keydown", (event) => {
    if (event.key == "Enter") { 
        submit.click();
    }
});


// Toggle button 
document.getElementById('myToggle').addEventListener('change', function () {
    const tempElement = document.querySelector(".temperature");
    const tempText = tempElement.innerHTML;
    if (this.checked) {
        const tempC = parseFloat(tempText.replace("°C", ""));
        const tempF = (tempC * 9) / 5 + 32;
        tempElement.innerHTML = `${tempF.toFixed(1)} °F`;
    } else {
        const tempF = parseFloat(tempText.replace("°F", ""));
        const tempC = (tempF - 32) * 5 / 9;
        tempElement.innerHTML = `${tempC.toFixed(1)} °C`;
    }
});

