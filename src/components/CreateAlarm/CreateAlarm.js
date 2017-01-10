import React from 'react';

var CreateAlarm = React.createClass({
	onSubmit: function(e) {
		e.preventDefault()
		this.props.addAlarm({
			title: this.refs.title.value,
		})
	},
  render() {
    return (
			<div>
				<form action="" onSubmit={this.onSubmit}>
					<input ref="title" />
				</form>
			</div>
		)
  }
})

export default CreateAlarm

