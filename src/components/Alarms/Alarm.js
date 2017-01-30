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

function isDuringAlarm(timeInMinutes, startInMinutes, endInMinutes) {
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



    var weatherIsCorrect = isSameWeatherPattern(this.props.alarm, this.props.epoch)
    var weatherIsCorrectWithTravelTime = isSameWeatherPattern(this.props.alarm, this.props.epoch + (2 * 175 * 1000))

    var timeInMinutes = convertTimeToMinutes(this.props.time)
    var startInMinutes = convertTimeToMinutes(this.props.alarm.start)
    var endInMinutes = convertTimeToMinutes(this.props.alarm.end)

    var timeIsCorrect = isDuringAlarm(timeInMinutes, startInMinutes, endInMinutes)
    var timeIsCorrectWithTravelTime = isDuringAlarm(timeInMinutes + this.props.alarm.travelTime, startInMinutes, endInMinutes)

    //console.log(weatherIsCorrect)
    //console.log(weatherIsCorrectWithTravelTime)
    //console.log(timeIsCorrect)
    //console.log(timeIsCorrectWithTravelTime)
    var timeIsBetweenTravelTimeAndAlarmStart = isDuringAlarm(timeInMinutes, startInMinutes - this.props.alarm.travelTime, startInMinutes)
    var timeIsBetweenEndTimeMinusTravelTimeAndEndTime = isDuringAlarm(timeInMinutes, endInMinutes - this.props.alarm.travelTime, endInMinutes)

    var weatherCheck = (weatherIsCorrect || (weatherIsCorrectWithTravelTime && !timeIsBetweenEndTimeMinusTravelTimeAndEndTime))
    var timeCheck = ((timeIsCorrect || timeIsBetweenTravelTimeAndAlarmStart) && (timeIsCorrectWithTravelTime || timeIsBetweenEndTimeMinusTravelTimeAndEndTime))
    console.log(timeCheck)
    console.log(weatherCheck)
    return weatherCheck && timeCheck
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
