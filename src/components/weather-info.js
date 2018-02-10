import _ from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';

class WeatherInfo extends Component {

     constructor(props) {
        super(props);

        this.state = { temp_now:'', isdeg:true, wind_speed:'', pressure_val:'' };
        this.toggleTemprature = this.toggleTemprature.bind(this);
       
    }

    toggleTemprature(weather) {
        if(this.state.isdeg) {
            console.log("toggle true")
            this.setState({temp_now:_.round(weather.temp.day -273.15), isdeg: false, wind_speed:_.round(3.6*weather.speed), pressure_val:_.round(0.1*weather.pressure)});
        }else{
            console.log("toggle false")
            this.setState({temp_now:_.round(weather.temp.day*1.8 -459.67), isdeg: true, wind_speed:_.round(2.23694*weather.speed), pressure_val:_.round(0.014503773773022*weather.pressure)});
        }
    }

    componentDidMount() {
        const { weather } = this.props;
        const weatherToday = weather.list[0];
        this.toggleTemprature(weatherToday);
    }

    componentWillReceiveProps(nextProps) {
        const { weather } = nextProps;
        const weatherToday = weather.list[0];
        if(!this.state.isdeg) {
            console.log("next true")
            this.setState({temp_now: _.round(weatherToday.temp.day -273.15), wind_speed:_.round(3.6*weatherToday.speed), pressure_val:_.round(0.1*weatherToday.pressure)})
        }else{
            console.log("next falsess")
            this.setState({temp_now: _.round(weatherToday.temp.day*1.8 -459.67), wind_speed:_.round(2.23694*weatherToday.speed), pressure_val:_.round(0.014503773773022*weatherToday.pressure)})
        }      
    }

    render() {
        const { weather } = this.props;
        const weatherToday = weather.list[0];
        
        return (
            
            <div className="row weather-parent">
                <div className="col-sm-12 place-name">
                    <h1>{weather.city.name}</h1>,
                    <h6> {weather.city.country}</h6>
                </div>
                <div className="weather-info">
                    <div className="col-sm-4 col-xs-12 col-md-4 col-lg-2">
                        <div className="col-xs-12"><h4>{weatherToday.weather[0].main}</h4></div>
                        <div className="col-xs-12"><img src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-11/512/Cloud-icon.png" className="icon"/></div>
                    </div>
                    <div className="col-sm-8 col-xs-12 col-md-8 col-lg-5 temp-now" onClick={() => this.toggleTemprature(weatherToday)}>
                        <h2>{this.state.temp_now}</h2> <h4>{this.state.isdeg == false ? "°C" : "°F"}</h4>
                    </div>
                    <div className="col-sm-12 col-xs-12 col-md-12 col-lg-5">
                        <table className="table wind-table">
                            <thead>Wind & Pressure </thead>
                            <tbody>
                                <tr>
                                    <th>Wind <br/>{this.state.wind_speed} {this.state.isdeg == false ? "km/hr" : "mph"}</th>
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
                                    <th className="pressure-val">{this.state.pressure_val} {this.state.isdeg == false ? "kPa" : "psi"}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm-12">
                        <p>Weather Forecast for 5 days</p>
                        {/*{this.renderForecast(weather)}*/}
                    </div>
                </div>
            </div>
            
        );
    }
}

function mapStateToProps({ weather }) {
    return { weather };
}

export default connect(mapStateToProps)(WeatherInfo);