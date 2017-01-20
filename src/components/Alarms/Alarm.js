import React from 'react'
import EorzeanClock from '../EorzeanClock/EorzeanClock'
import Weatherfinder from '../../helpers/weather'

function isSameWeatherPattern(location, alarm, epoch) {
	if(alarm.currentWeather !== '') {
		var currentWeather = Weatherfinder.getWeather(epoch, location)
		var previousWeatherTime = epoch - (8 * 175 * 1000)
		var previousWeather = Weatherfinder.getWeather(previousWeatherTime, location)
		if(alarm.currentWeather !== currentWeather) return false
		if(alarm.previousWeather !== '') {
			if(alarm.previousWeather !== previousWeather) return false
			if(alarm.previousWeather === previousWeather) return true
		} else {
			return true
		}
	} else {
		return true
	}
}

var Alarm = React.createClass({
	isAlarmSounding: function() {
		var time = this.props.time
		var start = this.props.alarm.start
		var end = this.props.alarm.end
		var timeInMinutes = (time.hour * 60) + time.minute
		var startInMinutes = (start.hour * 60) + start.minute
		var endInMinutes = (end.hour * 60) + end.minute
		var dayInMinutes = (23 * 60) + 59
		var sounding
		if(!isSameWeatherPattern(this.props.alarm.location, this.props.alarm, this.props.epoch)) return false
		if(timeInMinutes === startInMinutes) this.props.playAlarm()
		if(startInMinutes > endInMinutes) {
			sounding = (timeInMinutes >= startInMinutes && timeInMinutes <= dayInMinutes) || (timeInMinutes <= endInMinutes  && timeInMinutes >= 0)
		} else {
			sounding = (timeInMinutes >= startInMinutes && timeInMinutes <= endInMinutes) ? true : false
		}
		return sounding
	},
	render: function() {
		this.sounding = this.isAlarmSounding()
		var className = (this.sounding) ? 'sounding' : 'silent'
		var notes = (this.sounding) ? this.props.alarm.notes : ''
		return (
			<div className={className}>
				<EorzeanClock time={this.props.alarm.start} /> 
				<EorzeanClock time={this.props.alarm.end} />
				<p>{this.props.alarm.title}</p>
				<p>{this.props.alarm.location}</p>
				<p>{this.props.alarm.currentWeather}</p>
				<p>{notes}</p>
			</div>
		)
	}
})

export default Alarm
