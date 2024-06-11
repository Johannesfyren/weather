const weatherIcon = document.querySelector('#weather-icon');
const input = document.querySelector('#input')
const inputBtn = document.querySelector('#input-btn')
let loc;
const card1 = document.querySelector('div[data-card="1"]');
const card2 = document.querySelector('div[data-card="2"]');
const card3 = document.querySelector('div[data-card="3"]');
const card4 = document.querySelector('div[data-card="4"]');
const card5 = document.querySelector('div[data-card="5"]');
const cards =[card1,card2,card3,card4,card5];




const getWeather = async function(_location){
    if (!_location){loc = 'Aalborg'}; //Default to one location

    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=e0acfed32bba41a0b42172110240906&q=${loc}&days=5&aqi=no&alerts=no`,{mode:"cors"});
    //const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=e0acfed32bba41a0b42172110240906&q=${loc}&aqi=no`,{mode:"cors"});
    const weatherData = await response.json();
    
    
    drawDom(weatherData);
    

}

getWeather().catch(console.error);

inputBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    if (!loc){
        getWeather();
    } else {
        loc = input.value;
        getWeather(loc)};

})

function drawDom(data){
    
    for (let i = 0;i<5;i++){
        console.log(cards[i].children[0]);
        cards[i].children[0].textContent = data.forecast.forecastday[i].date;
        cards[i].children[1].src = 'https:'+data.forecast.forecastday[i].day.condition.icon; //first day
        cards[i].children[2].textContent = data.forecast.forecastday[i].day.maxtemp_c; 
    }


    // card1.children[0].textContent = weatherData.forecast.forecastday[0].date;
    // card1.children[1].src = 'https:'+weatherData.forecast.forecastday[0].day.condition.icon; //first day
    // card1.children[2].textContent = weatherData.forecast.forecastday[0].day.maxtemp_c; 
}