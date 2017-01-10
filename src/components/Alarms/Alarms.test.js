import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from "react-addons-test-utils";
import shallowTestUtils from "react-shallow-testutils";
import Alarm from './Alarm'
import Alarms from './Alarms'

var newAlarm = {
	title: 'newAlarm',
	start: {
		hour: 10,
		minute: 0
	},
	end: {
		hour: 11,
		minute: 0
	}		
}


describe('Alarm', function() {
	it('should render without crashing', function() {
		const div = document.createElement('div');
		ReactDOM.render(<Alarm alarm={newAlarm}/>, div)
	})
	it('should have className alarm', function() {
		var renderer = TestUtils.createRenderer();		
    renderer.render(
			<Alarm alarm={newAlarm}/>
    )
 
    var alarm = renderer.getRenderOutput();		
		expect(alarm.props.className).toEqual('alarm')
	})
	it('should display an alarm\'s title', function() {
		var renderer = TestUtils.createRenderer();		
    renderer.render(
			<Alarm alarm={newAlarm}/>
    )
 
    var alarm = renderer.getRenderOutput();		
		expect(alarm.props.children[3]).toEqual('newAlarm')
	})
	it('should display an alarm\'s start time', function() {
		var renderer = TestUtils.createRenderer();		
    renderer.render(
			<Alarm alarm={newAlarm}/>
    )
 
    var alarm = renderer.getRenderOutput();		
		expect(alarm.props.children[0].props.time.hour).toEqual(10)
	})
	it('should display an alarm\'s end time', function() {
		var renderer = TestUtils.createRenderer();		
    renderer.render(
			<Alarm alarm={newAlarm}/>
    )
 
    var alarm = renderer.getRenderOutput();		
		expect(alarm.props.children[1].props.time.hour).toEqual(11)
	})
})

describe('Alarms', function() {
	var alarms = [newAlarm, newAlarm]

	it('should render without crashing', function() {
		const div = document.createElement('div')
		ReactDOM.render(<Alarms alarms={alarms}/>, div)
	})
	it('should display a list of alarms', function() {
		var renderer = TestUtils.createRenderer();		
    renderer.render(
			<Alarms alarms={alarms}/>
    )
 
    var alarm = renderer.getRenderOutput();		
		expect(alarm.props.children.length).toEqual(2)
	})
	it('should pass an alarm to Alarm', function() {
		var renderer = TestUtils.createRenderer();		
    renderer.render(
			<Alarms alarms={alarms}/>
    )
 
    var alarm = renderer.getRenderOutput();		
		expect(alarm.props.children[0].props.alarm.title).toEqual('newAlarm')
	})
})
