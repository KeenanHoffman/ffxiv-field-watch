import React from 'react'
import ReactDOM from 'react-dom';
import EorzeanClock from './EorzeanClock'
import TestUtils from 'react-addons-test-utils'
import shallowTestUtils from 'react-shallow-testutils'

describe('EorzeanClock', function() {
	var time = {
		hour: 10,
		minute: 22
	}

	it('should render without crashing', () => {
		const div = document.createElement('div')
 		ReactDOM.render(<EorzeanClock time={time}/>, div)
	})

	it('should have className eorzeanClock', function() {
		var renderer = TestUtils.createRenderer()		
    renderer.render(
			<EorzeanClock time={time}/>
    )
 
    var clock = renderer.getRenderOutput()
		expect(clock.props.className).toEqual('eorzeanClock')
	})

	it('should display the given time', function() {
		var renderer = TestUtils.createRenderer()
		renderer.render(
			<EorzeanClock time={time}/>
    )
 
    var clock = renderer.getRenderOutput()
		expect(clock.props.children).toEqual(['10', ':', '22', 'am']);
	})

	it('should display single digit hours as 0X', function() {
		var renderer = TestUtils.createRenderer()
		var time = {
			hour: 1,
			minute: 10
		}
    renderer.render(
			<EorzeanClock time={time}/>
    )
 
    var clock = renderer.getRenderOutput()
		expect(clock.props.children[0]).toEqual('01')
	})

	it('should display single digit minutes as 0X', function() {
		var renderer = TestUtils.createRenderer()
		var time = {
			hour: 10,
			minute: 1
		}
    renderer.render(
			<EorzeanClock time={time}/>
    )
 
    var clock = renderer.getRenderOutput()
		expect(clock.props.children[2]).toEqual('01')
	})
	it('should use standard time', function() {
		var renderer = TestUtils.createRenderer()
		var time = {
			hour: 13,
			minute: 10
		}
    renderer.render(
			<EorzeanClock time={time}/>
    )
 
    var clock = renderer.getRenderOutput()
		expect(clock.props.children).toEqual(['01', ':', '10', 'pm'])

	})
	it('should diplay 12pm as 12:00pm', function() {
		var renderer = TestUtils.createRenderer()
		var time = {
			hour: 12,
			minute: 0
		}
    renderer.render(
			<EorzeanClock time={time}/>
    )
 
    var clock = renderer.getRenderOutput();
		expect(clock.props.children).toEqual(['12', ':', '00', 'pm'])
	})
	it('should diplay 12am as 12:00am', function() {
		var renderer = TestUtils.createRenderer()
		var time = {
			hour: 0,
			minute: 0
		}
    renderer.render(
			<EorzeanClock time={time}/>
    )
 
    var clock = renderer.getRenderOutput()
		expect(clock.props.children).toEqual(['12', ':', '00', 'am'])
	})
})
