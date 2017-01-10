import React from 'react'
import ReactDOM from 'react-dom'
import Helpers from './helpers'

describe('Helpers', function() {
	it('getEorzeanTime should return the current time in Eorzea',function() {
		expect(Helpers.getEorzeanTime(1483938430869)).toEqual({
			hour: 16,
			minute: 10
		})
		expect(Helpers.getEorzeanTime(1483938838724)).toEqual({
			hour: 18,
			minute: 30
		})
		expect(Helpers.getEorzeanTime(1483939375331)).toEqual({
			hour: 21,
			minute: 34
		})
	})
})

