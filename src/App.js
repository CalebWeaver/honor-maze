import React, {Component} from 'react';
import './App.css';
import Game from './game-component/game-component';
import CssBaseline from '@material-ui/core/CssBaseline';


class App extends Component {
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
