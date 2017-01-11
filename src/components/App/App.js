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
			time: helpers.getEorzeanTime(new Date().getTime()),
			alarms: []
		}
	},
	addAlarm: function(alarm) {
		this.state.alarms.push(alarm)
	},
  render() {
    return (
			<div>
				<EorzeanClock time={this.state.time} />
				<Alarms time={this.state.time} alarms={this.state.alarms}/>
				<CreateAlarm ref="createAlarm" addAlarm={this.addAlarm}/>
			</div>
		)
  }
})

export default App;
