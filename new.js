
const apiKey = 'ef61da33b6d63cba15964236910970da';

window.addEventListener('load', getWeather());

function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat, long, url, str;
            // Storing Longitude and Latitude in variables
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(lat, long);
            console.log(position);

            url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
            // url = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=ef61da33b6d63cba15964236910970da`;
            fetch(url).then(response => response.json())
                .then((data) => {
                    console.log(data);
                    const { temp, feels_like, temp_min, temp_max, pressure, humidity } = data.main;
                    const place = data.name;
                    const { description, icon } = data.weather[0];
                    const { sunrise, sunset } = data.sys;
                    const { speed, deg } = data.wind;

                    // const timeInGMT = new Date(epochTime * 1000);

                    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    const fahrenheit = (temp * 9) / 5 + 32;

                    // Converting Epoch(Unix) time to GMT
                    const sunriseGMT = new Date(sunrise * 1000);
                    const sunsetGMT = new Date(sunset * 1000);

                    // console.log(temp, feels_like, temp_min, temp_max, pressure, humidity, place, description, icon, sunrise, sunset);

                    let str = `<div class="card container text-light bg-dark my-4 p-2">
                    <h1 class="text-center text-info my-2">${place}</h1>
                    <hr>
                    <span><h1>${temp} &#8451;</h1></span>  Feels like: ${feels_like} &#8451;
                    min: ${temp_min}  max: ${temp_max}  Pressure: ${pressure}  Humidity: ${humidity}
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
                    <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z"/>
                    </svg>  ${speed} kmph ${deg} degree</span>
                    <div>${description}  <img src=${iconUrl}></img></div>
                    <div>Sunrise: ${sunriseGMT.toLocaleDateString()} ${sunriseGMT.toLocaleTimeString()} </div>
                    <div>Sunset: ${sunsetGMT.toLocaleDateString()} ${sunsetGMT.toLocaleTimeString()}</div>
                    </div>
                    `

                    weather.innerHTML = str;
                });
        });
    }
}


// setInterval(() => {
//     getWeather();
// }, 5000);