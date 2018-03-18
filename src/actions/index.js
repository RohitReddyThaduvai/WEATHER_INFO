import axios from 'axios';

export const FETCH_CURRENT_WEATHER = 'fetch_current_weather';
export const FETCH_CURRENT_FORECAST = 'fetch_current_forecast';

const API_KEY_WEATHER = '34d27241e483c5682d026d2016dadc23';
const ROOT_URL_WEATHER = 'https://api.openweathermap.org/data/2.5'

export function fetchCurrentWeather(city) {
    const request = axios.get(`${ROOT_URL_WEATHER}/forecast/daily/?appid=${API_KEY_WEATHER}&q=${city}`);
    
    return {
        type: FETCH_CURRENT_WEATHER,
        payload: request
    }
}

export function fetchCurrentWeatherCoord(latitude, longitude) {
    const request = axios.get(`${ROOT_URL_WEATHER}/forecast/daily/?appid=${API_KEY_WEATHER}&lat=${latitude}&lon=${longitude}`);

    return {
        type: FETCH_CURRENT_WEATHER,
        payload: request
    }
}

export function fetchForecastWeather(city) {
    const request = axios.get(`${ROOT_URL_WEATHER}/forecast/?appid=${API_KEY_WEATHER}&q=${city}`);

    return {
        type: FETCH_CURRENT_FORECAST,
        payload: request
    }
}

export function fetchForecastWeatherCoord(latitude, longitude) {
    const request = axios.get(`${ROOT_URL_WEATHER}/forecast/?appid=${API_KEY_WEATHER}&lat=${latitude}&lon=${longitude}`);

    return {
        type: FETCH_CURRENT_FORECAST,
        payload: request
    }
}
