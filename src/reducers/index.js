import { combineReducers } from 'redux';
import WeatherReducer from './weather-reducer';
import ForecastReducer from './forecast-reducer';
import CityReducer from './city-reducer';

const rootReducer = combineReducers({
  weather: WeatherReducer,
  forecast: ForecastReducer,
  cityList: CityReducer
});

export default rootReducer;
