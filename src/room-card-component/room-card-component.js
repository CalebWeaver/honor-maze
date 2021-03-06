import React from "react";
import './room-card-component.css';
import Typography from "@material-ui/core/es/Typography/Typography";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import { withStyles } from "@material-ui/styles";

const styles = {
	// cardContainer: {
	// 	margin: '1rem',
	// },
	// historyContent: {
	// 	'&:last-child': {
	// 		paddingBottom: '16px',
	// 	},
	// }
};

function RoomCard(props) {
	const { classes } = props;

	let roomHistory = [];
	props.room.history.forEach((history) => {
		roomHistory.push(<Typography variant="h6" component="p" className="history-row" key={history.moveCount}>{history.desc}</Typography>);
	});

	return (
		<Card className="card-container">
			<CardContent className="history-content">
				{roomHistory}
			</CardContent>
		</Card>
	);
}

export default withStyles(styles)(RoomCard);