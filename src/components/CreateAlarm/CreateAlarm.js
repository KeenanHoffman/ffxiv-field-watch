import React from 'react';
import Weatherfinder from '../../helpers/weather'
import './CreateAlarm.css'

var CreateAlarm = React.createClass({
	getInitialState: function() {
		return {
		 weatherList: [],
      display: "hide"
		}
	},
	onSubmit: function(e) {
		e.preventDefault()
		var start = this.refs.start.value.split(':')
		var end = this.refs.end.value.split(':')
		if(this.refs.title.value === '' || ((this.refs.start.value === '' || this.refs.end.value === '') && this.refs.currentWeather.value === '---')) return
		this.props.addAlarm({
			title: this.refs.title.value,
			start: this.refs.start.value === '' ? undefined : {hour: Number(start[0]), minute: Number(start[1])},
			end: this.refs.start.value === '' ? undefined : {hour: Number(end[0]), minute: Number(end[1])},
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
  showForm: function() {
    this.setState({
      display: 'show'
    })
  },
  hideForm: function() {
    this.setState({
      display: 'hide'
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
			<div id="createAlarm">
				<form ref="alarmForm" action="" onSubmit={this.onSubmit} className={this.state.display + " row"}>
          <div className="column">
            <label htmlFor="title">Title</label>
            <span className="form-item"><input name="title"type="text" ref="title" /></span>
          </div>
          <div className="column">
            <div>
              <label htmlFor="start">Start</label>
              <span className="form-item"><input name="start" type="time" ref="start" /></span>
            </div>
            <div>
              <label htmlFor="end">End</label>
              <span className="form-item"><input name="end" type="time" ref="end" /></span>
            </div>
            <div>
              <label htmlFor="travel">Travel Time(min)</label>
              <span className="form-item"><input name="travel" type="number" defaultValue="0" ref="travelTime" /></span>
            </div>
          </div>
          <div className="column">
            <div>
              <label htmlFor="location">Area</label>
              <span className="form-item">
                <select name="location" className="location" onChange={this.updateWeatherList} ref="location">
                  <option>---</option>
                  {locations}
                </select>
              </span>
            </div>
            <div>
              <label htmlFor="currentWeather">Current Weather</label>
              <span className="form-item">
                <select name="currentWeather" ref="currentWeather">
                  <option>---</option>
                  {weathers}
                </select>
              </span>
            </div>
            <label htmlFor="previousWeather">Previous Weather</label>
            <span className="form-item">
              <select name="previousWeather" ref="previousWeather">
                <option>---</option>
                {weathers}
              </select>
            </span>
          </div>
          <div className="column">
            <label>Notes</label>
            <textarea ref="notes" />
            <input type="submit" ref="submit" className="button-black" />
          </div>
				</form>
        <div id="toggleButtons" className="row">
          <button ref="show" className={(this.state.display === 'show' ? 'hide' : 'show') + " toggleForm"} onClick={this.showForm}>+</button>
          <button ref="hide" className={(this.state.display === 'show' ? 'show' : 'hide') + " toggleForm"} onClick={this.hideForm}>-</button>
        </div>
			</div>
		)
  }
})

export default CreateAlarm

