import _ from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';

class WeatherForecast extends Component {
    
    constructor(props) {
        super(props);

        this.state = { date:[], day:[], current_month:[], temp_now:[], temp_max:[], temp_min:[], pressure:[],wind_speed:[], snowfall:[], description: [], rainfall:[], icon: [], isdeg: true};
        this.toggleWeatherDetails = this.toggleWeatherDetails.bind(this);
        this.renderForecast = this.renderForecast.bind(this);
    }

    formatDate(givenDate) {
        const dateObj = new Date(givenDate * 1000);
        const weekday = new Array(7);
        weekday[0] =  "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        var month = new Array(12);
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sep";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
        
        this.setState(prevState => ({
            date: [...prevState.date, dateObj.getDate()], day: [...prevState.day, weekday[dateObj.getDay()]], current_month: [...prevState.current_month, month[dateObj.getMonth()]]
        }));
    }

    toggleWeatherDetails(weather) {
        if(this.state.isdeg) {
            this.setState({ date:[], day:[], current_month:[], temp_now:[], temp_max:[], temp_min:[], pressure:[],wind_speed:[], snowfall:[], description: [], isdeg: false, rainfall: [], icon: [] }) 
            _.map(weather.list, days => {
                this.formatDate(days.dt);               
                this.setState(prevState => ({
                   wind_speed: [...prevState.wind_speed, _.round(3.6*days.speed)], temp_now: [...prevState.temp_now, _.round(days.temp.day - 273.15)], temp_min: [...prevState.temp_min, _.round(days.temp.min - 273.15)], temp_max: [...prevState.temp_max, _.round(days.temp.max - 273.15)], description: [...prevState.description, days.weather[0].main], pressure: [...prevState.pressure, _.round(0.1*days.pressure)], snowfall: [...prevState.snowfall, _.round(days.snow + 1)], rainfall: [...prevState.rainfall, _.round(days.rain + 1)], icon: [...prevState.icon, days.weather[0].icon]  
                }))
            });
        }else {
            this.setState({ date:[], day:[], current_month:[], temp_now:[], temp_max:[], temp_min:[], pressure:[],wind_speed:[], snowfall:[], description: [], isdeg: true, rainfall: [], icon: [] })
            _.map(weather.list, days => {
                this.formatDate(days.dt);
                this.setState(prevState => ({
                    wind_speed: [...prevState.wind_speed, _.round(2.23694*days.speed)], temp_now: [...prevState.temp_now, _.round(days.temp.day*1.8 - 459.67)], temp_min: [...prevState.temp_min, _.round(days.temp.min*1.8 - 459.67)], temp_max: [...prevState.temp_max, _.round(days.temp.max*1.8 - 459.67)], description: [...prevState.description, days.weather[0].main], pressure: [...prevState.pressure, _.round(0.014503773773022*days.pressure)], snowfall: [...prevState.snowfall, _.round(days.snow + 1)], rainfall: [...prevState.rainfall, _.round(days.rain + 1)], icon: [...prevState.icon, days.weather[0].icon]    
                }))
            });
        } 
    }

    componentDidMount() {
        const { weather } = this.props;
        this.toggleWeatherDetails(weather);        
    }

    componentWillReceiveProps(nextProps) {
        const { weather } = nextProps;
        if(!this.state.isdeg) {
             this.setState({ date:[], day:[], current_month:[], temp_now:[], temp_max:[], temp_min:[], pressure:[],wind_speed:[], snowfall:[], description: [], rainfall: [], icon: [] })
            _.map(weather.list, days => {
                this.formatDate(days.dt);
                this.setState(prevState => ({
                    wind_speed: [ ...prevState.wind_speed, _.round(3.6*days.speed)], temp_now: [...prevState.temp_now, _.round(days.temp.day - 273.15)], temp_min: [...prevState.temp_min, _.round(days.temp.min - 273.15)], temp_max: [...prevState.temp_max, _.round(days.temp.max - 273.15)], description: [...prevState.description, days.weather[0].main], pressure: [...prevState.pressure, _.round(0.1*days.pressure)], snowfall: [...prevState.snowfall, _.round(days.snow + 1)], rainfall: [...prevState.rainfall, _.round(days.rain + 1)], icon: [...prevState.icon, days.weather[0].icon]    
                }));
            });
        }else{
             this.setState({ date:[], day:[], current_month:[], temp_now:[], temp_max:[], temp_min:[], pressure:[],wind_speed:[], snowfall:[], description: [], rainfall: [], icon: [] })
            _.map(weather.list, days => {
                this.formatDate(days.dt);
                this.setState(prevState => ({
                    wind_speed: [ ...prevState.wind_speed, _.round(2.23694*days.speed)], temp_now: [...prevState.temp_now, _.round(days.temp.day*1.8 - 459.67)], temp_min: [...prevState.temp_min, _.round(days.temp.min*1.8 - 459.67)], temp_max: [...prevState.temp_max, _.round(days.temp.max*1.8 - 459.67)], description: [...prevState.description, days.weather[0].main], pressure: [...prevState.pressure, _.round(0.014503773773022*days.pressure)], snowfall: [...prevState.snowfall, _.round(days.snow + 1)], rainfall: [...prevState.rainfall,_.round(days.rain + 1)], icon: [...prevState.icon, days.weather[0].icon]    
                }));
            });
        }      
    }

    renderForecast(weather) {
        var i = -1;
        return _.map(weather.list, days =>{
            i++;
            let snowvalue = 0;
            let rainvalue = 0
            if(!isNaN(this.state.rainfall[i])){
                rainvalue = (this.state.rainfall[i] <= 10 ? this.state.rainfall[i] : 10);
            }
            if(!isNaN(this.state.snowfall[i])) {
                snowvalue = (this.state.snowfall[i] <= 10 ? this.state.snowfall[i] : 10);
            }
            const fallvalue = (rainvalue >= snowvalue ? rainvalue : snowvalue) * 10;
            const iconvalue = (this.state.icon[i] !== undefined ? this.state.icon[i] : '01d');
            return (
                <div key={days.dt} className="col-sm-12 col-xs-12 forecast-weather">
                    <div className="col-xs-3 col-sm-4"><p className="week-name">{this.state.day[i]}</p><p>{this.state.current_month[i]} {this.state.date[i]}</p></div>
                    <div className="col-xs-2 col-sm-2">
                        <img src={require(`./assets/weather/icons/${iconvalue}.png`)} alt="" className="icon"/>
                    </div>
                    <div className="col-xs-2 col-sm-2">
                        <img src={`https://s.yimg.com/os/weather/1.0.1/precipitation/54x60/rain_ico_${fallvalue}@2x.png`} className="icon" alt="" /><span className="small-font">{fallvalue}%</span>
                    </div>
                    <div className="col-xs-5 col-sm-4">&uarr; {this.state.temp_max[i]}° &nbsp; &darr; {this.state.temp_min[i]}°</div>
                </div>
            )
        }); 
    }

    render() {
        const { weather } = this.props;
        const iconmain = (this.state.icon[0] !== undefined ? this.state.icon[0] : '01d');
        const imgsource = require(`./assets/weather/${iconmain}.jpg`);
        const backgroundStyle = {
            backgroundImage: 'url('+`${imgsource}`+')'
        }

        return(
            <div className="row weather-parent" style={ backgroundStyle }>
                <div className="col-sm-12 place-name">
                    <h1>{weather.city.name}</h1>,
                    <h6> {weather.city.country}</h6>
                </div>
                <div className="col-sm-12 weather-info">
                    <div className="col-sm-4 col-xs-12 col-md-4 col-lg-2">
                        <div className="col-xs-12"><h4>{weather.list[0].weather[0].main}</h4></div>
                        <div className="col-xs-12">
                            <img src={require(`./assets/weather/icons/${iconmain}.png`)} className="icon" alt="" />
                        </div>
                    </div>
                    <div className="col-sm-8 col-xs-12 col-md-8 col-lg-5 temp-now" onClick={() => this.toggleWeatherDetails(weather)}>
                        <h2>{this.state.temp_now[0]}</h2> <h4>{this.state.isdeg == false ? "°C" : "°F"}</h4>
                    </div>
                    <div className="col-sm-12 col-xs-12 col-md-12 col-lg-5">
                        <table className="table wind-table">
                            <thead>Wind & Pressure </thead>
                            <tbody>
                                <tr>
                                    <th>Wind <br/>{this.state.wind_speed[0]} {this.state.isdeg == false ? "km/hr" : "mph"}</th>
                                    <th>
                                        <div className="wind-container"> 
                                            <div className="wind-mill-one">
                                                <div id="fan-one"></div>
                                                <div id="base-one"></div>
                                            </div>
                                            <div className="wind-mill-two">
                                                <div id="fan-two"></div>
                                                <div id="base-two"></div>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Pressure</th>
                                    <th className="pressure-val">{this.state.pressure[0]} {this.state.isdeg == false ? "kPa" : "psi"}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row col-sm-12 col-xs-12 forecast-parent">
                    <p>Weather Forecast for 5 days</p>
                    {this.renderForecast(weather)}
                </div>
            </div>
        );
    }
}

function mapStateToProps({ weather }) {
    return { weather };
}
export default connect(mapStateToProps)(WeatherForecast);