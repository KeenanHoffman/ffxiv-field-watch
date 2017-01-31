import React from 'react';
import Weatherfinder from '../../helpers/weather'

var CreateAlarm = React.createClass({
	getInitialState: function() {
		return {
		 weatherList: []
		}
	},
	onSubmit: function(e) {
		e.preventDefault()
		var start = this.refs.start.value.split(':')
		var end = this.refs.end.value.split(':')
		if(this.refs.title.value === '' || start[0] === '' || end[0] === '') return
		this.props.addAlarm({
			title: this.refs.title.value,
			start: {
				hour: Number(start[0]),
				minute: Number(start[1])
			},
			end: {
				hour: Number(end[0]),
				minute: Number(end[1])
			},
			notes: this.refs.notes.value,
			location: this.refs.location.value === '---' ? '' : this.refs.location.value,
			currentWeather: this.refs.currentWeather.value === '---' ? '' : this.refs.currentWeather.value,
			previousWeather: this.refs.previousWeather.value === '---' ? '' : this.refs.previousWeather.value,
      travelTime: Number(this.refs.travelTime.value)
		})
	},
	updateWeatherList: function() {
		this.setState({
			weatherList: Weatherfinder.weatherLists[this.refs.location.value]
		})
	},
  render() {
		var locations = Object.keys(Weatherfinder.weatherLists).map(function(location, key) {
			return <option key={key} >{location}</option>
		})
		var weathers = this.state.weatherList.map(function(weather, key) {
			return <option key={key} >{weather}</option>
		})
    return (
			<div>
				<form action="" onSubmit={this.onSubmit}>
					<input ref="title" />
					<input type="time" ref="start" />
					<input type="time" ref="end" />
          <input type="number" defaultValue="0" ref="travelTime" />
					<select className="location" onChange={this.updateWeatherList} ref="location">
						<option>---</option>
						{locations}
					</select>
					<select ref="currentWeather">
						<option>---</option>
						{weathers}
					</select>
					<select ref="previousWeather">
						<option>---</option>
						{weathers}
					</select>
					<textarea rows="4" cols="50" ref="notes" />
          <input type="submit" ref="submit" />
				</form>
			</div>
		)
  }
})

export default CreateAlarm

