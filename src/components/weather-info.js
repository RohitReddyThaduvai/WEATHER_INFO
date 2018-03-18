import _ from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchCurrentWeather, fetchCurrentWeatherCoord } from '../actions/index';
import { Link } from 'react-router-dom';
import SearchBar from '../components/search-bar';

class WeatherInfo extends Component {
    componentDidMount() {
         const { place } = this.props.match.params;
         if(place !== undefined && !this.props.placeForecast) {
            const { place } = this.props.match.params;
            this.props.fetchCurrentWeather(place);
         }else {
            this.geoLocation();
        }
    }

    geoLocation() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                this.props.fetchCurrentWeatherCoord(latitude, longitude);
            });
        }else {
            console.log("cannot get geo location")
        }
    }

    render() {
        return (
           <SearchBar />
        )
    }
}

function mapStateToProps({ weather }, ownProps) {
    return { placeForecast: weather[ownProps.match.params.place] };
}

export default connect(mapStateToProps, { fetchCurrentWeather, fetchCurrentWeatherCoord })(WeatherInfo);