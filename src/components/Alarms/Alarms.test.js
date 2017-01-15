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
		expect(alarm.props.children[2].props.children).toEqual('newAlarm')
	})
	it('should display an alarm\'s start time', function() {
		var renderer = TestUtils.createRenderer();		
    renderer.render(
			<Alarm time={{hour: 10, minute: 30}} alarm={newAlarm}/>
    )
 
    var alarm = renderer.getRenderOutput();		
		expect(alarm.props.children[0].props.time.hour).toEqual(10)
	})
	it('should display an alarms notes when it is sounding', function() {
		var renderer = TestUtils.createRenderer();		
    renderer.render(
			<Alarm time={{hour: 10, minute: 30}} alarm={newAlarm}/>
    )
 
    var alarm = renderer.getRenderOutput()
		expect(alarm.props.children[5].props.children).toEqual('notes')
	})
	it('should display an alarm\'s current weather', function() {
		var renderer = TestUtils.createRenderer();		
    renderer.render(
			<Alarm time={{hour: 10, minute: 30}} alarm={alarmWithWeather}/>
    )
 
    var alarm = renderer.getRenderOutput()
		expect(alarm.props.children[4].props.children).toEqual('Fair Skies')
	})
	it('should display an alarm\'s Location', function() {
		var renderer = TestUtils.createRenderer();		
    renderer.render(
			<Alarm time={{hour: 10, minute: 30}} alarm={alarmWithWeather}/>
    )
 
    var alarm = renderer.getRenderOutput()
		expect(alarm.props.children[3].props.children).toEqual('Limsa Lominsa')
	})
	it('should not display an alarms notes when it is silent', function() {
		var renderer = TestUtils.createRenderer();		
    renderer.render(
			<Alarm time={{hour: 11, minute: 30}} alarm={newAlarm}/>
    )
 
    var alarm = renderer.getRenderOutput()
		expect(alarm.props.children[5].props.children).toEqual('')
	})	
	it('should display an alarm\'s end time', function() {
		var renderer = TestUtils.createRenderer();		
    renderer.render(
			<Alarm time={{hour: 10, minute: 30}} alarm={newAlarm}/>
    )
 
    var alarm = renderer.getRenderOutput();		
		expect(alarm.props.children[1].props.time.hour).toEqual(11)
	})
	it('should play a sound when an alarm starts', function() {
		var alarm = TestUtils.renderIntoDocument(
			<Alarm time={{hour: 10, minute: 0}} alarm={newAlarm} playAlarm={jest.fn()}/>
		)
		expect(alarm.props.playAlarm).toBeCalled()
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
				},
				currentWeather: ''
			}}/>
		)		
		expect(alarm.sounding).toEqual(true)
	})
	it('should be sounding overnight when the current time is in the am', function() {
		var alarm = TestUtils.renderIntoDocument(
			<Alarm time={{hour: 1, minute: 0}} alarm={{
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
			}}/>
		)		
		expect(alarm.sounding).toEqual(true)
	})
	it('should be sounding overnight when the time is in the pm', function() {
		var alarm = TestUtils.renderIntoDocument(
			<Alarm time={{hour: 23, minute: 0}} alarm={{
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
			}}/>
		)		
		expect(alarm.sounding).toEqual(true)
	})
	it('should not be sounding overnight when the alarm is not between the start and end time and the current time is in the am', function() {
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
				},
				currentWeather: ''
			}}/>
		)		
		expect(alarm.sounding).toEqual(false)
	})
	it('should not be sounding overnight when the alarm is not between the start and end time and the current time is in the pm', function() {
		var alarm = TestUtils.renderIntoDocument(
			<Alarm time={{hour: 10, minute: 30}} alarm={{
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
	it('should be sounding when the current weather is correct', function() {
		var alarm = TestUtils.renderIntoDocument(
			<Alarm time={{hour: 10, minute: 30}} epoch={1484445532292} alarm={alarmWithWeather}/>
		)
		expect(alarm.sounding).toEqual(true)
	})
	it('should not be sounding when the current weather is incorrect', function() {
		var alarm = TestUtils.renderIntoDocument(
			<Alarm time={{hour: 10, minute: 30}} epoch={1484445532292} alarm={{
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
			}}/>
		)
		
		expect(alarm.sounding).toEqual(false)
	})
	it('should be sounding when the current and previous weathers are correct', function() {
		var alarm = TestUtils.renderIntoDocument(
			<Alarm time={{hour: 10, minute: 30}} epoch={1484462434157} alarm={{
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
			}}/>
		)
		expect(alarm.sounding).toEqual(true)
	})
	it('should be sounding when the current and previous weathers are correct 123', function() {
		var alarm = TestUtils.renderIntoDocument(
			<Alarm time={{hour: 10, minute: 30}} epoch={1484494782204} alarm={{
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
			}}/>
		)
		expect(alarm.sounding).toEqual(true)
	})
	it('should not be sounding when the previous weather is incorrect and the current weather is correct', function() {
		var alarm = TestUtils.renderIntoDocument(
			<Alarm time={{hour: 10, minute: 30}} epoch={1484462434157} alarm={{
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
			}}/>
		)
		expect(alarm.sounding).toEqual(false)
	})
	it('special observed test case', function() {
		var alarm = TestUtils.renderIntoDocument(
			<Alarm time={{hour: 6, minute: 10}} epoch={1484470084376} alarm={{
				title: 'newAlarm',
				start: {
					hour: 1,
					minute: 0
				},
				end: {
					hour: 8,
					minute: 0
				},
				notes: 'notes',
				currentWeather: 'Dust Storms',
				previousWeather: 'Fair Skies',
				location: 'Central Thanalan'
			}}/>
		)
		expect(alarm.sounding).toEqual(true)
	})
	it('special observed test case', function() {
		var alarm = TestUtils.renderIntoDocument(
			<Alarm time={{hour: 6, minute: 11}} epoch={1484470084376} alarm={{
				title: 'newAlarm',
				start: {
					hour: 1,
					minute: 0
				},
				end: {
					hour: 8,
					minute: 0
				},
				notes: 'notes',
				currentWeather: 'Dust Storms',
				previousWeather: 'Fair Skies',
				location: 'Central Thanalan'
			}}/>
		)
		expect(alarm.sounding).toEqual(true)
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
