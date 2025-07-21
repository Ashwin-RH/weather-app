import React, { useEffect, useRef, useState } from 'react';
import clearIcon from '../assets/clear.png';
import cloudIcon from '../assets/cloud.png';
import drizzleIcon from '../assets/drizzle.png';
import humidityIcon from '../assets/humidity.png';
import rainIcon from '../assets/rain.png';
import searchIcon from '../assets/search.png';
import snowIcon from '../assets/snow.png';
import windIcon from '../assets/wind.png';
import toast from 'react-hot-toast';
import "../index.css";
import { IoSearch } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { LuLinkedin } from "react-icons/lu";


const allIcons = {
  '01d': clearIcon,
  '01n': clearIcon,
  '02d': cloudIcon,
  '02n': cloudIcon,
  '03d': cloudIcon,
  '03n': cloudIcon,
  '04d': drizzleIcon,
  '04n': drizzleIcon,
  '09d': rainIcon,
  '09n': rainIcon,
  '10d': rainIcon,
  '10n': rainIcon,
  '13d': snowIcon,
  '13n': snowIcon,
};

const Weather = () => {
  const inputRef = useRef();

  const [loading, setLoading] = useState(false);

  const [forecastData, setForecastData] = useState([]);

  const [weatherData, setWeatherData] = useState(false);


  const search = async (city) => {
  if (city.trim() === '') {
    toast.error('Enter City Name');
    return;
  }

  setLoading(true); // Start loading

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message);
      return;
    }

    const icon = allIcons[data.weather[0].icon] || clearIcon;

    setWeatherData({
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      temperature: Math.floor(data.main.temp),
      location: data.name,
      condition: data.weather[0].description.replace(/\b\w/g, char => char.toUpperCase()),
      icon: icon,
    });

    // ✅ Await forecast to finish before stopping loader
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
    const res = await fetch(forecastUrl);
    const forecastJSON = await res.json();

    if (!res.ok) {
      toast.error(forecastJSON.message);
      return;
    }

    const forecast = forecastJSON.list.slice(0, 5).map(item => ({
      time: new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit' }), // Add minute if needed
      temp: Math.floor(item.main.temp),
      desc: item.weather[0].description.replace(/\b\w/g, c => c.toUpperCase()),
      icon: item.weather[0].icon
    }));

    setForecastData(forecast);
  } catch (error) {
    setWeatherData(false);
    setForecastData([]); // Clear forecast
    console.error('Error fetching weather data', error);
  } finally {
    setLoading(false); // ✅ Always stop loading
  }
};


  useEffect(() => {
    search('Bangalore');
  }, []);

return(
        
    <div className="min-h-screen flex flex-col items-center justify-center overflow-x-hidden  ">
<div className='absolute w-[150px] h-[150px] z-0 top-50 left-130 rounded-full bg-blue-300/30 hover:bg-blue-200/50 blur-2xl hover:scale-105 transition duration-500' />
<div className='absolute w-[150px] h-[150px] z-0 top-22 left-140 rounded-full bg-indigo-300/30 hover:bg-indigo-200/50 blur-2xl hover:scale-105 transition duration-500' />
<div className='absolute w-[150px] h-[150px] z-0 top-40 left-160 rounded-full bg-cyan-200/30 hover:bg-cyan-100/50 blur-2xl hover:scale-105 transition duration-500' />
      <p className='text-center text-white mb-5'><span style={{ fontFamily: '"Edu NSW ACT Cursive", cursive', fontSize: '28px'  }}>Veara</span> <br/> <span className='text-gray-300 text-lg font-light' style={{ fontFamily: ['"Truculenta"', 'sans-serif'], fontSize: '22px'  }}>Forecasting Tomorrow, Today</span></p>
     {/* Weather Card */}
    <div className="z-10 relative bg-gradient-to-br from-black/30 to-black/50  border border-gray-200/40 backdrop-blur-[4px]  rounded-2xl shadow-2xl ">
    
    {/* Search bar */}
    <div className=" flex items-center justify-center gap-2 mx-4 mt-4 md:mx-5 md:mt-3">
      <input
        ref={inputRef}
        aria-label='Search'
        type="text"
        placeholder="Enter city"
        className=" text-left px-1 py-2 md:px-5 md:py-1.5 rounded-full placeholder-gray-400 bg-transparent border-2 border-gray-400 text-white outline-none"
        onKeyDown={(e) => {
          if (e.key === 'Enter') search(inputRef.current.value);
        }}
      />
      <button
      aria-label='Search'
        className="p-2.5 justify-center items-center  rounded-full text-white bg-black/20 cursor-pointer hover:bg-white/10 hover:scale-102 transition duration-500"
        onClick={() => search(inputRef.current.value)}
      ><IoSearch size={20}/>
      </button>
    </div>
    {loading && (
      <div className="flex justify-center text-white items-center mt-4">Loading...
        <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin  z-50"></div>
      </div>
    )}


    {/* Weather display (conditional) */}
    {weatherData && (
      <>
        <img src={weatherData.icon} alt="weather" className="w-24 mx-auto my-4" />
        <p className='text-white text-lg text-center'>{weatherData.condition}</p>
        <p className="text-white text-4xl text-center font-semibold">{weatherData.temperature}°C</p>
        <p className="text-gray-300 text-md font-medium text-center mb-4">{weatherData.location}</p>

        <div className="flex justify-center ">
        <div className='w-full flex items-center justify-center border border-gray-200/50 bg-gray-500/20 hover:bg-gray-400/20 duration-500 hover:scale-101 transition-all transform-gpu will-change-transform rounded-xl p-4 mb-2 mx-3'>
        <div className="flex items-center text-gray-300 gap-10 text-sm">
          <div className="flex items-center  gap-3 justify-center ">
            <WiHumidity className='text-3xl '/>
            <div>
              <p>{weatherData.humidity} %</p>
              <span className="text-xs font-semibold">Humidity</span>
            </div>
          </div>
          <div className="flex items-center  gap-3 justify-center">
            <FaWind className='text-3xl'/>
            <div>
              <p>{weatherData.windSpeed} km/h</p>
              <span className="text-xs font-semibold">Wind Speed</span>
            </div>
          </div>
        </div>
        </div>
        </div>
      </>
    )}
  </div>
  
      {forecastData.length > 0 && (
  <div className="w-80 md:w-90 max-w-full px-1 pb-3 md:px-5 md:pb-5 bg-gradient-to-br from-black/30 to-black/50 border border-gray-400/40 mt-3 rounded-lg backdrop-blur-[4px] shadow-2xl shadow-black/50">
    <h2 className=" text-white text-lg font-semibold mb-2 text-center">Next Forecast</h2>
    <div className="flex justify-between gap-2 overflow-x-auto scrollbar-hide hover:scale-102 transition duration-500 cursor-pointer">
      {forecastData.map((item, index) => (
        <div key={index} className="flex flex-col items-center bg-white/10 rounded-lg p-2 text-white w-[70px] transition-all duration-300">
          <p className="text-xs">{item.time}</p>
          <img
            src={`https://openweathermap.org/img/wn/${item.icon}.png`}
            alt={item.desc}
            className="w-8 h-8"
          />
          <p className="text-sm font-semibold">{item.temp}°C</p>
        </div>
      ))}
    </div>
  </div>
  
)}
<footer className="fixed bottom-2  mt-5 p-2 flex flex-col items-center text-gray-300">
  <div className="text-center hover:text-gray-100 font-medium" >Ashwin Haragi</div>
  <div className="flex justify-center gap-4 mt-1 text-gray-400 text-sm">
    <a
      href="https://github.com/ashwinharagi"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white transition"
    >
      <FiGithub size={20} />
    </a>
    <a
      href="https://linkedin.com/in/ashwinharagi"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white transition"
    >
      <LuLinkedin size={20} />
    </a>
  </div>
</footer>

</div>



);
    
  
};

export default Weather;
