import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from "react-addons-test-utils"
import ReactTestUtils from 'react-addons-test-utils'
import App from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div);
})
describe('App', function() {
	it('should display the clock', function() {
		var renderer = TestUtils.createRenderer()
    renderer.render(
			<App />
    );
 
    var app = renderer.getRenderOutput()
		expect(app.props.children[0].props.time.hour).not.toEqual(undefined)
	})
	it('should update the clock over time', function() {
		var renderer = TestUtils.createRenderer()
    renderer.render(
			<App />
    );
 
    var app = renderer.getRenderOutput()
		var time1 = app
		function getTimeAfter2Sec() {
			return new Promise(function(resolve) {
				setTimeout(function() {
					var renderer2 = TestUtils.createRenderer()
    			renderer2.render(
						<App />
	    		)
  	  		var app2 = renderer.getRenderOutput()
					resolve(app2.props.children[0].props.time.minute)
				}, 4500)
			})
		}
		return getTimeAfter2Sec().then(function(time2) {
			expect(time1.props.children[0].props.time.minute).not.toEqual(time2)
		})
	})
	it('should display alarms', function() {
		var renderer = TestUtils.createRenderer()
    renderer.render(
			<App />
    );
 
    var app = renderer.getRenderOutput();		
		expect(app.props.children[1].props.alarms).not.toEqual(undefined)
		expect(app.props.children[1].props.time).not.toEqual(undefined)		
	})
	it('should display alarm creation', function() {
		var renderer = TestUtils.createRenderer()
    renderer.render(
			<App />
    )
 
    var app = renderer.getRenderOutput();		
		expect(app.props.children[2].props.addAlarm).not.toEqual(undefined)
	})
	it('should add an alarm with CreateAlarm', function() {
		var app = TestUtils.renderIntoDocument(<App />)
		var createAlarm = app.refs.createAlarm
		createAlarm.refs.title.value = 'newAlarm'
		createAlarm.refs.start.value = '10:10'
		createAlarm.refs.end.value = '20:10'
		ReactTestUtils.Simulate.submit(createAlarm.refs.title)
		expect(app.state.alarms[0].title).toEqual('newAlarm')
	})
})
