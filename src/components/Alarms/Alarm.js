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
    var weatherIsCorrectWithTravelTime = isSameWeatherPattern(this.props.alarm, this.props.epoch + ((8 * 175 * 1000) * (this.props.alarm.travelTime / 60)))

    var timeCheck
    var timeIsBetweenEndTimeMinusTravelTimeAndEndTime
    if(this.props.alarm.start === undefined) {
      timeCheck = true
      timeIsBetweenEndTimeMinusTravelTimeAndEndTime = false
    } else {
      var timeInMinutes = convertTimeToMinutes(this.props.time)
      var startInMinutes = convertTimeToMinutes(this.props.alarm.start)
      var endInMinutes = convertTimeToMinutes(this.props.alarm.end)

      var timeIsCorrect = isDuringAlarm(timeInMinutes, startInMinutes, endInMinutes)
      var timeIsCorrectWithTravelTime = isDuringAlarm(timeInMinutes + this.props.alarm.travelTime, startInMinutes, endInMinutes)

      var timeIsBetweenTravelTimeAndAlarmStart = isDuringAlarm(timeInMinutes, startInMinutes - this.props.alarm.travelTime, startInMinutes)
      timeIsBetweenEndTimeMinusTravelTimeAndEndTime = isDuringAlarm(timeInMinutes, endInMinutes - this.props.alarm.travelTime, endInMinutes)

      timeCheck = ((timeIsCorrect || timeIsBetweenTravelTimeAndAlarmStart) && (timeIsCorrectWithTravelTime || timeIsBetweenEndTimeMinusTravelTimeAndEndTime))
    }
    var weatherCheck = (weatherIsCorrect || (weatherIsCorrectWithTravelTime && !timeIsBetweenEndTimeMinusTravelTimeAndEndTime))
    return weatherCheck && timeCheck
	},
  shouldPlayAlarm: true,
	render: function() {
		this.sounding = this.isAlarmSounding()
    if(this.sounding && this.shouldPlayAlarm) {
      this.shouldPlayAlarm = false
      this.props.playAlarm()
    }
    if(!this.sounding && !this.shouldPlayAlarm) {
      this.shouldPlayAlarm = true
    }
		var className = this.sounding ? 'sounding' : 'silent'
		var notes = this.sounding ? this.props.alarm.notes : ''
    var currentWeather = this.sounding ? this.props.alarm.currentWeather : ''
    var previousWeather = this.sounding ? this.props.alarm.previousWeather : ''
    var startClock = this.props.alarm.start === undefined ? <p></p> : <EorzeanClock time={this.props.alarm.start} />
    var endClock = this.props.alarm.end === undefined ? <p></p> : <EorzeanClock time={this.props.alarm.end} />
		return (
			<div className={className + " row"}>
				<p className="column column-10">{this.props.alarm.title}</p>
        {startClock}
        <p>-</p>
        {endClock}
				<p className="column column-10">{this.props.alarm.location}</p>
				<p className="column column-10">{currentWeather}</p>
        <p className="column column-10">{previousWeather}</p>
				<p className="column column-50">{notes}</p>
			</div>
		)
	}
})

export default Alarm
