import React from 'react'
import './Alarms.css';
import Alarm from './Alarm'
var Alarms = React.createClass({
	render: function() {
		var time = this.props.time
		var alarms = this.props.alarms.map(function(alarm, key) {
			return <Alarm time={time} alarm={alarm} key={key} />
		})
		return (
			<ul>
				{alarms}
			</ul>
		)
	}
})

export default Alarms
