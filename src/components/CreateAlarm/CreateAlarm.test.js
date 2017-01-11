import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from "react-addons-test-utils"
import CreateAlarm from './CreateAlarm'
import ReactTestUtils from 'react-addons-test-utils'

describe('CreateAlarm', function() {
	it('renders without crashing', () => {
  	const div = document.createElement('div')
  	ReactDOM.render(<CreateAlarm />, div)
	})
	it('should add a new alarm', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		createAlarm.refs.title.value = 'newAlarm'		
		createAlarm.refs.start.value = '10:10'
		createAlarm.refs.end.value = '20:10'		
		ReactTestUtils.Simulate.submit(createAlarm.refs.title)
		expect(alarms.length).toEqual(1)
	})
	it('should add a title to a new alarm', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		createAlarm.refs.title.value = 'newAlarm'		
		createAlarm.refs.start.value = '10:10'				
		createAlarm.refs.end.value = '20:10'		
		ReactTestUtils.Simulate.submit(createAlarm.refs.title)
		expect(alarms[0].title).toEqual("newAlarm")		
	})
	it('should add a start time to a new alarm', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		createAlarm.refs.title.value = 'newAlarm'
		createAlarm.refs.start.value = '10:10'		
		createAlarm.refs.end.value = '20:10'		
		ReactTestUtils.Simulate.submit(createAlarm.refs.title)
		expect(alarms[0].start).toEqual({
			hour: 10,
			minute: 10
		})
	})
	it('should add an end time to a new alarm', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		createAlarm.refs.title.value = 'newAlarm'		
		createAlarm.refs.start.value = '10:10'
		createAlarm.refs.end.value = '20:10'
		ReactTestUtils.Simulate.submit(createAlarm.refs.title)
		expect(alarms[0].end).toEqual({
			hour: 20,
			minute: 10
		})
	})
	it('should not add an alarm without a title', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		ReactTestUtils.Simulate.submit(createAlarm.refs.title)
		expect(alarms.length).toEqual(0)
	})
	it('should not add an alarm without a start time', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		createAlarm.refs.title.value = 'newAlarm'		
		ReactTestUtils.Simulate.submit(createAlarm.refs.title)
		expect(alarms.length).toEqual(0)
	})
	it('should not add an alarm without a end time', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		createAlarm.refs.title.value = 'newAlarm'		
		createAlarm.refs.start.value = '10:10'		
		ReactTestUtils.Simulate.submit(createAlarm.refs.title)
		expect(alarms.length).toEqual(0)
	})
	it('time should work with single single digit numbers for hour and minute', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		createAlarm.refs.title.value = 'newAlarm'		
		createAlarm.refs.start.value = '01:01'
		createAlarm.refs.end.value = '09:09'
		ReactTestUtils.Simulate.submit(createAlarm.refs.title)
		expect(alarms[0].start).toEqual({
			hour: 1,
			minute: 1
		})		
		expect(alarms[0].end).toEqual({
			hour: 9,
			minute: 9
		})
	})
	it('time should work with 0 hours minutes', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		createAlarm.refs.title.value = 'newAlarm'		
		createAlarm.refs.start.value = '00:00'
		createAlarm.refs.end.value = '00:00'
		ReactTestUtils.Simulate.submit(createAlarm.refs.title)
		expect(alarms[0].start).toEqual({
			hour: 0,
			minute: 0
		})		
		expect(alarms[0].end).toEqual({
			hour: 0,
			minute: 0
		})
	})	
})

