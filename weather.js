let codeArr = [123,234];

let url = 'http://api.weatherstack.com/current?access_key=3bffba5ebe988badbd6a7188828893ad&query=New%20%Delhi';

let city = document.getElementById('city');
let weather = document.getElementById('weather');
let card = document.getElementById('card');

function getWeather() {
    fetch(url).then(response => response.json())
        .then(function (json) {
            console.log(json);
             // if (!codeArr.find(n=>n===json.current.weather_code)) 
            {


                let str = ` <div>
            <h2>${json.location.name}, ${json.location.country}</h2>
            <hr>
            <div>Observation-Time: ${json.current.observation_time}</div>
        <div>Temperature: ${json.current.temperature} Degree Celcius</div>
        <div>Weather description: ${json.current.weather_descriptions[0]}</div>
        <div>Wind speed: ${json.current.wind_speed} mph</div>
        <div>Wind Degree: ${json.current.wind_degree}</div>
        <div>Wind Direction: ${json.current.wind_dir}</div>
        <div>Pressure: ${json.current.pressure}</div>
        <div>Humidity: ${json.current.humidity}</div>
        <div>Feels like: ${json.current.feelslike}</div>
        <div>Visibility: ${json.current.visibility}</div>
        </div>
        `;

                // style="border:2px solid red"

                // weather.innerHTML = str;

                let s = `<div class="card container text-light bg-dark my-4">
        <h1 class="text-center text-info my-2">${json.location.name}</h1>
        <hr>
        <h1>${json.current.temperature} &#8451;</h1> Feels like ${json.current.feelslike} &#8451;
        <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
        <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z"/>
        </svg> ${json.current.wind_speed} kmph</span>
        <div>${json.current.weather_descriptions[0]}</div>
        </div>`;

                card.innerHTML += s;
                codeArr.push(json.current.weather_code);
                // city.innerHTML = `Weather for ${json.location.name}`;
            }
        });
}

getWeather();

let search = document.getElementById('search');
search.addEventListener('click', function (e) {
    e.preventDefault();
    console.log("Clicked fired");
    let input = document.getElementById('get');
    if (input.value === undefined || input.value === "") {
        alert("Please enter valid city");
    } else {


        url = `http://api.weatherstack.com/current?access_key=3bffba5ebe988badbd6a7188828893ad&query=${input.value}`;
        getWeather();
    }
});