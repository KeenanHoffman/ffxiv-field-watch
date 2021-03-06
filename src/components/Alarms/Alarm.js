import React from 'react'
import EorzeanClock from '../EorzeanClock/EorzeanClock'
import Weatherfinder from '../../helpers/weather'
import arrow from './arrow.png'
import trashCan from './trashCan.png'

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
    var travelTimeForWeather = this.props.alarm.travelTime === 0 ? 0 : (this.props.alarm.travelTime / 60)
    var weatherIsCorrectWithTravelTime = isSameWeatherPattern(this.props.alarm, this.props.epoch + ((1 * 175 * 1000) * travelTimeForWeather))

    var timeCheck
    var timeIsBetweenEndTimeMinusTravelTimeAndEndTime
    var weatherCheck
    if(this.props.alarm.start === undefined) {
      timeCheck = true
      weatherCheck = (weatherIsCorrect || weatherIsCorrectWithTravelTime)
    } else {
      var timeInMinutes = convertTimeToMinutes(this.props.time)
      var startInMinutes = convertTimeToMinutes(this.props.alarm.start)
      var endInMinutes = convertTimeToMinutes(this.props.alarm.end)

      var timeIsCorrect = isDuringAlarm(timeInMinutes, startInMinutes, endInMinutes)
      var timeIsCorrectWithTravelTime = isDuringAlarm(timeInMinutes + this.props.alarm.travelTime, startInMinutes, endInMinutes)

      var timeIsBetweenTravelTimeAndAlarmStart = isDuringAlarm(timeInMinutes, startInMinutes - this.props.alarm.travelTime, startInMinutes)
      timeIsBetweenEndTimeMinusTravelTimeAndEndTime = isDuringAlarm(timeInMinutes, endInMinutes - this.props.alarm.travelTime, endInMinutes)

      timeCheck = ((timeIsCorrect || timeIsBetweenTravelTimeAndAlarmStart) && (timeIsCorrectWithTravelTime || timeIsBetweenEndTimeMinusTravelTimeAndEndTime))
      weatherCheck = (weatherIsCorrect || (weatherIsCorrectWithTravelTime && !timeIsBetweenEndTimeMinusTravelTimeAndEndTime))
    }
    return weatherCheck && timeCheck
	},
  deleteAlarm: function() {
    this.props.deleteAlarm(this.props.index)
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
    var startClock = this.props.alarm.start === undefined ? <p></p> : <EorzeanClock time={this.props.alarm.start} />
    var endClock = this.props.alarm.end === undefined ? <p></p> : <EorzeanClock time={this.props.alarm.end} />
    var dash = this.props.alarm.start === undefined ? '' : '-'
    var previousWeather = this.props.alarm.previousWeather === 'Thunderstorms' ? 'Thunder Storms' : this.props.alarm.previousWeather
    var currentWeather = this.props.alarm.currentWeather === 'Thunderstorms' ? 'Thunder Storms' : this.props.alarm.currentWeather
		return (
      <div className={className + " alarm"}>
        <div className="row center">
          <p className="column alarm-item title">{this.props.alarm.title}</p>
          <p className="column column-10 alarm-item travel-time">{this.props.alarm.travelTime + 'min'}</p>
          <div className="column column-20 alarm-item time">
            <span>
              {startClock}
              {dash}
              {endClock}
            </span>
          </div>
          <p className="column column-20 alarm-item area">{this.props.alarm.location}</p>
          <p className="column column-10 alarm-item current-weather">{currentWeather}</p>
          <img className="arrow" src={arrow} />
          <p className="column column-10 alarm-item previous-weather">{previousWeather}</p>
          <button className="delete" ref="delete" onClick={this.deleteAlarm}><img className="trash-can" src={trashCan} /></button>
        </div>
        <p className="row notes">{notes}</p>
      </div>
		)
	}
})

export default Alarm
