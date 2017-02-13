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
		ReactTestUtils.Simulate.submit(createAlarm.refs.submit)
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
		ReactTestUtils.Simulate.submit(createAlarm.refs.submit)
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
		ReactTestUtils.Simulate.submit(createAlarm.refs.submit)
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
		ReactTestUtils.Simulate.submit(createAlarm.refs.submit)
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
		ReactTestUtils.Simulate.submit(createAlarm.refs.submit)
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
		ReactTestUtils.Simulate.submit(createAlarm.refs.submit)
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
		ReactTestUtils.Simulate.submit(createAlarm.refs.submit)
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
		ReactTestUtils.Simulate.submit(createAlarm.refs.submit)
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
		ReactTestUtils.Simulate.submit(createAlarm.refs.submit)
		expect(alarms[0].previousWeather).toEqual('Clouds')
	})
	it('should add the desired current weather to an alarm and not add start and end time', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		createAlarm.refs.title.value = 'newAlarm'
		var form = TestUtils.findRenderedDOMComponentWithTag(createAlarm, 'form')
		var location = TestUtils.findRenderedDOMComponentWithClass(createAlarm, 'location')
		createAlarm.refs.location.value = 'Limsa Lominsa'
		ReactTestUtils.Simulate.change(location)
		createAlarm.refs.currentWeather.value = 'Clouds'
		ReactTestUtils.Simulate.submit(createAlarm.refs.submit)
		expect(alarms[0].currentWeather).toEqual('Clouds')
		expect(alarms[0].start).toEqual(undefined)
		expect(alarms[0].end).toEqual(undefined)
	})
	it('should add the desired current and previous weather to an alarm and not add start and end time', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		createAlarm.refs.title.value = 'newAlarm'
		var form = TestUtils.findRenderedDOMComponentWithTag(createAlarm, 'form')
		var location = TestUtils.findRenderedDOMComponentWithClass(createAlarm, 'location')
		createAlarm.refs.location.value = 'Limsa Lominsa'
		ReactTestUtils.Simulate.change(location)
		createAlarm.refs.currentWeather.value = 'Clouds'
		createAlarm.refs.previousWeather.value = 'Fog'
		ReactTestUtils.Simulate.submit(createAlarm.refs.submit)
		expect(alarms[0].currentWeather).toEqual('Clouds')
		expect(alarms[0].previousWeather).toEqual('Fog')
	})
	it('should not add an alarm when previous weather is selected, but current weather is not selected', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		createAlarm.refs.title.value = 'newAlarm'
		var form = TestUtils.findRenderedDOMComponentWithTag(createAlarm, 'form')
		var location = TestUtils.findRenderedDOMComponentWithClass(createAlarm, 'location')
		createAlarm.refs.location.value = 'Limsa Lominsa'
		ReactTestUtils.Simulate.change(location)
		createAlarm.refs.previousWeather.value = 'Fog'
		ReactTestUtils.Simulate.submit(createAlarm.refs.submit)
		expect(alarms.length).toEqual(0)
	})
	it('should not add an alarm when neither current weather nor start time is selected', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		createAlarm.refs.title.value = 'newAlarm'
		var form = TestUtils.findRenderedDOMComponentWithTag(createAlarm, 'form')
		var location = TestUtils.findRenderedDOMComponentWithClass(createAlarm, 'location')
		ReactTestUtils.Simulate.submit(createAlarm.refs.submit)
		expect(alarms.length).toEqual(0)
	})
	it('should not add an alarm when a start time is selected but not an end time', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		createAlarm.refs.title.value = 'newAlarm'
		createAlarm.refs.start.value = '10:10'
		var form = TestUtils.findRenderedDOMComponentWithTag(createAlarm, 'form')
		var location = TestUtils.findRenderedDOMComponentWithClass(createAlarm, 'location')
		ReactTestUtils.Simulate.submit(createAlarm.refs.submit)
		expect(alarms.length).toEqual(0)
	})
	it('should not add the previous weather to an alarm', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		createAlarm.refs.title.value = 'newAlarm'
		createAlarm.refs.start.value = '10:10'
		createAlarm.refs.end.value = '20:10'
		ReactTestUtils.Simulate.submit(createAlarm.refs.submit)
		expect(alarms[0].previousWeather).toEqual('')
	})
	it('should list all locations in a dropdown', function() {
		var renderer = TestUtils.createRenderer()
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
    renderer.render(
			<CreateAlarm addAlarm={mockAddAlarm} />
    )

    var createAlarm = renderer.getRenderOutput();
		expect(createAlarm.props.children[0].props.children[2].props.children[0].props.children[1].props.children.props.children[1].length).toEqual(31)
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
		ReactTestUtils.Simulate.submit(createAlarm.refs.submit)
		expect(alarms[0].notes).toEqual('notes')
	})
	it('should add an alarm with travel time', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		createAlarm.refs.title.value = 'newAlarm'
		createAlarm.refs.start.value = '10:10'
		createAlarm.refs.end.value = '20:10'
    createAlarm.refs.travelTime.value = 15
		ReactTestUtils.Simulate.submit(createAlarm.refs.submit)
		expect(alarms[0].travelTime).toEqual(15)
	})
	it('should add an alarm with no travel time if none is selected', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		createAlarm.refs.title.value = 'newAlarm'
		createAlarm.refs.start.value = '10:10'
		createAlarm.refs.end.value = '20:10'
		ReactTestUtils.Simulate.submit(createAlarm.refs.submit)
		expect(alarms[0].travelTime).toEqual(0)
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
		ReactTestUtils.Simulate.submit(createAlarm.refs.submit)
		expect(alarms.length).toEqual(1)
	})
	it('should not add an alarm without a title', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		ReactTestUtils.Simulate.submit(createAlarm.refs.submit)
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
		ReactTestUtils.Simulate.submit(createAlarm.refs.submit)
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
		ReactTestUtils.Simulate.submit(createAlarm.refs.submit)
		expect(alarms[0].start).toEqual({
			hour: 0,
			minute: 0
		})
		expect(alarms[0].end).toEqual({
			hour: 0,
			minute: 0
		})
	})
	it('clicking show button should show the create alarm form and hide the show button', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		ReactTestUtils.Simulate.click(createAlarm.refs.show)
    expect(createAlarm.refs.alarmForm.className).toMatch(/show/)
    expect(createAlarm.refs.show.className).toMatch(/hide/)
	})
	it('clicking hide button should hide the create alarm form', function() {
		var alarms = []
		function mockAddAlarm(alarm) {
			alarms.push(alarm)
		}
		var createAlarm = TestUtils.renderIntoDocument(<CreateAlarm addAlarm={mockAddAlarm}/>)
		ReactTestUtils.Simulate.click(createAlarm.refs.show)
		ReactTestUtils.Simulate.click(createAlarm.refs.hide)
    expect(createAlarm.refs.alarmForm.className).toMatch(/hide/)
    expect(createAlarm.refs.hide.className).toMatch(/hide/)
	})
	it('should clear all fields after an alarm is submitted', function() {
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
    createAlarm.refs.travelTime.value = 15
		createAlarm.refs.currentWeather.value = 'Clouds'
		createAlarm.refs.previousWeather.value = 'Fog'
		createAlarm.refs.notes.value = 'notes'
		ReactTestUtils.Simulate.submit(createAlarm.refs.submit)

    expect(createAlarm.refs.title.value).toEqual('')
    expect(createAlarm.refs.start.value).toEqual('')
    expect(createAlarm.refs.end.value).toEqual('')
    expect(createAlarm.refs.travelTime.value).toEqual('')
    expect(createAlarm.refs.location.value).toEqual('---')
    expect(createAlarm.refs.currentWeather.value).toEqual('---')
    expect(createAlarm.refs.previousWeather.value).toEqual('---')
    expect(createAlarm.refs.notes.value).toEqual('')
	})
})

