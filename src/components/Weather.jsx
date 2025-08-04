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
import { WiDaySnowWind, WiHumidity, WiNightAltSnow, WiSunrise, WiSunset } from "react-icons/wi";
import { FaMoon, FaWind } from "react-icons/fa";
import { FiCloudRain, FiGithub } from "react-icons/fi";
import { LuCloud, LuCloudFog, LuCloudLightning, LuCloudMoon, LuCloudMoonRain, LuCloudRain, LuCloudSun, LuCloudSunRain, LuCloudy, LuLinkedin, LuSnowflake } from "react-icons/lu";
import { MdSunny } from "react-icons/md";


const allIcons = {
  '01d': <MdSunny className="text-white w-24 h-24 mx-auto my-4" />,
  '01n': <FaMoon className="text-white w-24 h-24 mx-auto my-4" />,
  '02d': <LuCloudSun className="text-white w-24 h-24 mx-auto my-4" />,
  '02n': <LuCloudMoon className="text-white w-24 h-24 mx-auto my-4" />,
  '03d': <LuCloud className="text-white w-24 h-24 mx-auto my-4" />,
  '03n': <LuCloud className="text-white w-24 h-24 mx-auto my-4" />,
  '04d': <LuCloudy className="text-white w-24 h-24 mx-auto my-4" />,
  '04n': <LuCloudy className="text-white w-24 h-24 mx-auto my-4" />,
  '09d': <LuCloudRain className="text-white w-24 h-24 mx-auto my-4" />,
  '09n': <LuCloudMoonRain className="text-white w-24 h-24 mx-auto my-4" />,
  '10d': <LuCloudSunRain className="text-white w-24 h-24 mx-auto my-4" />,
  '10n': <LuCloudMoonRain className="text-white w-24 h-24 mx-auto my-4" />,
  '11d': <LuCloudLightning className="text-white w-24 h-24 mx-auto my-4" />,
  '11n': <LuCloudLightning className="text-white w-24 h-24 mx-auto my-4" />,
  '13d': <LuSnowflake className="text-white w-24 h-24 mx-auto my-4" />,
  '13n': <LuSnowflake className="text-white w-24 h-24 mx-auto my-4" />,
  '50d': <LuCloudFog className="text-white w-24 h-24 mx-auto my-4" />,
  '50n': <LuCloudFog className="text-white w-24 h-24 mx-auto my-4" />,
};


const Weather = () => {
  const inputRef = useRef();

  const [loading, setLoading] = useState(false);

  const [forecastData, setForecastData] = useState([]);

  const [weatherData, setWeatherData] = useState(false);

      const formatUnixTime = (timestamp) => {
      const date = new Date(timestamp * 1000);
      return date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        // timeZone: 'Asia/Kolkata',// Adjust to your timezone
      });
    };


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
      sunrise: formatUnixTime(data.sys.sunrise),
      sunset: formatUnixTime(data.sys.sunset),
      country: data.sys.country,
    });

    // ✅ Await forecast to finish before stopping loader
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
    const res = await fetch(forecastUrl);
    const forecastJSON = await res.json();

    if (!res.ok) {
      toast.error(forecastJSON.message);
      return;
    }

   const dailyMap = new Map();

forecastJSON.list.forEach(item => {
  const date = new Date(item.dt_txt).toLocaleDateString('en-IN');
  if (!dailyMap.has(date)) {
    dailyMap.set(date, item); // pick first slot of the day (can improve later)
  }
});

const forecast = Array.from(dailyMap.values()).slice(0, 5).map(item => ({
  day: new Date(item.dt_txt).toLocaleDateString('en-IN', { weekday: 'short' }), // Mon, Tue...
  temp: Math.round(item.main.temp),
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
<div className='hidden md:block absolute w-[150px] h-[150px] z-0 top-50 left-130 rounded-full bg-blue-300/30 hover:bg-blue-200/50 blur-2xl hover:scale-105 transition duration-500' />
<div className='hidden md:block absolute w-[150px] h-[150px] z-0 top-22 left-140 rounded-full bg-indigo-300/30 hover:bg-indigo-200/50 blur-2xl hover:scale-105 transition duration-500' />
<div className='hidden md:block absolute w-[150px] h-[150px] z-0 top-40 left-160 rounded-full bg-cyan-200/30 hover:bg-cyan-100/50 blur-2xl hover:scale-105 transition duration-500' />
      <p className='absolute top-7 md:top-10 text-center text-white mb-5'><span style={{ fontFamily: '"Edu NSW ACT Cursive", cursive', fontSize: '28px'  }}>Veara</span> <br/> <span className='text-gray-300 text-lg font-light' style={{ fontFamily: ['"Truculenta"', 'sans-serif'], fontSize: '22px'  }}>Forecasting Tomorrow, Today</span></p>

    <div className='hidden md:flex absolute top-40 mt-1  gap-2 transform-gpu will-change-transform'>
      <div className="flex items-center gap-1 text-gray-300 bg-gradient-to-br from-black/30 to-black/50 text-sm font-medium px-1 rounded-xl backdrop-blur-[4px] hover:scale-105 hover:-translate-y-1 duration-500 shadow-2xl shadow-purple-400">
        <WiSunrise size={30} className='text-amber-400' />
          Sunrise: {(weatherData.sunrise) }
        </div>
        <div className="flex items-center gap-1 text-gray-300 bg-gradient-to-br from-black/30 to-black/50 text-sm font-medium px-1 py-0.5 rounded-xl backdrop-blur-[4px] hover:scale-105 hover:-translate-y-1 duration-500 shadow-2xl shadow-orange-500">
          <WiSunset size={30} className='text-orange-400' />
          Sunset: {(weatherData.sunset)}
        </div>
    </div>

        <div className='flex md:hidden z-10 absolute top-29 mt-1 justify-between space-x-27 '>
      <div className="flex items-center gap-1 text-gray-100 bg-gradient-to-br from-black/30 to-black/50 text-sm font-medium px-1 rounded-xl backdrop-blur-[4px] border border-gray-200/50  shadow-2xl shadow-orange-500">
        <WiSunrise size={30} className='text-amber-400' />
          {(weatherData.sunrise) }
        </div>
        <div className="flex items-center gap-1 text-gray-100 bg-gradient-to-br from-black/30 to-black/50 text-sm font-medium px-1 py-0.5 rounded-xl backdrop-blur-[4px] border border-gray-200/50 shadow-2xl shadow-purple-400">
          <WiSunset size={30} className='text-orange-400' />
          {(weatherData.sunset)}
        </div>
    </div>


     {/* Weather Card */}
    <div className="z-10 mt-5 relative  bg-gradient-to-br from-black/30 to-black/50  border border-gray-200/40 backdrop-blur-[4px]  rounded-2xl shadow-2xl ">
    
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
        <div> {weatherData.icon}</div> 
        <p className='text-white text-lg text-center'>{weatherData.condition}</p>
        <p className="text-white text-4xl text-center font-semibold">{weatherData.temperature}°C</p>
        <p className="text-gray-300 text-md font-medium text-center mb-4">{weatherData.location}<span> ({weatherData.country})</span></p>

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
  <div className="w-80 md:w-90 max-w-full  px-1 pb-3 md:px-5 md:pb-5 bg-gradient-to-br from-black/30 to-black/50 border border-gray-400/40 mt-3 rounded-lg backdrop-blur-[4px] shadow-2xl shadow-black/50">
    <h2 className=" text-white text-lg font-semibold mb-2 text-center">Next Forecast</h2>
    <div className="py-0 md:py-1 flex justify-between gap-2 overflow-x-hidden overflow-y-hidden scrollbar-hide  transition duration-500 cursor-pointer">
      {forecastData.map((item, index) => (
        <div key={index} className="flex flex-col items-center bg-white/10 rounded-lg p-2 text-white w-[70px]  hover:scale-103 duration-300 transition-all transform-gpu will-change-transform">
          <p className="text-xs font-medium">{item.day}</p>
          <div className="w-5 h-5 flex items-center justify-center mt-1 mb-1">
            {allIcons[item.icon] || <LuCloud className="text-white w-5 h-5" />}
          </div>

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
      href="https://github.com/Ashwin-RH"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white transition"
    >
      <FiGithub size={20} />
    </a>
    <a
      href="https://www.linkedin.com/in/ashwin-rh-aa263b217"
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
