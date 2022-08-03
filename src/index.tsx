import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// in the future: make multiple map lists for different kinds of links

const links = [
  {name: "Connect", link: "https://connect.det.wa.edu.au/group/students/ui/overview"},
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
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
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
          (weather.description === "clear sky") ? "http://openweathermap.org/img/wn/01d.png" :
          (weather.description === "few clouds") ? "http://openweathermap.org/img/wn/02d.png" :
          (weather.description === "scattered clouds") ? "http://openweathermap.org/img/wn/03d.png" :
          (weather.description === "broken clouds") ? "http://openweathermap.org/img/wn/04d.png" :
          (weather.description === "shower rain") ? "http://openweathermap.org/img/wn/09d.png" :
          (weather.description === "rain") ? "http://openweathermap.org/img/wn/10d.png" :
          (weather.description === "thunderstorm") ? "http://openweathermap.org/img/wn/11d.png" :
          (weather.description === "snow") ? "http://openweathermap.org/img/wn/13d.png" :
          (weather.description === "mist") ? "http://openweathermap.org/img/wn/50d.png": "I'm sure it's a sunny day! (it broke lol)"}
        width="80px" alt={weather.description}/><p className="smallText"> {Math.round(weather.temp - 273.15)} &deg;C</p>
    </span>
    );
  }
}

//timetable

const timetable = [
  {
    name: "Science",
    time: []
     
    }
]


function Container() {
  return(
    <div className="container">
      <Weather />
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