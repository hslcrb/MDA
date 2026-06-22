import React, { useState, useEffect } from 'react';
import { Cloud, Wind, Droplets, Eye, Thermometer } from 'lucide-react';

// DMZ 지역 시뮬레이션 기상 데이터
function generateWeatherData() {
  const hour = new Date().getHours();
  const isNight = hour < 6 || hour > 20;
  const baseTemp = isNight ? 18 : 24;
  const temp = baseTemp + Math.floor(Math.random() * 4 - 2);

  return {
    temp,
    feelsLike: temp - 1,
    humidity: 65 + Math.floor(Math.random() * 20),
    windSpeed: 3 + Math.floor(Math.random() * 8),
    windDir: '북서',
    visibility: isNight ? '3.5km' : '8.2km',
    condition: isNight ? '맑음 (야간)' : '구름 조금',
    icon: isNight ? '🌙' : '⛅',
    precipitation: Math.random() > 0.7 ? '10%' : '0%',
  };
}

export default function WeatherPanel() {
  const [weather, setWeather] = useState(generateWeatherData);

  useEffect(() => {
    const interval = setInterval(() => {
      setWeather(generateWeatherData());
    }, 60000); // 1분마다 갱신
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card" id="weather-panel">
      <div className="card-header">
        <div className="card-title">
          <Cloud size={14} />
          DMZ 기상
        </div>
        <span className="card-badge">시뮬레이션</span>
      </div>
      <div className="card-body">
        <div className="weather-panel">
          <div className="weather-main">
            <div className="weather-icon">{weather.icon}</div>
            <div>
              <div className="weather-temp">{weather.temp}°C</div>
              <div className="weather-desc">{weather.condition}</div>
            </div>
          </div>
          <div className="weather-details">
            <div className="weather-detail-item">
              <Thermometer size={11} />
              체감 <span className="weather-detail-value">{weather.feelsLike}°C</span>
            </div>
            <div className="weather-detail-item">
              <Droplets size={11} />
              습도 <span className="weather-detail-value">{weather.humidity}%</span>
            </div>
            <div className="weather-detail-item">
              <Wind size={11} />
              풍속 <span className="weather-detail-value">{weather.windSpeed}m/s {weather.windDir}</span>
            </div>
            <div className="weather-detail-item">
              <Eye size={11} />
              시정 <span className="weather-detail-value">{weather.visibility}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
