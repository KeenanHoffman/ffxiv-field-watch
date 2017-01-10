import React from 'react';
import './App.css';
import EorzeanClock from '../EorzeanClock/EorzeanClock'
import Alarms from '../Alarms/Alarms'
import CreateAlarm from '../CreateAlarm/CreateAlarm'
import helpers from '../../helpers/helpers'

var App = React.createClass({
	getInitialState: function() {
		setInterval(function() {
			this.setState({
				time: helpers.getEorzeanTime(new Date().getTime())
			})
		}.bind(this), 2000)
		return {
			time: helpers.getEorzeanTime(new Date().getTime())
		}
	},
  render() {
    return (
			<div>
				<EorzeanClock time={this.state.time} />
				<Alarms alarms={[]}/>
				<CreateAlarm addAlarm={function(){}}/>
			</div>
		)
  }
})

export default App;
