import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  //state para verificar a localização do user
  const [location, setLocation] = useState(false);
  //esse state é quem vai armazenar os dados vindos da api
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
    console.log(res.data);
  }

  //hook q é executado assim q a aplicação é montada e toda vez que uma variável é alterada (passando o array vazio, o hook será executado somente uma vez), nesse caso, aqui a mensagem de permissão de localização será exibida para o user assim q página carregar
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    })
  }, [])

  if (location == false) {
    return (
      <div>
        para essa aplicação, é necessário permitir a localização no browser
      </div>
    )
  } else if (weather == false) {
    return (
      <div>
        carregando o clima
      </div>
    )
  } else {
    return (
      <div className="main">
        <h3>clima ({weather['weather'][0]['description']})</h3>
        <br />
        <ul>
          <li>temp atual: {weather['main']['temp']}º</li>
          <li>temp máxima: {weather['main']['temp_max']}º</li>
          <li>temp mínima: {weather['main']['temp_min']}º</li>
          <li>pressão: {weather['main']['pressure']} hpa</li>
          <li>umidade: {weather['main']['humidity']}%</li>
        </ul>
      </div>
    );
  }
}

export default App;
