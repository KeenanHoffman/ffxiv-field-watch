import React from 'react'
import './Alarms.css';
import Alarm from './Alarm'
var Alarms = React.createClass({
	render: function() {
		var epoch = this.props.epoch
		var time = this.props.time
		var alarms = this.props.alarms.map(function(alarm, key) {
			var tone = 'http://download1875.mediafire.com/0o0xdoysv2tg/koqi9jp1yslu71k/Chocobo+Wark%21+Ringtone%28Dracotonis%29.mp3'
			return <Alarm time={time} alarm={alarm} epoch={epoch} key={key} playAlarm={function() {
					new Audio(tone).play()
				}} />
		})
		return (
			<ul>
				{alarms}
			</ul>
		)
	}
})

export default Alarms
