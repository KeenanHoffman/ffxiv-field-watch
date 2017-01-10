import React from 'react'
import Alarm from './Alarm'
var Alarms = React.createClass({
	render: function() {
		var alarms = this.props.alarms.map(function(alarm, key) {
			return <Alarm alarm={alarm} key={key} />
		})
		return (
			<ul>
				{alarms}
			</ul>
		)
	}
})

export default Alarms
