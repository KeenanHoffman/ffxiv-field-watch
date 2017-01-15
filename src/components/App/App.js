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
		}.bind(this), 2900)
		var savedAlarms = this.props.datastore.getItem('alarms')
		savedAlarms = (savedAlarms == null) ? [] : JSON.parse(savedAlarms)
		return {
			time: helpers.getEorzeanTime(new Date().getTime()),
			alarms: savedAlarms
		}
	},
	addAlarm: function(alarm) {
		this.state.alarms.push(alarm)
		this.setState({
			alarms: this.state.alarms
		})
		this.props.datastore.setItem('alarms', JSON.stringify(this.state.alarms))
	},
  render() {
    return (
			<div>
				<EorzeanClock time={this.state.time} />
				<Alarms time={this.state.time} epoch={new Date().getTime()} alarms={this.state.alarms}/>
				<CreateAlarm ref="createAlarm" addAlarm={this.addAlarm}/>
			</div>
		)
  }
})

export default App;
