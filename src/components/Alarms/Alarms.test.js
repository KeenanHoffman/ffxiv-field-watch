import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from "react-addons-test-utils";
import ReactTestUtils from 'react-addons-test-utils'
import shallowTestUtils from "react-shallow-testutils";
import Alarm from './Alarm'
import Alarms from './Alarms'

var newAlarm
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
	location: 'Limsa Lominsa',
  travelTime: 0
}

describe('Alarm', function() {
	function renderAlarm(time, alarm, epoch, playAlarm) {
    renderer.render(
			<Alarm time={time} alarm={alarm} epoch={epoch} playAlarm={playAlarm} />
    )
    return renderer.getRenderOutput();
	}
	var tenOclock = {hour: 10, minute: 0}
	var tenThirtyAM = {hour: 10, minute: 30}
	var renderer
	beforeEach(function() {
		renderer = TestUtils.createRenderer();
    newAlarm = {
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
      currentWeather: '',
      travelTime: 0
    }
	})
	it('should render without crashing', function() {
		const div = document.createElement('div');
		ReactDOM.render(<Alarm time={tenThirtyAM} alarm={newAlarm} playAlarm={jest.fn()}/>, div)
	})

	describe('display', function() {
		it('should display an alarm\'s title', function() {
			var alarm = renderAlarm(tenThirtyAM, newAlarm, undefined, jest.fn())
			expect(alarm.props.children[0].props.children[0].props.children).toEqual('newAlarm')
		})
		it('should display an alarm\'s start time', function() {
			var alarm = renderAlarm(tenThirtyAM, newAlarm, undefined, jest.fn())
			expect(alarm.props.children[0].props.children[2].props.children.props.children[0].props.time.hour).toEqual(10)
		})
		it('should display an alarms notes when it is sounding', function() {
			var alarm = renderAlarm(tenThirtyAM, newAlarm, undefined, jest.fn())
			expect(alarm.props.children[1].props.children).toEqual('notes')
		})
		it('should display an alarm\'s current weather when an alarm is sounding', function() {
			var alarm = renderAlarm(tenThirtyAM, {
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
					location: 'Middle La Noscea',
          travelTime: 0
				}, 1484462434157, jest.fn())
			expect(alarm.props.children[0].props.children[4].props.children).toEqual('Wind')
		})
		it('should display an alarm\'s current weather when an alarm is silent', function() {
			var alarm = renderAlarm({hour: 11, minute: 30}, alarmWithWeather, undefined, jest.fn())
			expect(alarm.props.children[0].props.children[4].props.children).toEqual('Fair Skies')
		})
		it('should display an alarm\'s previous weather when an alarm is sounding', function() {
			var alarm = renderAlarm(tenThirtyAM, {
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
					location: 'Middle La Noscea',
          travelTime: 0
				}, 1484462434157, jest.fn())
			expect(alarm.props.children[0].props.children[6].props.children).toEqual('Fair Skies')
		})
		it('should display an alarm\'s previous weather when an alarm is silent', function() {
      var alarm = renderAlarm(tenThirtyAM, {
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
					location: 'Middle La Noscea',
          travelTime: 0
				}, 1484462434157, jest.fn())
			expect(alarm.props.children[0].props.children[6].props.children).toEqual('Fair Skies')
		})
		it('should display an alarm\'s Location', function() {
			var alarm = renderAlarm(tenThirtyAM, alarmWithWeather, undefined, jest.fn())
			expect(alarm.props.children[0].props.children[3].props.children).toEqual('Limsa Lominsa')
		})
		it('should not display an alarms notes when it is silent', function() {
			var alarm = renderAlarm({hour: 11, minute: 30}, newAlarm, undefined, jest.fn())
			expect(alarm.props.children[1].props.children).toEqual('')
		})
		it('should display an alarm\'s end time', function() {
			var alarm = renderAlarm(tenThirtyAM, newAlarm, undefined, jest.fn())
			expect(alarm.props.children[0].props.children[2].props.children.props.children[2].props.time.hour).toEqual(11)
		})
		it('should display an alarm\'s travel time', function() {
			var alarm = renderAlarm(tenThirtyAM, newAlarm, undefined, jest.fn())
			expect(alarm.props.children[0].props.children[1].props.children).toEqual('0min')
		})
	})


	describe('sounding', function() {
		function renderAlarmIntoDocument(time, alarm, playAlarm, epoch, deleteAlarm) {
			return TestUtils.renderIntoDocument(
				<Alarm time={time} alarm={alarm} playAlarm={playAlarm} epoch={epoch} deleteAlarm={deleteAlarm}/>
			)
		}
		it('should play a sound when an alarm starts', function() {
			var alarm = renderAlarmIntoDocument(tenOclock, newAlarm, jest.fn())
			expect(alarm.props.playAlarm).toBeCalled()
		})
		it('should play a sound when an alarm is sounding when loaded', function() {
			var alarm = renderAlarmIntoDocument(tenThirtyAM, newAlarm, jest.fn())
			expect(alarm.props.playAlarm).toBeCalled()
		})
		it('should not play a sound when an alarm has already sounded', function() {
      const div = document.createElement('div');
      var alarm = ReactDOM.render(<Alarm time={tenThirtyAM} alarm={newAlarm} playAlarm={jest.fn()}/>, div)

      ReactDOM.render(<Alarm time={{hour: 10, minute: 31}} alarm={newAlarm} playAlarm={jest.fn()}/>, div)
      expect(alarm.props.playAlarm).not.toBeCalled()
		})
		it('should return alarm.shouldPlayAlarm to true after an alarm ends', function() {
      const div = document.createElement('div');
      var alarm = ReactDOM.render(<Alarm time={{hour: 11, minute: 1}} alarm={newAlarm} playAlarm={jest.fn()}/>, div)
      expect(alarm.shouldPlayAlarm).toEqual(true)
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
					currentWeather: '',
          travelTime: 0
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
					currentWeather: '',
          travelTime: 0
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
					currentWeather: '',
          travelTime: 0
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
			var alarm = renderAlarm(tenThirtyAM, newAlarm, undefined, jest.fn())
			expect(alarm.props.className).toMatch(/sounding/)
		})
		it('should have class silent if the alarm is not sounding', function() {
			var alarm = renderAlarm({hour: 11, minute: 30}, newAlarm, undefined, jest.fn())
			expect(alarm.props.className).toMatch(/silent/)
		})
		it('should be sounding then silent when it ends', function() {
			const div = document.createElement('div');
			var alarm = ReactDOM.render(<Alarm time={{hour: 11, minute: 0}} alarm={newAlarm} playAlarm={jest.fn()}/>, div)
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
					location: 'Middle La Noscea',
          travelTime: 0
				}, jest.fn(), 1484462434157)
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
		it('should be sounding at the end of a weather cycle', function() {
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
					location: 'Middle La Noscea',
          travelTime: 0
				}} playAlarm={jest.fn()}/>
			)
			expect(alarm.sounding).toEqual(true)
		})
		it('should be sonding at the beginning of a weather cycle', function() {
			var alarm = TestUtils.renderIntoDocument(
				<Alarm time={{hour: 0, minute: 0}} epoch={1484506802370} alarm={{
					title: 'newAlarm',
					start: {
						hour: 23,
						minute: 0
					},
					end: {
						hour: 1,
						minute: 0
					},
					notes: 'notes',
					currentWeather: 'Fog',
					previousWeather: 'Wind',
					location: 'Middle La Noscea',
          travelTime: 0
				}} playAlarm={jest.fn()}/>
			)
			expect(alarm.sounding).toEqual(true)
		})
		it('should be sounding at the beginning of an alarm\'s travel time', function() {
      newAlarm.travelTime = 15
			var alarm = renderAlarmIntoDocument({hour: 9, minute: 45}, newAlarm, jest.fn())
			expect(alarm.sounding).toEqual(true)
		})
		it('should be sounding near an alarm\'s end', function() {
      newAlarm.travelTime = 15
			var alarm = renderAlarmIntoDocument({hour: 10, minute: 46}, newAlarm, jest.fn())
			expect(alarm.sounding).toEqual(true)
		})
		it('should be sounding when desired weather is after travel time', function() {
			var alarm = renderAlarmIntoDocument({hour: 15, minute: 45}, {
					title: 'newAlarm',
					start: {
						hour: 15,
						minute: 0
					},
					end: {
						hour: 17,
						minute: 0
					},
					notes: 'notes',
					currentWeather: 'Clear Skies',
					previousWeather: 'Umbral Static',
					location: 'The Churning Mists',
          travelTime: 15
				}, jest.fn(), 1485714959000)
			expect(alarm.sounding).toEqual(true)
		})
		it('should not be sounding when desired weather is after travel time, but is outside of alarm time', function() {
			var alarm = renderAlarmIntoDocument({hour: 15, minute: 45}, {
					title: 'newAlarm',
					start: {
						hour: 15,
						minute: 0
					},
					end: {
						hour: 15,
						minute: 46
					},
					notes: 'notes',
					currentWeather: 'Clear Skies',
					previousWeather: 'Umbral Static',
					location: 'The Churning Mists',
          travelTime: 15
				}, jest.fn(), 1485714959000)
			expect(alarm.sounding).toEqual(false)
		})
		it('should be sounding with only current weather settings', function() {
			var alarm = renderAlarmIntoDocument({hour: 4, minute: 11}, {
					title: 'newAlarm',
					start: undefined,
					end: undefined,
					currentWeather: 'Fog',
          previousWeather: '',
					location: 'Limsa Lominsa',
          travelTime: 0
				}, jest.fn(), 1486263134078)
			expect(alarm.sounding).toEqual(true)
		})
		it('should be sounding with only current and previous weather settings', function() {
			var alarm = renderAlarmIntoDocument({hour: 4, minute: 11}, {
					title: 'newAlarm',
					start: undefined,
					end: undefined,
					currentWeather: 'Fog',
          previousWeather: 'Clear Skies',
					location: 'Limsa Lominsa',
          travelTime: 0
				}, jest.fn(), 1486263134078)
			expect(alarm.sounding).toEqual(true)
		})
		it('should be sounding with only current weather and travel time settings', function() {
			var alarm = renderAlarmIntoDocument({hour: 3, minute: 45}, {
					title: 'newAlarm',
					start: undefined,
					end: undefined,
					currentWeather: 'Fog',
          previousWeather: '',
					location: 'Limsa Lominsa',
          travelTime: 15
				}, jest.fn(), 1486263059078)
			expect(alarm.sounding).toEqual(true)
		})
		it('should not be sounding with only current weather and  0 travel time', function() {
			var alarm = renderAlarmIntoDocument({hour: 3, minute: 45}, {
					title: 'newAlarm',
					start: undefined,
					end: undefined,
					currentWeather: 'Clouds',
          previousWeather: '',
					location: 'Limsa Lominsa',
          travelTime: 0
				}, jest.fn(), 1486330957278)
			expect(alarm.sounding).toEqual(false)
		})
		it('should not be sounding with only current weather and travel time settings', function() {
			var alarm = renderAlarmIntoDocument({hour: 3, minute: 42}, {
					title: 'newAlarm',
					start: undefined,
					end: undefined,
					currentWeather: 'Clouds',
          previousWeather: '',
					location: 'Limsa Lominsa',
          travelTime: 15
				}, jest.fn(), 1486263049078)
			expect(alarm.sounding).toEqual(false)
		})
	})
  describe('Delete', function() {
    it('should call the delete function with an alarms index', function() {
      var deleteAlarm = jest.fn()
      var alarm = TestUtils.renderIntoDocument(
        <Alarm index={3} time={{hour: 10, minute: 46}} alarm={newAlarm} playAlarm={jest.fn()} epoch={1486263049078} deleteAlarm={deleteAlarm}/>
      )

      ReactTestUtils.Simulate.click(alarm.refs.delete)

			expect(deleteAlarm).toBeCalledWith(3)
    })
  })
})

describe('Alarms', function() {
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
	it('should pass epoch to Alarm', function() {
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
	it('should pass deleteAlarm function to Alarm', function() {
		var renderer = TestUtils.createRenderer();
    var deleteAlarm = jest.fn()
    renderer.render(
			<Alarms time={{hour: 10, minute: 30}} alarms={alarms} deleteAlarm={deleteAlarm} />
    )

    var alarm = renderer.getRenderOutput();
		expect(alarm.props.children[0].props.deleteAlarm).toEqual(deleteAlarm)
	})
	it('should pass an alarm\'s index to an alarm', function() {
		var renderer = TestUtils.createRenderer();
    renderer.render(
			<Alarms time={{hour: 10, minute: 30}} alarms={alarms} deleteAlarm={jest.fn()} />
    )

    var alarm = renderer.getRenderOutput();
		expect(alarm.props.children[1].props.index).toEqual(1)
	})
})
