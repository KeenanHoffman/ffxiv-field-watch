import React from 'react'
import EorzeanClock from '../EorzeanClock/EorzeanClock'
var Alarm = React.createClass({
	render: function() {
		return (
			<h1 className="alarm">
				<EorzeanClock time={this.props.alarm.start} /> 
				<EorzeanClock time={this.props.alarm.end} /> {this.props.alarm.title}</h1>
		)
	}
})

export default Alarm
