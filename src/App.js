import React, { Component } from 'react';
import './App.css';
import Game from './game-component/game-component';
import CssBaseline from '@material-ui/core/CssBaseline';
import {List} from "immutable";


class App extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
				<React.Fragment>
					<CssBaseline />
					<Game/>
				</React.Fragment>
		);
	}
}

export default App;
