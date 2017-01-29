function getEorzeanTime(currentTime) {
	var epoch = currentTime * 20.571428571428573
	var minutes = parseInt((epoch / (1000 * 60)) % 60, 10)
	var hours = parseInt((epoch / (1000 * 60 * 60)) % 24, 10)

	return {
		hour: hours,
		minute: minutes
	}
}

module.exports = {
	getEorzeanTime: getEorzeanTime
}
