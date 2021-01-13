const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')


//first get the api url and key
const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;


// second invoke a promise and await it 
async function getWeatherByLocation(city){
    const resp = await fetch(url(city),{
     orgin:"cors"  
    });
     const respData = await resp.json();

     addWeatherToPage(respData)

   
}

// third create a function and add it to the main  html
function addWeatherToPage(data) {
    const temp = KtoC(data.main.temp);

    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML =`
    
    <h2> <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
    
    <small>${data.weather[0].main}</small> 
    
    `;
      
    main.appendChild(weather);
}

//fourth convert all weather temp from kelvin to degree
function KtoC(K) {
    return Math.floor(K - 273.15);
}


// 5. add an event listener to the form whereby when a seach is done it inputs data
form.addEventListener('submit', (e)=>{
    e.preventDefault()

    const city = search.value;

    if (city) {
        getWeatherByLocation('city')
    }
})