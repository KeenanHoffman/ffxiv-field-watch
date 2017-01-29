import React from 'react'
import EorzeanClock from '../EorzeanClock/EorzeanClock'
import Weatherfinder from '../../helpers/weather'

function isSameWeatherPattern(alarm, epoch) {
	if(alarm.currentWeather === '') {
		return true
	} else {
		var currentWeather = Weatherfinder.getWeather(epoch, alarm.location)
		var previousWeatherTime = epoch - (8 * 175 * 1000)
		var previousWeather = Weatherfinder.getWeather(previousWeatherTime, alarm.location)
		if(alarm.currentWeather !== currentWeather) return false
		if(alarm.previousWeather !== '') {
			return alarm.previousWeather === previousWeather
		} else {
			return true
		}
	}
}

function isDuringAlarm(alarm, time, playAlarm) {
  var timeInMinutes = convertTimeToMinutes(time)
  var startInMinutes = convertTimeToMinutes(alarm.start)
  var endInMinutes = convertTimeToMinutes(alarm.end)
  var dayInMinutes = (23 * 60) + 59
  if(startInMinutes > endInMinutes) {
    return (timeInMinutes >= startInMinutes && timeInMinutes <= dayInMinutes) || (timeInMinutes <= endInMinutes  && timeInMinutes >= 0)
  } else {
    return (timeInMinutes >= startInMinutes && timeInMinutes <= endInMinutes) ? true : false
  }
}

function convertTimeToMinutes(time) {
  return (time.hour * 60) + time.minute
}

var Alarm = React.createClass({
	isAlarmSounding: function() {
    return isSameWeatherPattern(this.props.alarm, this.props.epoch) && isDuringAlarm(this.props.alarm, this.props.time, this.props.playAlarm)
	},
	render: function() {
		this.sounding = this.isAlarmSounding()
    if(this.sounding && this.props.alarm.shouldPlayAlarm) {
      this.props.alarm.shouldPlayAlarm = false
      this.props.playAlarm()
    }
    if(!this.sounding && !this.props.alarm.shouldPlayAlarm) {
      this.props.alarm.shouldPlayAlarm = true
    }
		var className = this.sounding ? 'sounding' : 'silent'
		var notes = this.sounding ? this.props.alarm.notes : ''
    var currentWeather = this.sounding ? this.props.alarm.currentWeather : ''
    var previousWeather = this.sounding ? this.props.alarm.previousWeather : ''
		return (
			<div className={className}>
				<EorzeanClock time={this.props.alarm.start} />
				<EorzeanClock time={this.props.alarm.end} />
				<p>{this.props.alarm.title}</p>
				<p>{this.props.alarm.location}</p>
				<p>{currentWeather}</p>
        <p>{previousWeather}</p>
				<p>{notes}</p>
			</div>
		)
	}
})

export default Alarm
