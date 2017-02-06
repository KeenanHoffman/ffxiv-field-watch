import React from 'react'
import './Alarms.css';
import Alarm from './Alarm'
import sound from './alarm.mp3'

var Alarms = React.createClass({
	render: function() {
		var epoch = this.props.epoch
		var time = this.props.time
		var alarms = this.props.alarms.map(function(alarm, key) {
			return <Alarm time={time} alarm={alarm} epoch={epoch} key={key} playAlarm={function() {
					new Audio(sound).play()
				}} />
		})
		return (
			<ul id="alarms">
				{alarms}
			</ul>
		)
	}
})

export default Alarms
