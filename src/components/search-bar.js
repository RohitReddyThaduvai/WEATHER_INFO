import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentWeather, fetchCurrentWeatherCoord } from '../actions/index';
import { Link } from 'react-router-dom';
import WeatherInfo from '../components/weather-info';
import WeatherForecast from '../components/weather-forecast';

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = { term:''};
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(event) {
        this.setState({term: event.target.value});
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.props.fetchCurrentWeather(this.state.term);
        this.setState({term: ''});
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

    componentDidMount() {
        this.geoLocation();
    }

    renderWeather() {
        const { weather } = this.props;
        if(Object.keys(weather).length !== 0) {
            return (
                <div>
                    <div><WeatherForecast /></div>
               </div>
            )
        }
        return <div>Search for a place to know about the weather and news.</div>
    }

    render(){

        const { weather } = this.props;

        return (
            <div className="row parent-container">
                <div className="col-lg-12 hidden-md-down">
                    Top footer
                </div>
                <div className="col-lg-2 col-md-3">
                    Recent search
                </div>
                <div className="col-sm-12 col-md-9 col-lg-8 left-grid">
                    <div className="col-md-10 col-sm-12" id="search-bar">
                        <form onSubmit={this.onFormSubmit} className="input-group">
                            <input
                                placeholder="Search"
                                className="form-control" 
                                value={this.state.term}
                                onChange={this.onInputChange} />
                            <div className="input-group-btn">
                                <button type="submit" className="btn btn-primary">Search</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-12 col-md-12">
                        {this.renderWeather()}
                    </div>
                </div>
                <div className="col-lg-2 hidden-md-down">
                    Recent search
                </div>
            </div>        
        );
    }
}

function mapStateToProps({ weather }, ownProps) {
    return { weather: weather }
}

export default connect(mapStateToProps, { fetchCurrentWeather, fetchCurrentWeatherCoord })(SearchBar);