import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// in the future: make multiple map lists for different kinds of links

const periods = [
  {name: 'Advocacy', start: 9, end: 10}
];

//  in the future: Measure everything in minutes (e.g 3 hours = 180 minutes) in terms of timetable useEffect()


// HUZZAH

  // function Timetable(){
  //  return (
  //    <div className="timetable">
  //      {periods.map(period => (
  //        <div className="period">
  //          <div className="name">{period.name}</div>
  //          <div>{period.start} - {period.end}</div>
  //        </div>
  //        ))}
  //    </div>
  //  );
  //}
  //  
  // 


const links = [
  {name: "Connect", link: "https://connect.det.wa.edu.au/group/students/ui/overview"},
  {name: "Compass", link: "https://perthmodern-wa.compass.education/"},
  {name: "Outlook", link: "https://outlook.office.com/mail/inbox"},
  {name: "Mathspace", link: "https://mathspace.co"},
  {name: "GitHub", link: "https://github.com"},
  {name: "Gmail", link: "https://mail.google.com/mail/u/0/"},
  {name: "EP", link: "https://www.educationperfect.com/app/#/dashboard/french/"}
]

function Links(){
  return (
    <div className="links">
      {links.map(link => (
        <a className="link" href={link.link}>{link.name}</a>
        ))}
    </div>
  );
}

function Time(){
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    let timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="time">
      <div>{time.getHours().toString().length === 1 ? "0" + time.getHours() : time.getHours()}:{time.getMinutes().toString().length === 1 ? "0" + time.getMinutes() : time.getMinutes()}:{time.getSeconds().toString().length === 1 ? "0" + time.getSeconds() : time.getSeconds()}</div>
    <div className="date">{[
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ][time.getDay()]} {time.getDate().toString()} {[
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ][time.getMonth()]} {time.getFullYear().toString()}</div>
    </div>
  );
}

function getWeatherData() {
  return fetch('https://api.openweathermap.org/data/2.5/weather?q=Perth&appid=e741f2ad8303b4d99654a07f21a7ef9a')
    .then(response => response.json())
    .then(data => {
      return {
        temp: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon
      }
    }
  )
}

const Search = () => {
        //switch() {
        //  case 'Google':
        //  
        //  case 'Bing':
        //  
        //  case 'Qwant':
    const [search, setSearch] = useState('');
    return(
      <input>s</input>
    )
  }

function Weather() {
  const [weather, setWeather] = useState<{temp: any, description: any, icon: any}|null>(null)

  useEffect(() => {
    getWeatherData().then(data => setWeather(data))
  }, [])

  if (weather === null) {
    return <div>Loading...</div>
  } else {
    return (
    <span className="weather">
      <img src={
          (weather.description === "clear sky") ? "http://openweathermap.org/img/wn/01d.png" : // work of art, certified nft ($6000 to screenshot)
          (weather.description === "few clouds") ? "http://openweathermap.org/img/wn/02d.png" :
          (weather.description === "scattered clouds") ? "http://openweathermap.org/img/wn/03d.png" :
          (weather.description === "broken clouds") ? "http://openweathermap.org/img/wn/04d.png" :
          (weather.description === "shower rain") ? "http://openweathermap.org/img/wn/09d.png" :
          (weather.description === "rain") ? "http://openweathermap.org/img/wn/10d.png" :
          (weather.description === "thunderstorm") ? "http://openweathermap.org/img/wn/11d.png" :
          (weather.description === "snow") ? "http://openweathermap.org/img/wn/13d.png" :
          (weather.description === "mist") ? "http://openweathermap.org/img/wn/50d.png": "I'm sure it's a sunny day! (it broke lol)"}
        width="80px" alt={weather.description}/><p className="smallText"> <a href="http://www.bom.gov.au/wa/forecasts/perth.shtml"> {Math.round(weather.temp - 273.15)} &deg;C </a></p>
    </span>
    );
  }
}

//in the future: have two columns, one for weather, one for timetable

function Container() {
  return(
    <div className="container">
      <div>
        <Weather />
      </div>
      <Time />
      <Links/>
      <p id="center">Made by <a href="https://github.com/OforOlive1234">Me</a></p>
    </div>
  )
}

function App() {
  return (
    <div className="App">
     <Container />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));