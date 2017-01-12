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
		ReactDOM.render(<Alarm time={{hour: 10, minute: 30}} alarm={newAlarm}/>, div)
	})
	it('should display an alarm\'s title', function() {
		var renderer = TestUtils.createRenderer();		
    renderer.render(
			<Alarm time={{hour: 10, minute: 30}} alarm={newAlarm}/>
    )
 
    var alarm = renderer.getRenderOutput();		
		expect(alarm.props.children[3]).toEqual('newAlarm')
	})
	it('should display an alarm\'s start time', function() {
		var renderer = TestUtils.createRenderer();		
    renderer.render(
			<Alarm time={{hour: 10, minute: 30}} alarm={newAlarm}/>
    )
 
    var alarm = renderer.getRenderOutput();		
		expect(alarm.props.children[0].props.time.hour).toEqual(10)
	})
	it('should display an alarm\'s end time', function() {
		var renderer = TestUtils.createRenderer();		
    renderer.render(
			<Alarm time={{hour: 10, minute: 30}} alarm={newAlarm}/>
    )
 
    var alarm = renderer.getRenderOutput();		
		expect(alarm.props.children[1].props.time.hour).toEqual(11)
	})
	it('should be sounding', function() {
		var alarm = TestUtils.renderIntoDocument(
			<Alarm time={{hour: 10, minute: 30}} alarm={newAlarm}/>
		)		
		expect(alarm.sounding).toEqual(true)
	})
	it('should not be sounding', function() {
		var alarm = TestUtils.renderIntoDocument(
			<Alarm time={{hour: 11, minute: 30}} alarm={newAlarm}/>
		)		
		expect(alarm.sounding).toEqual(false)
	})
	it('should be sounding within an hour', function() {
		var alarm = TestUtils.renderIntoDocument(
			<Alarm time={{hour: 10, minute: 30}} alarm={{
				title: 'newAlarm',
				start: {
					hour: 10,
					minute: 0
				},
				end: {
					hour: 10,
					minute: 45
				}
			}}/>
		)		
		expect(alarm.sounding).toEqual(true)
	})
	it('should be sounding overnight', function() {
		var alarm = TestUtils.renderIntoDocument(
			<Alarm time={{hour: 12, minute: 0}} alarm={{
				title: 'newAlarm',
				start: {
					hour: 11,
					minute: 0
				},
				end: {
					hour: 1,
					minute: 0
				}
			}}/>
		)		
		expect(alarm.sounding).toEqual(true)
	})
	it('should not be sounding overnight when the alarm is not between the start and end time', function() {
		var alarm = TestUtils.renderIntoDocument(
			<Alarm time={{hour: 1, minute: 30}} alarm={{
				title: 'newAlarm',
				start: {
					hour: 11,
					minute: 0
				},
				end: {
					hour: 1,
					minute: 0
				}
			}}/>
		)		
		expect(alarm.sounding).toEqual(false)
	})
	it('should have class sounding if the alarm is sounding', function() {
		var renderer = TestUtils.createRenderer();		
    renderer.render(
			<Alarm time={{hour: 10, minute: 30}} alarm={newAlarm}/>
    )
 
    var alarm = renderer.getRenderOutput();		
		expect(alarm.props.className).toEqual('sounding')
	})
	it('should have class silent if the alarm is not sounding', function() {
		var renderer = TestUtils.createRenderer();		
    renderer.render(
			<Alarm time={{hour: 11, minute: 30}} alarm={newAlarm}/>
    )
 
    var alarm = renderer.getRenderOutput();		
		expect(alarm.props.className).toEqual('silent')
	})
	it('should be sounding then silent when it ends', function() {
		const div = document.createElement('div');
		var alarm = ReactDOM.render(<Alarm time={{hour: 11, minute: 0}} alarm={newAlarm}/>, div)
		expect(alarm.sounding).toEqual(true)

		ReactDOM.render(<Alarm time={{hour: 11, minute: 1}} alarm={newAlarm}/>, div)
		expect(alarm.sounding).toEqual(false)
	})
})

describe('Alarms', function() {
	var alarms = [newAlarm, newAlarm]

	it('should render without crashing', function() {
		const div = document.createElement('div')
		ReactDOM.render(<Alarms time={{hour: 10, minute: 30}} alarms={alarms}/>, div)
	})
	it('should display a list of alarms', function() {
		var renderer = TestUtils.createRenderer();		
    renderer.render(
			<Alarms time={{hour: 10, minute: 30}} alarms={alarms}/>
    )
 
    var alarm = renderer.getRenderOutput();		
		expect(alarm.props.children.length).toEqual(2)
	})
	it('should pass an alarm to Alarm', function() {
		var renderer = TestUtils.createRenderer();		
    renderer.render(
			<Alarms time={{hour: 10, minute: 30}} alarms={alarms}/>
    )
 
    var alarm = renderer.getRenderOutput();		
		expect(alarm.props.children[0].props.alarm.title).toEqual('newAlarm')
	})
})
