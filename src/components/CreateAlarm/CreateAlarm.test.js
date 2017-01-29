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
	it('should add a location to an alarm', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		createAlarm.refs.title.value = 'newAlarm'
		createAlarm.refs.start.value = '10:10'
		createAlarm.refs.end.value = '20:10'
		createAlarm.refs.location.value = 'Limsa Lominsa'
		ReactTestUtils.Simulate.submit(createAlarm.refs.title)
		expect(alarms[0].location).toEqual('Limsa Lominsa')
	})
	it('should not add a location to an alarm', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		createAlarm.refs.title.value = 'newAlarm'
		createAlarm.refs.start.value = '10:10'
		createAlarm.refs.end.value = '20:10'
		ReactTestUtils.Simulate.submit(createAlarm.refs.title)
		expect(alarms[0].location).toEqual('')
	})
	it('should add the desired current weather to an alarm', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		createAlarm.refs.title.value = 'newAlarm'
		createAlarm.refs.start.value = '10:10'
		var form = TestUtils.findRenderedDOMComponentWithTag(createAlarm, 'form')
		var location = TestUtils.findRenderedDOMComponentWithClass(createAlarm, 'location')
		createAlarm.refs.location.value = 'Limsa Lominsa'
		ReactTestUtils.Simulate.change(location)
		createAlarm.refs.end.value = '20:10'
		createAlarm.refs.currentWeather.value = 'Clouds'
		ReactTestUtils.Simulate.submit(createAlarm.refs.title)
		expect(alarms[0].currentWeather).toEqual('Clouds')
	})
	it('should display all possible weather for a selected location', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		var form = TestUtils.findRenderedDOMComponentWithTag(createAlarm, 'form')
		var location = TestUtils.findRenderedDOMComponentWithClass(createAlarm, 'location')
		createAlarm.refs.location.value = 'Limsa Lominsa'
		ReactTestUtils.Simulate.change(location)
		expect(createAlarm.state.weatherList).toEqual(["Clouds", "Clear Skies", "Fair Skies", "Fog", "Rain"])
	})
	it('should not add the desired current weather to an alarm', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		createAlarm.refs.title.value = 'newAlarm'
		createAlarm.refs.start.value = '10:10'
		createAlarm.refs.end.value = '20:10'
		ReactTestUtils.Simulate.submit(createAlarm.refs.title)
		expect(alarms[0].currentWeather).toEqual('')
	})
	it('should add the desired previous weather to an alarm', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		createAlarm.refs.title.value = 'newAlarm'
		createAlarm.refs.start.value = '10:10'
		var form = TestUtils.findRenderedDOMComponentWithTag(createAlarm, 'form')
		var location = TestUtils.findRenderedDOMComponentWithClass(createAlarm, 'location')
		createAlarm.refs.location.value = 'Limsa Lominsa'
		ReactTestUtils.Simulate.change(location)
		createAlarm.refs.end.value = '20:10'
		createAlarm.refs.previousWeather.value = 'Clouds'
		ReactTestUtils.Simulate.submit(createAlarm.refs.title)
		expect(alarms[0].previousWeather).toEqual('Clouds')
	})
	it('should not add the previous current weather to an alarm', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		createAlarm.refs.title.value = 'newAlarm'
		createAlarm.refs.start.value = '10:10'
		createAlarm.refs.end.value = '20:10'
		ReactTestUtils.Simulate.submit(createAlarm.refs.title)
		expect(alarms[0].previousWeather).toEqual('')
	})
	it('should list all loctions in a dropdown', function() {
		var renderer = TestUtils.createRenderer()
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
    renderer.render(
			<CreateAlarm addAlarm={mockAddAlarm} />
    )

    var createAlarm = renderer.getRenderOutput();
		expect(createAlarm.props.children.props.children[3].props.children[1].length).toEqual(31)
	})
	it('should add an alarm with notes', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		createAlarm.refs.title.value = 'newAlarm'
		createAlarm.refs.start.value = '10:10'
		createAlarm.refs.end.value = '20:10'
		createAlarm.refs.notes.value = 'notes'
		ReactTestUtils.Simulate.submit(createAlarm.refs.title)
		expect(alarms[0].notes).toEqual('notes')
	})
	it('should add an alarm without notes', function() {
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

