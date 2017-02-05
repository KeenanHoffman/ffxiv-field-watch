import React from 'react';

var EorzeanClock = React.createClass({
	render() {
		function pad(num) {
 	  	return (num < 10 ? '0' : '') + num
		}
		var hour = pad((this.props.time.hour > 12 ? this.props.time.hour - 12 : this.props.time.hour))
		hour = (hour === '00' ? '12' : hour)
		var minute = pad(this.props.time.minute)
		var suffix = (this.props.time.hour < 12 ? 'am' : 'pm')
    return (
			<span className="eorzeanClock">{hour}:{minute}{suffix}</span>
		)
  }
})

export default EorzeanClock;
