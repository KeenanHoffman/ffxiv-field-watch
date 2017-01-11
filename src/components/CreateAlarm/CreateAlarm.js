import React from 'react';

var CreateAlarm = React.createClass({
	onSubmit: function(e) {
		e.preventDefault()
		var start = this.refs.start.value.split(':')
		var end = this.refs.end.value.split(':')		
		if(this.refs.title.value === '' || start[0] === '' || end[0] === '') return		
		this.props.addAlarm({
			title: this.refs.title.value,
			start: {
				hour: Number(start[0]),
				minute: Number(start[1])
			},
			end: {
				hour: Number(end[0]),
				minute: Number(end[1])
			}
		})
	},
  render() {
    return (
			<div>
				<form action="" onSubmit={this.onSubmit}>
					<input ref="title" />
					<input type="time" ref="start" />
					<input type="time" ref="end" />	
				</form>
			</div>
		)
  }
})

export default CreateAlarm

