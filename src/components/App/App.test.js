import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from "react-addons-test-utils"
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
	it('should display alarms', function() {
		var renderer = TestUtils.createRenderer()
    renderer.render(
			<App />
    );
 
    var app = renderer.getRenderOutput();		
		expect(app.props.children[1].props.alarms).not.toEqual(undefined)
	})
	it('should display alarm creation', function() {
		var renderer = TestUtils.createRenderer()
    renderer.render(
			<App />
    )
 
    var app = renderer.getRenderOutput();		
		expect(app.props.children[2].props.addAlarm).not.toEqual(undefined)
	})
})
