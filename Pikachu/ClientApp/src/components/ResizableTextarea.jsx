import ReactDOM from 'react-dom';
import React from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
//import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";

class ResizableTextarea extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			rows: 3
		};
	}

	handleChange = (event) => {
		const minRows = 3;
		const maxRows = 100;
		const textareaLineHeight = 24;

		const previousRows = event.target.rows;
  		event.target.rows = minRows; // reset number of rows in textarea

		const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

	    if (currentRows === previousRows) {
	    	event.target.rows = currentRows;
	    }

		if (currentRows >= maxRows) {
			event.target.rows = maxRows;
			event.target.scrollTop = event.target.scrollHeight;
		}

	  	this.setState({
	    	value: event.target.value,
	      	rows: currentRows < maxRows ? currentRows : maxRows,
	    });
		this.props.onChange(event);
	};

	render() {
		return (
			<textarea
				rows={this.state.rows}
				value={this.state.value}
				placeholder={'Enter your text here...'}
				className={'textarea'}
				onChange={this.handleChange}
			/>
		);
	}
}

export default withRouter(ResizableTextarea);
