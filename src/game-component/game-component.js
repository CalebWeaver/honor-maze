import React from 'react';
import ControlsService from '../utils/controls-service';
import {List, Map, fromJS} from 'immutable';
import {items, Item} from '../items';
import {GameMap} from '../GameMap';
import './game-component.css';
import * as _ from 'lodash';
import Inventory from "../inventory-component/inventory-component";
import RoomCard from "../room-card-component/room-card-component";
import Instructions from "../instructions-component";
import Button from "@material-ui/core/es/Button/Button";
import TextField from "@material-ui/core/es/TextField/TextField";
import Typography from "@material-ui/core/es/Typography/Typography";

export default class Game extends React.Component {

	constructor(props) {
		super(props);
		this.state = this.getNewState();
		this.gameMap = new GameMap();
		this.itemInputRef = React.createRef();
		this.examineInputRef = React.createRef();
		this.useInputRef = React.createRef();
	}

	getNewState() {
		return {
			moveCount: 0,
			location: '',
			inventory: new Map(),
			roomHistory: new List(),
			roomState: {},
			userItemInput: '',
			showItemInput: false,
			userExamineInput: '',
			showExamineInput: false,
			userPrimaryUseInput: '',
			showUseInput: false,
			userSecondaryUseInput: '',
			newGameConfirm: false,
		};
	}

	componentDidMount() {
		document.addEventListener("keydown", this.handleKeydown.bind(this));
		document.title = 'Honor Maze';
		let saveDataRaw = localStorage.getItem('state');
		if (saveDataRaw) {
			let savedState = JSON.parse(saveDataRaw);
			savedState.inventory = new Map(savedState.inventory).map(item => Object.setPrototypeOf(item, Item.prototype));
			savedState.roomHistory = new List(savedState.roomHistory);
			savedState.roomHistory.map(roomHistory => roomHistory.history = new List(roomHistory.history));
			this.gameMap.setAllRoomStates(savedState.roomState);
			this.setState(savedState);
		} else {
			this.move('tricolorCenter');
		}

		this.setState({newGameConfirm: false});
		// let trap = items['animal trap'];
		// trap.items.push('');
		// trap.items.push('');
		// trap.items.push('');
		// trap.items.push('');
		// this.addItem(trap);
		// let trap = items['fishing pole'];
		// trap.items.push('');
		// trap.items.push('');
		// trap.items.push('');
		// trap.items.push('');
		// this.addItem(trap);
		// this.addItem(items['dirty metal bar']);
		// this.addItem(items['carrots']);
		// this.addItem(items['sticks']);
		// this.addItem(items['crate']);
		// let key = items['tricolor key'];
		// key.items.push('');
		// key.items.push('');
		// key.items.push('');
		// this.addItem(key);
		// this.addItem(items['red key']);
		// this.addItem(items['yellow key']);
		// this.addItem(items['blue key']);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeydown.bind(this));
		this.saveGameState();
	}

	saveGameState() {
		this.setState(currentState => {
			currentState.roomState = this.gameMap.getAllRoomStates();
		});
		let saveState = Object.assign({}, this.state);
		saveState.inventory = this.state.inventory.toJS();
		saveState.roomHistory = this.state.roomHistory.toJS();
		localStorage.setItem('state', JSON.stringify(saveState));
	}

	handleKeydown(e) {
		ControlsService.handleGameKeyDown(e, this);
		this.saveGameState();
	}

	render() {
		let history = [];
		this.state.roomHistory.forEach((h) => {
			history.push(<RoomCard room={h} key={h.moveCount} />);
		});

		return (
			<div className="container">
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
				<div className="history">
					{this.state.showItemInput &&
					<label style={{margin:'1rem, 1rem, 0, 0',}}>
						<Typography variant="body1" component="p" style={{display: 'inline-block'}}>What item do you use?</Typography>
						<TextField type="text"
							   value={this.state.userItemInput}
							   onChange={(e) => this.handleItemInputChange(e)}
							   onKeyDown={(e) => this.handleItemInputEnter(e)}
							   inputRef={this.itemInputRef}
							   style={{margin:'.25rem',}} />
					</label>
					}
					{this.state.showExamineInput &&
					<label style={{margin:'1rem 0 0 1rem',}}>
						<Typography variant="body1" component="p" style={{display: 'inline-block'}}>What do you examine?</Typography>
						<TextField type="text"
							   value={this.state.userExamineInput}
							   onChange={(e) => this.handleExamineInputChange(e)}
							   onKeyDown={(e) => this.handleExamineInputEnter(e)}
							   inputRef={this.examineInputRef}
							   style={{margin:'.25rem',}} />
					</label>
					}
					{this.state.showUseInput &&
					<label style={{margin:'.25rem',}}>
						<Typography variant="body1" component="p" style={{display: 'inline-block'}}>What do you use?</Typography>
						<TextField type="text"
							   value={this.state.userPrimaryUseInput}
							   onChange={(e) => this.handlePrimaryUseInputChange(e)}
							   onKeyDown={(e) => this.handleUseInputEnter(e)}
							   inputRef={this.useInputRef}
							   style={{margin:'.25rem',}} />
						<Typography variant="body1" component="p" style={{display: 'inline-block'}}>with</Typography>
						<TextField type="text"
							   value={this.state.userSecondaryUseInput}
							   onChange={(e) => this.handleSecondaryUseInputChange(e)}
							   onKeyDown={(e) => this.handleUseInputEnter(e)}
							   style={{margin:'.25rem',}} />
					</label>
					}
				{history}
				</div>
				<div style={{position: 'sticky', height: '100%', top: '0', padding: '1rem'}}>
					<div style={{display:'flexbox', flexDirection:'column', justifyContent:'space-between'}}>
						{!this.state.newGameConfirm ?
							<Button onClick={() => this.newGame(this.state.newGameConfirm)} variant="contained"
									style={{margin: '1rem',}}>
								New Game
							</Button>: null
						}
						{this.state.newGameConfirm ?
							<div>
								<Button onClick={() => this.newGame(this.state.newGameConfirm)} variant="contained" color="primary"
										style={{margin: '1rem',}}>
									Confirm
								</Button>
								<Button onClick={() => this.cancelNewGame()} variant="contained"
									style={{margin: '1rem',}}>
										Cancel
								</Button>
							</div>: null
						}
						<Inventory items={this.state.inventory} />
						<Instructions/>
					</div>
				</div>
			</div>
		);
	}

	newGame(newGameConfirm) {
		if (newGameConfirm) {
			localStorage.setItem('state', '');
			this.setState(this.getNewState());
			this.gameMap.resetRooms();
			this.move('tricolorCenter');
		} else {
			this.setState({newGameConfirm: true});
		}
	}

	cancelNewGame() {
		this.setState({newGameConfirm: false});
	}

	escape() {
		this.setState({
			showExamineInput: false,
			showUseInput: false,
			showItemInput: false
		});
	}

	showExamineInput() {
		this.setState({showExamineInput: true});
		this.examineInputRef.current.focus();
	}

	handleExamineInputChange(e) {
		this.setState({userExamineInput: e.target.value});
	}

	handleExamineInputEnter(e) {
		if (e.key === 'Enter') {
			this.submitItemToExamine();
		}
	}

	submitItemToExamine() {
		let userItemInput = this.state.userExamineInput.trim().toLowerCase();
		this.setState({userExamineInput: ''});
		if (this.state.inventory.get(userItemInput)) {
			this.addHistory(this.state.inventory.get(userItemInput).desc());
		} else if (userItemInput) {
			this.addHistory('You don\'t have one of those.');
		}
		this.setState({showExamineInput: false});
	}

	showUseInput() {
		this.setState({showUseInput: true});
		this.useInputRef.current.focus();
	}

	handlePrimaryUseInputChange(e) {
		this.setState({userPrimaryUseInput: e.target.value});
	}

	handleSecondaryUseInputChange(e) {
		this.setState({userSecondaryUseInput: e.target.value});
	}

	handleUseInputEnter(e) {
		if (e.key === 'Enter') {
			this.submitItemToUse();
		}
	}

	submitItemToUse() {
		let userPrimaryItemInput = this.state.userPrimaryUseInput.trim().toLowerCase();
		let userSecondaryItemInput = this.state.userSecondaryUseInput.trim().toLowerCase();
		this.setState({userPrimaryUseInput: ''});
		this.setState({userSecondaryUseInput: ''});
		if (this.state.inventory.get(userPrimaryItemInput)) {
			if (this.state.inventory.get(userSecondaryItemInput)) {
				if (userPrimaryItemInput !== userSecondaryItemInput) {
					this.useItems(items[userPrimaryItemInput], items[userSecondaryItemInput]);
				} else {
					this.addHistory('You only have one of those.');
				}
			} else if (userSecondaryItemInput) {
				this.addHistory('You don\'t have '+userSecondaryItemInput);
			}
		} else if (userPrimaryItemInput) {
			this.addHistory('You don\'t have '+userPrimaryItemInput);
		}
		this.setState({showUseInput: false});
	}

	useItems(primaryItem, secondaryItem) {
		if (!primaryItem.use) {
			let temp = primaryItem;
			primaryItem = secondaryItem;
			secondaryItem = temp;
		}
		if (primaryItem.use) {
			let primaryItemKey = primaryItem.name.toLowerCase();
			let secondaryItemKey = secondaryItem.name.toLowerCase();
			if (primaryItem.use === secondaryItem.use) {
				if (!this.state.inventory.has(primaryItem.use)) {
					let masterItem = items[primaryItem.use];
					this.addItem(masterItem);
					this.addComponentToItem(primaryItemKey, masterItem);
					this.addComponentToItem(secondaryItemKey, masterItem);
					this.removeItem(primaryItemKey);
					this.removeItem(secondaryItemKey);
				} else {
					this.addHistory('Try using each of those with the '+primaryItem.use);
				}
			} else if (primaryItem.use === secondaryItemKey) {
				let masterItem = this.state.inventory.get(secondaryItemKey);
				this.addComponentToItem(primaryItemKey, masterItem);
				this.removeItem(primaryItemKey);
			}
		}
	}

	showItemInput() {
		this.setState({showItemInput: true});
		this.itemInputRef.current.focus();
	}

	isInputOpen() {
		return this.state.showItemInput || this.state.showExamineInput || this.state.showUseInput;
	}

	getItem(itemName) {
		return this.state.inventory.get(itemName);
	}

	handleItemInputChange(e) {
		this.setState({userItemInput: e.target.value});
	}

	handleItemInputEnter(e) {
		if (e.key === 'Enter') {
			this.submitItemForInteract(e);
		}
	}

	submitItemForInteract() {
		let userItemInput = this.state.userItemInput.trim().toLowerCase();
		this.setState({userItemInput: ''});
		if (this.state.inventory.get(userItemInput)) {
			let itemEvent = this.getLocation().events[userItemInput];
			if (itemEvent) {
				itemEvent.evt.call(this.getLocation(), this);
			} else {
				this.addHistory('That\'s no use here.');
			}
		} else if (userItemInput) {
			this.addHistory('You don\'t have one of those.');
		}
		this.setState({showItemInput: false});
	}

	removeItem(itemName) {
		this.setState(currentState => {
			currentState.inventory = currentState.inventory.remove(itemName);
			return currentState;
		});
	}

	addItem(item) {
		this.setState(currentState => {
			currentState.inventory = currentState.inventory.set(item.name.toLowerCase(), item);
			return currentState;
		});
	}

	addComponentToItem(itemName, masterItem) {
		this.setState(currentState => {
			let inventory = currentState.inventory;
			masterItem.items.push(itemName);
			inventory.set(masterItem.name, masterItem);
			currentState.inventory = inventory;
			return currentState;
		});
	}

	moveNorth() {
		let nextRoom = this.getLocation().exits['n'];
		this.move(nextRoom);
	}

	moveSouth() {
		let nextRoom = this.getLocation().exits['s'];
		this.move(nextRoom);
	}

	moveEast() {
		let nextRoom = this.getLocation().exits['e'];
		this.move(nextRoom);
	}

	moveWest() {
		let nextRoom = this.getLocation().exits['w'];
		this.move(nextRoom);
	}

	pickup() {
		let events = this.getLocation().events;
		if (events && events.p) {
			let pickupEvents = events.p;
			if (pickupEvents.state === 'uncleared') {
				this.pickupItem(pickupEvents);
			} else if (!pickupEvents.state) {
				let unclearedEventKeys = _.filter(Object.keys(pickupEvents),
					eventKey => pickupEvents[eventKey].state === 'uncleared');
				let firstUnclearedEvent = _.head(unclearedEventKeys);
				if (firstUnclearedEvent) {
					this.pickupItem(this.getLocation().events.p[firstUnclearedEvent]);
				} else {
					this.addHistory('You don\'t find anything.');
				}
			} else {
				this.addHistory('You don\'t find anything.');
			}
		} else {
			this.addHistory('You don\'t find anything.');
		}
	}

	pickupItem(pickupEvent) {
		pickupEvent.state = 'cleared';
		this.addHistory(pickupEvent.desc);
		let item = items[pickupEvent.item];
		this.addItem(item);
	}

	interact() {
		let events = this.getLocation().events;
		if (events && events['i'] && events['i'].state === 'uncleared') {
			let interactEvent = events['i'];
			interactEvent.evt(this);
		} else {
			this.addHistory('There is nothing to do here.');
		}
	}

	examine() {
		if (this.state.inventory.size) {
			this.showExamineInput();
		} else {
			this.addHistory('You don\'t have anything to examine.');
		}
	}

	use() {
		if (this.state.inventory.size) {
			this.showUseInput();
		} else {
			this.addHistory('You don\'t have anything to use.');
		}
	}

	addRoomHistory(description) {
		this.setState(currentState => {
			currentState.moveCount = currentState.moveCount + 1;
			currentState.roomHistory = currentState.roomHistory.insert(0, this.getRoomHistoryEntry(description, currentState.moveCount));
			return currentState;
		});
	}

	addHistory(description) {
		if (description) {
			this.setState(currentState => {

				let historyEntry = this.getHistoryEntry(description, currentState.moveCount);

				let roomHistory = currentState.roomHistory.get(0);
				console.log(roomHistory);
				let updatedRoomHistory = Object.assign({}, roomHistory, {
					history: roomHistory.history.insert(0, historyEntry)
				});

				currentState.moveCount = currentState.moveCount + 1;
				currentState.roomHistory = currentState.roomHistory.set(0, updatedRoomHistory);
				return currentState;
			});
		}
	}

	getRoomHistoryEntry(description, moveCount) {
		return {
			moveCount: moveCount,
			history: description ? new List([this.getHistoryEntry(description, moveCount)]) : new List()
		};
	}

	getHistoryEntry(description, moveCount) {
		return {
			desc: description,
			moveCount: moveCount
		};
	}

	move(nextRoom) {
		if (nextRoom) {
			if (nextRoom.state === 'locked') {
				this.addHistory('The door is locked.');
			} else {
				nextRoom = nextRoom.name || nextRoom;
				this.addRoomHistory();
				this.addHistory(this.gameMap.getRoomDesc(nextRoom));
				this.setState({location: nextRoom});
			}
		} else {
			this.addHistory('You can\'t go that way.');
		}
	}

	getLocation() {
		return this.gameMap.getRoom(this.state.location);
	}
}