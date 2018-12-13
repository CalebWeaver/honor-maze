import React from "react";
import Typography from "@material-ui/core/es/Typography/Typography";
import withStyles from "@material-ui/core/es/styles/withStyles";

const styles = {
	// header: {
	// 	borderBottom: '1px solid black',
	// },
};

function Instructions(props) {

	let {classes} = props;

	return (
		<div className="instructions">
			<Typography variant="h3" component="h2" className="header">
				Instructions:
			</Typography>
			<Typography variant="body1" component="p">
				N: move North
			</Typography>
			<Typography variant="body1" component="p">
				S: move South
			</Typography>
			<Typography variant="body1" component="p">
				E: move East
			</Typography>
			<Typography variant="body1" component="p">
				W: move West
			</Typography>
			<Typography variant="body1" component="p">
				P: Pickup an item from the current location
			</Typography>
			<Typography variant="body1" component="p">
				I: Interact with your surroundings using an item from your inventory
			</Typography>
			<Typography variant="body1" component="p">
				U: Use one item in your inventory with another
			</Typography>
			<Typography variant="body1" component="p">
				X: eXamine an item in your inventory
			</Typography>
		</div>
	);
}

export default withStyles(styles)(Instructions);