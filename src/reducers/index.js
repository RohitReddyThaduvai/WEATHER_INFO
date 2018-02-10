import { combineReducers } from 'redux';
import WeatherReducer from './weather-reducer';
import ForecastReducer from './forecast-reducer';

const rootReducer = combineReducers({
  weather: WeatherReducer,
  forecast: ForecastReducer
});

export default rootReducer;
