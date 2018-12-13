import React from "react";
import { withStyles } from "@material-ui/styles";
import {Typography} from "@material-ui/core/es/index";
import './inventory-component.css';

const styles = {
	inventoryHeader: {
		borderBottom: '1px solid black',
	},
};

function Inventory(props) {

	let {classes} = props;

	let items = [];
	props.items.forEach((item) => {
		if (item.required) {
			items.push(<Typography variant="body1" component="p" key={item.name}>{item.name}: {item.items.length} of {item.required.length}</Typography>);
		} else {
			items.push(<Typography variant="body1" component="p" key={item.name}>{item.name}</Typography>);
		}
	});

	return (
		<div>
			<Typography variant='h3' component="h2" className="inventory-header">Inventory</Typography>
			{items}
		</div>
	);
}

export default withStyles(styles)(Inventory);