import React from 'react';
import './App.css';
import EorzeanClock from '../EorzeanClock/EorzeanClock'
import Alarms from '../Alarms/Alarms'
import CreateAlarm from '../CreateAlarm/CreateAlarm'
import helpers from '../../helpers/helpers'
import logo from './color-icon.png'

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
		this.testableSetState({
			alarms: this.state.alarms
		})
		this.props.datastore.setItem('alarms', JSON.stringify(this.state.alarms))
	},
  deleteAlarm: function(index) {
    this.state.alarms.splice(index, 1)
		this.testableSetState({
			alarms: this.state.alarms
		})
		this.props.datastore.setItem('alarms', JSON.stringify(this.state.alarms))
  },
  render() {
    this.testableSetState = this.setState
    return (
			<div>
        <div id="clock">
          <span>ET </span>
          <EorzeanClock className="clockElement" time={this.state.time} />
        </div>
				<Alarms ref="alarms" deleteAlarm={this.deleteAlarm} time={this.state.time} epoch={new Date().getTime()} alarms={this.state.alarms}/>
				<CreateAlarm ref="createAlarm" addAlarm={this.addAlarm}/>
        <div className="legend row">
          <p className="column alarm-item">Title</p>
          <p className="column column-10 alarm-item">Travel Time</p>
          <p className="column column-20 alarm-item">Time</p>
          <p className="column column-20 alarm-item">Area</p>
          <p className="column column-10 alarm-item">Current Weather</p>
          <p className="column column-10 alarm-item">Previous Weather</p>
        </div>
        <img className="logo" src={logo} />
        <p className="header">FFXIV Field Watch</p>
			</div>
		)
  }
})

export default App;
