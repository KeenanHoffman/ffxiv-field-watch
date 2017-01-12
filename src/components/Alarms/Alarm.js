import React from 'react'
import EorzeanClock from '../EorzeanClock/EorzeanClock'
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
		if(startInMinutes > endInMinutes) {
			sounding = (timeInMinutes >= startInMinutes && (timeInMinutes <= dayInMinutes || (timeInMinutes >= 0 && timeInMinutes <= endInMinutes)))
		} else {
			sounding = (timeInMinutes >= startInMinutes && timeInMinutes <= endInMinutes) ? true : false
		}
		return sounding
	},
	render: function() {
		this.sounding = this.isAlarmSounding()
		var className = (this.sounding) ? 'sounding' : 'silent'
		return (
			<h1 className={className}>
				<EorzeanClock time={this.props.alarm.start} /> 
				<EorzeanClock time={this.props.alarm.end} /> {this.props.alarm.title}</h1>
		)
	}
})

export default Alarm
