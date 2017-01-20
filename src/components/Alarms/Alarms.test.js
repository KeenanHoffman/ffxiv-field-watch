import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from "react-addons-test-utils";
import shallowTestUtils from "react-shallow-testutils";
import Alarm from './Alarm'
import Alarms from './Alarms'
import Weather from '../../helpers/weather'

var newAlarm = {
	title: 'newAlarm',
	start: {
		hour: 10,
		minute: 0
	},
	end: {
		hour: 11,
		minute: 0
	},
	notes: 'notes',
	currentWeather: ''
}
var alarmWithWeather = {
	title: 'newAlarm',
	start: {
		hour: 10,
		minute: 0
	},
	end: {
		hour: 11,
		minute: 0
	},
	notes: 'notes',
	currentWeather: 'Fair Skies',
	previousWeather: '',
	location: 'Limsa Lominsa'
}

describe('Alarm', function() {
	function renderAlarm(time, alarm, epoch) {
    renderer.render(
			<Alarm time={time} alarm={alarm} epoch={epoch} />
    )
    return renderer.getRenderOutput();		
	}
	var tenOclock = {hour: 10, minute: 0}
	var tenThirtyAM = {hour: 10, minute: 30}
	var renderer
	beforeEach(function() {
		renderer = TestUtils.createRenderer();
	})
	it('should render without crashing', function() {
		const div = document.createElement('div');
		ReactDOM.render(<Alarm time={tenThirtyAM} alarm={newAlarm}/>, div)
	})
	
	describe('display', function() {
		it('should display an alarm\'s title', function() {
			var alarm = renderAlarm(tenThirtyAM, newAlarm)
			expect(alarm.props.children[2].props.children).toEqual('newAlarm')
		})
		it('should display an alarm\'s start time', function() {
			var alarm = renderAlarm(tenThirtyAM, newAlarm)
			expect(alarm.props.children[0].props.time.hour).toEqual(10)
		})
		it('should display an alarms notes when it is sounding', function() {
			var alarm = renderAlarm(tenThirtyAM, newAlarm)
			expect(alarm.props.children[5].props.children).toEqual('notes')
		})
		it('should display an alarm\'s current weather', function() {
			var alarm = renderAlarm(tenThirtyAM, alarmWithWeather)
			expect(alarm.props.children[4].props.children).toEqual('Fair Skies')
		})
		it('should display an alarm\'s Location', function() {
			var alarm = renderAlarm(tenThirtyAM, alarmWithWeather)
			expect(alarm.props.children[3].props.children).toEqual('Limsa Lominsa')
		})
		it('should not display an alarms notes when it is silent', function() {
			var alarm = renderAlarm({hour: 11, minute: 30}, newAlarm)
			expect(alarm.props.children[5].props.children).toEqual('')
		})	
		it('should display an alarm\'s end time', function() {
			var alarm = renderAlarm(tenThirtyAM, newAlarm)
			expect(alarm.props.children[1].props.time.hour).toEqual(11)
		})
	})
	

	describe('sounding', function() {
		function renderAlarmIntoDocument(time, alarm, playAlarm, epoch) {
			return TestUtils.renderIntoDocument(
				<Alarm time={time} alarm={alarm} playAlarm={playAlarm} epoch={epoch} />
			)
		}
		it('should play a sound when an alarm starts', function() {
			var alarm = renderAlarmIntoDocument(tenOclock, newAlarm, jest.fn()) 
			expect(alarm.props.playAlarm).toBeCalled()
		})	
		it('should be sounding', function() {
			var alarm = renderAlarmIntoDocument(tenThirtyAM, newAlarm, jest.fn())		
			expect(alarm.sounding).toEqual(true)
		})
		it('should not be sounding', function() {
			var alarm = renderAlarmIntoDocument({hour: 11, minute: 30}, newAlarm, jest.fn())
			expect(alarm.sounding).toEqual(false)
		})
		it('should be sounding within an hour', function() {
			var alarm = renderAlarmIntoDocument(tenThirtyAM, {
					title: 'newAlarm',
					start: {
						hour: 10,
						minute: 0
					},
					end: {
						hour: 10,
						minute: 45
					},
					currentWeather: ''
				}, jest.fn())		
			expect(alarm.sounding).toEqual(true)
		})
		it('should be sounding overnight when the current time is in the am', function() {
			var alarm = renderAlarmIntoDocument({hour: 1, minute: 0}, {
					title: 'newAlarm',
					start: {
						hour: 23,
						minute: 0
					},
					end: {
						hour: 2,
						minute: 0
					},
					currentWeather: ''
				}, jest.fn())
			expect(alarm.sounding).toEqual(true)
		})
		it('should be sounding overnight when the time is in the pm', function() {
			var alarm = renderAlarmIntoDocument({hour: 23, minute: 0}, {
					title: 'newAlarm',
					start: {
						hour: 22,
						minute: 0
					},
					end: {
						hour: 1,
						minute: 0
					},
					currentWeather: ''
				}, jest.fn())		
			expect(alarm.sounding).toEqual(true)
		})
		it('should not be sounding overnight when the alarm is not between the start and end time and the current time is in the am', function() {
			var alarm = renderAlarmIntoDocument({hour: 1, minute: 30}, {
					title: 'newAlarm',
					start: {
						hour: 11,
						minute: 0
					},
					end: {
						hour: 1,
						minute: 0
					},
					currentWeather: ''
				}, jest.fn())		
			expect(alarm.sounding).toEqual(false)
		})
		it('should not be sounding overnight when the alarm is not between the start and end time and the current time is in the pm', function() {
			var alarm = renderAlarmIntoDocument(tenThirtyAM, {
					title: 'newAlarm',
					start: {
						hour: 11,
						minute: 0
					},
					end: {
						hour: 1,
						minute: 0
					},
					currentWeather: ''
				}, jest.fn())
			expect(alarm.sounding).toEqual(false)
		})
		it('should have class sounding if the alarm is sounding', function() {
			var alarm = renderAlarm(tenThirtyAM, newAlarm)
			expect(alarm.props.className).toEqual('sounding')
		})		
		it('should have class silent if the alarm is not sounding', function() {
			var alarm = renderAlarm({hour: 11, minute: 30}, newAlarm)
			expect(alarm.props.className).toEqual('silent')
		})		
		it('should be sounding then silent when it ends', function() {
			const div = document.createElement('div');
			var alarm = ReactDOM.render(<Alarm time={{hour: 11, minute: 0}} alarm={newAlarm}/>, div)
			expect(alarm.sounding).toEqual(true)

			ReactDOM.render(<Alarm time={{hour: 11, minute: 1}} alarm={newAlarm}/>, div)
			expect(alarm.sounding).toEqual(false)
		})
		it('should be sounding when the current weather is correct', function() {
			var alarm = renderAlarmIntoDocument(tenThirtyAM, alarmWithWeather, jest.fn(), 1484445532292)
			expect(alarm.sounding).toEqual(true)
		})
		it('should not be sounding when the current weather is incorrect', function() {
			var alarm = renderAlarmIntoDocument(tenThirtyAM, {
					title: 'newAlarm',
					start: {
						hour: 10,
						minute: 0
					},
					end: {
						hour: 11,
						minute: 0
					},
					notes: 'notes',
					currentWeather: "Fog",
					location: 'Limsa Lominsa',
					previousWeather: ''
				}, jest.fn(), 1484445532292)
			expect(alarm.sounding).toEqual(false)
		})
		it('should be sounding when the current and previous weathers are correct', function() {
			var alarm = renderAlarmIntoDocument(tenThirtyAM, {
					title: 'newAlarm',
					start: {
						hour: 10,
						minute: 0
					},
					end: {
						hour: 11,
						minute: 0
					},
					notes: 'notes',
					currentWeather: 'Wind',
					previousWeather: 'Fair Skies',
					location: 'Middle La Noscea'
				}, jest.fn(), 1484462434157)
			expect(alarm.sounding).toEqual(true)
		})
		it('should be sounding when the current and previous weathers are correct 123', function() {
			var alarm = renderAlarmIntoDocument(tenThirtyAM, {
					title: 'newAlarm',
					start: {
						hour: 10,
						minute: 0
					},
					end: {
						hour: 11,
						minute: 0
					},
					notes: 'notes',
					currentWeather: 'Fair Skies',
					previousWeather: 'Fog',
					location: 'Middle La Noscea'
				}, jest.fn(), 1484494782204)
			expect(alarm.sounding).toEqual(true)
		})
		it('should not be sounding when the previous weather is incorrect and the current weather is correct', function() {
			var alarm = renderAlarmIntoDocument(tenThirtyAM, {
					title: 'newAlarm',
					start: {
						hour: 10,
						minute: 0
					},
					end: {
						hour: 11,
						minute: 0
					},
					notes: 'notes',
					currentWeather: 'Wind',
					previousWeather: 'Fog',
					location: 'Middle La Noscea'
				}, jest.fn(), 1484462434157)
			expect(alarm.sounding).toEqual(false)
		})
		it('should be sonding at the beginning of a weather cycle', function() {
			var alarm = TestUtils.renderIntoDocument(
				<Alarm time={{hour: 7, minute: 59}} epoch={1484505399001} alarm={{
					title: 'newAlarm',
					start: {
						hour: 7,
						minute: 0
					},
					end: {
						hour: 9,
						minute: 0
					},
					notes: 'notes',
					currentWeather: 'Wind',
					previousWeather: 'Clear Skies',
					location: 'Middle La Noscea'
				}}/>
			)
			expect(alarm.sounding).toEqual(true)
		})
		it('should be sonding at the beginning of a weather cycle', function() {
			var alarm = TestUtils.renderIntoDocument(
				<Alarm time={{hour: 8, minute: 0}} epoch={1484506804370} alarm={{
					title: 'newAlarm',
					start: {
						hour: 7,
						minute: 0
					},
					end: {
						hour: 9,
						minute: 0
					},
					notes: 'notes',
					currentWeather: 'Fog',
					previousWeather: 'Wind',
					location: 'Middle La Noscea'
				}}/>
			)
			expect(alarm.sounding).toEqual(true)
		})
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
	it('should pass time to Alarm', function() {
		var renderer = TestUtils.createRenderer();		
    renderer.render(
			<Alarms time={{hour: 10, minute: 30}} alarms={alarms}/>
    )
 
    var alarm = renderer.getRenderOutput();		
		expect(alarm.props.children[0].props.time.hour).toEqual(10)
	})
	it('should pass time to Alarm', function() {
		var renderer = TestUtils.createRenderer();		
    renderer.render(
			<Alarms time={{hour: 10, minute: 30}} epoch={10} alarms={alarms}/>
    )
 
    var alarm = renderer.getRenderOutput();		
		expect(alarm.props.children[0].props.epoch).toEqual(10)
	})
	it('should pass playAlarm function to Alarm', function() {
		var renderer = TestUtils.createRenderer();		
    renderer.render(
			<Alarms time={{hour: 10, minute: 30}} alarms={alarms} />
    )
 
    var alarm = renderer.getRenderOutput();		
		expect(alarm.props.children[0].props.playAlarm).not.toEqual(undefined)
	})	
})
