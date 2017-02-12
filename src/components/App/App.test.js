import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from "react-addons-test-utils"
import ReactTestUtils from 'react-addons-test-utils'
import App from './App'

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

var storedAlarms

var mockDatastore = {
	getItem: function() {
		return JSON.stringify([newAlarm])
	},
		setItem: function(x, alarms) {
			storedAlarms = JSON.parse(alarms)
		}
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App datastore={mockDatastore} />, div);
})
describe('App', function() {
	it('should display the clock', function() {
		var renderer = TestUtils.createRenderer()
    renderer.render(
			<App datastore={mockDatastore} />
    );

    var app = renderer.getRenderOutput()
		expect(app.props.children[0].props.children[1].props.time.hour).not.toEqual(undefined)
	})
	it('should update the clock over time', function() {
		var renderer = TestUtils.createRenderer()
    renderer.render(
			<App datastore={mockDatastore} />
    );

    var app = renderer.getRenderOutput()
		var time1 = app
		function getTimeLater() {
			return new Promise(function(resolve) {
				setTimeout(function() {
					var renderer2 = TestUtils.createRenderer()
    			renderer2.render(
						<App datastore={mockDatastore} />
	    		)
  	  		var app2 = renderer.getRenderOutput()
					resolve(app2.props.children[0].props.children[1].props.time.minute)
				}, 4500)
			})
		}
		return getTimeLater().then(function(time2) {
			expect(time1.props.children[0].props.children[1].props.time.minute).not.toEqual(time2)
		})
	})
	it('should display alarms', function() {
		var renderer = TestUtils.createRenderer()
    renderer.render(
			<App datastore={mockDatastore} epoch={10}/>
    );

    var app = renderer.getRenderOutput();
		expect(app.props.children[1].props.alarms).not.toEqual(undefined)
		expect(app.props.children[1].props.time).not.toEqual(undefined)
		expect(app.props.children[1].props.epoch).not.toEqual(undefined)
	})
	it('should display alarm creation', function() {
		var renderer = TestUtils.createRenderer()
    renderer.render(
			<App datastore={mockDatastore} />
    )

    var app = renderer.getRenderOutput();
		expect(app.props.children[2].props.addAlarm).not.toEqual(undefined)
	})
	it('should add an alarm with CreateAlarm', function() {
		var app = TestUtils.renderIntoDocument(<App datastore={mockDatastore} />)
		var createAlarm = app.refs.createAlarm
		createAlarm.refs.title.value = 'newAlarm'
		createAlarm.refs.start.value = '10:10'
		createAlarm.refs.end.value = '20:10'
		ReactTestUtils.Simulate.submit(createAlarm.refs.title)
		expect(app.state.alarms[0].title).toEqual('newAlarm')
	})
	it('should delete an alarm', function() {
    var anotherMockDatastore = {
      getItem: function() {
        return JSON.stringify([newAlarm])
      },
        setItem: function(x, alarms) {
          storedAlarms = JSON.parse(alarms)
        }
    }
		var app = TestUtils.renderIntoDocument(<App datastore={anotherMockDatastore} />)
    app.refs.alarms.props.deleteAlarm(0)
		expect(app.state.alarms.length).toEqual(0)
	})
	it('should call setState with the updated alarms afer deleting an alarm', function() {
    var anotherMockDatastore = {
      getItem: function() {
        return JSON.stringify([newAlarm])
      },
        setItem: function(x, alarms) {
          storedAlarms = JSON.parse(alarms)
        }
    }
		var app = TestUtils.renderIntoDocument(<App datastore={anotherMockDatastore} />)
    app.testableSetState = jest.fn()
    app.refs.alarms.props.deleteAlarm(0)
    expect(app.testableSetState).toBeCalledWith({
      alarms: app.state.alarms
    })
	})
	it('should should update the dataStore with the alarms after deletion', function() {
    var anotherMockDatastore = {
      getItem: function() {
        return JSON.stringify([newAlarm])
      },
        setItem: function(x, alarms) {
          storedAlarms = JSON.parse(alarms)
        }
    }
		var app = TestUtils.renderIntoDocument(<App datastore={anotherMockDatastore} />)
    app.refs.alarms.props.deleteAlarm(0)
		expect(storedAlarms.length).toEqual(0)
	})
	it('should save a created alarm', function() {
		var app = TestUtils.renderIntoDocument(<App datastore={mockDatastore} />)
		var createAlarm = app.refs.createAlarm
		createAlarm.refs.title.value = 'newAlarm'
		createAlarm.refs.start.value = '10:10'
		createAlarm.refs.end.value = '20:10'
		ReactTestUtils.Simulate.submit(createAlarm.refs.title)
		expect(storedAlarms[0].title).toEqual('newAlarm')
	})
	it('should call setState with the updated alarms afer creating an alarm', function() {
		var app = TestUtils.renderIntoDocument(<App datastore={mockDatastore} />)
    app.testableSetState = jest.fn()
		var createAlarm = app.refs.createAlarm
		createAlarm.refs.title.value = 'newAlarm'
		createAlarm.refs.start.value = '10:10'
		createAlarm.refs.end.value = '20:10'
		ReactTestUtils.Simulate.submit(createAlarm.refs.title)
    expect(app.testableSetState).toBeCalledWith({
      alarms: app.state.alarms
    })
	})
	it('should load saved alarms', function() {
		var app = TestUtils.renderIntoDocument(<App datastore={mockDatastore} />)
		expect(app.state.alarms.length).toEqual(1)
	})
	it('if no alarms are saved should set alarms to []', function() {
		var emptyMockDatastore = {
			getItem: function() {
				return null
			},
				setItem: function(x, alarms) {
					storedAlarms = alarms
				}
		}

		var app = TestUtils.renderIntoDocument(<App datastore={emptyMockDatastore} />)
		expect(app.state.alarms.length).toEqual(0)
	})
})
