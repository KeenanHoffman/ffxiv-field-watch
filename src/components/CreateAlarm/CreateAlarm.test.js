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
		ReactTestUtils.Simulate.submit(createAlarm.refs.title)
		expect(alarms.length).toEqual(1)
		expect(alarms[0].title).toEqual("newAlarm")		
	})
})

