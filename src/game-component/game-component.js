import React from 'react';
import ControlsService from '../utils/controls-service';
import {List, Map} from 'immutable';
import NavigatorService from "../navigator-service/navigator-service";
import {rooms, items} from '../rooms';
import './game-component.css';
import * as _ from 'lodash';
import Inventory from "../inventory-component/inventory-component";
import RoomCard from "../room-card-component/room-card-component";
import styled from "styled-components";

export default class Game extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			moveCount: 0,
			location: 'tricolorCenter',
			inventory: new Map(),
			roomHistory: new List(),
			userItemInput: '',
			showItemInput: false,
			userExamineInput: 'rabbit trap',
			showExamineInput: false,
			userPrimaryUseInput: '',
			showUseInput: false,
			userSecondaryUseInput: '',
		};

		this.state.roomHistory = this.state.roomHistory.push(this.getRoomHistoryEntry(rooms[this.state.location].desc));
		this.state.moveCount++;
		this.navigator = new NavigatorService();
		this.itemInputRef = React.createRef();
		this.examineInputRef = React.createRef();
		this.useInputRef = React.createRef();
	}

	componentDidMount() {
		document.addEventListener("keydown", this.handleKeydown.bind(this));
		// let trap = items['animal trap'];
		// trap.items.push('');
		// trap.items.push('');
		// trap.items.push('');
		// trap.items.push('');
		// this.addItem(trap);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeydown.bind(this));
	}

	handleKeydown(e) {
		ControlsService.handleGameKeyDown(e, this);
	}

	render() {
		let history = [];
		this.state.roomHistory.map((h) => {
			history.push(<RoomCard room={h} key={h.moveCount} />);
		});

		return (
			<div className="container">
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
				<div className="history">
					{this.state.showItemInput &&
					<label>
						What item do you use?
						<input type="text"
							   value={this.state.userItemInput}
							   onChange={(e) => this.handleItemInputChange(e)}
							   onKeyDown={(e) => this.handleItemInputEnter(e)}
							   ref={this.itemInputRef} />
					</label>
					}
					{this.state.showExamineInput &&
					<label>
						What do you examine?
						<input type="text"
							   value={this.state.userExamineInput}
							   onChange={(e) => this.handleExamineInputChange(e)}
							   onKeyDown={(e) => this.handleExamineInputEnter(e)}
							   ref={this.examineInputRef} />
					</label>
					}
					{this.state.showUseInput &&
					<label>
						What do you use?
						<input type="text"
							   value={this.state.userPrimaryUseInput}
							   onChange={(e) => this.handlePrimaryUseInputChange(e)}
							   onKeyDown={(e) => this.handleUseInputEnter(e)}
							   ref={this.useInputRef} />
						with
						<input type="text"
							   value={this.state.userSecondaryUseInput}
							   onChange={(e) => this.handleSecondaryUseInputChange(e)}
							   onKeyDown={(e) => this.handleUseInputEnter(e)} />
					</label>
					}
				{history}
				</div>
				<Inventory items={this.state.inventory} />
			</div>
		);
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
		let userItemInput = this.state.userExamineInput.toLowerCase();
		this.setState({userExamineInput: ''});
		if (this.state.inventory.get(userItemInput)) {
			this.addHistory(this.state.inventory.get(userItemInput).desc());
		} else {
			this.addHistory('You don\'t have one of those.');
		}
		this.state.showExamineInput = false;
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
		let userPrimaryItemInput = this.state.userPrimaryUseInput.toLowerCase();
		let userSecondaryItemInput = this.state.userSecondaryUseInput.toLowerCase();
		this.setState({userPrimaryUseInput: ''});
		this.setState({userSecondaryUseInput: ''});
		if (this.state.inventory.get(userPrimaryItemInput)) {
			if (this.state.inventory.get(userSecondaryItemInput)) {
				this.useItems(items[userPrimaryItemInput], items[userSecondaryItemInput]);
			} else {
				this.addHistory('You don\'t have '+userSecondaryItemInput);
			}
		} else {
			this.addHistory('You don\'t have '+userPrimaryItemInput);
		}
		this.state.showUseInput = false;
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
				let masterItem = this.inventory.get(secondaryItemKey);
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
		return this.state.showItemInput || this.state.showExamineInput || this.state.showPrimaryUseInput;
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
		let userItemInput = this.state.userItemInput.toLowerCase();
		this.setState({userItemInput: ''});
		if (this.state.inventory.get(userItemInput)) {
			let itemEvent = this.getLocation().events[userItemInput];
			if (itemEvent) {
				itemEvent.evt.call(this.getLocation(), this);
			} else {
				this.addHistory('That\'s no use here.');
			}
		} else {
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
		this.setState({
			moveCount: this.state.moveCount + 1,
			roomHistory: this.state.roomHistory.insert(0, this.getRoomHistoryEntry(description))
		});
	}

	addHistory(description) {
		if (description) {
			let historyEntry = this.getHistoryEntry(description);
			let roomHistory = this.state.roomHistory.get(0);
			let updatedRoomHistory = Object.assign({}, roomHistory, {
				history: roomHistory.history.insert(0, historyEntry)
			});
			this.setState({
				moveCount: this.state.moveCount + 1,
				roomHistory: this.state.roomHistory.set(0, updatedRoomHistory)
			});
		}
	}

	getRoomHistoryEntry(description) {
		return {
			moveCount: this.state.moveCount,
			history: description ? new List([this.getHistoryEntry(description)]) : new List()
		};
	}

	getHistoryEntry(description) {
		return {
			desc: description,
			moveCount: this.state.moveCount
		};
	}

	move(nextRoom) {
		if (nextRoom) {
			if (nextRoom.state === 'locked') {
				this.addHistory('The door is locked.');
			} else {
				nextRoom = nextRoom.name || nextRoom;
				this.addRoomHistory();
				_.map(rooms[nextRoom].events, (evt) => {
					if (evt.state) {
						this.addHistory(evt[evt.state]);
					} else {
						_.map(Object.values(evt), subEvent => {
							this.addHistory(subEvent[subEvent.state]);
						});
					}
				});
				this.addHistory(rooms[nextRoom].desc);
				this.setState({location: nextRoom});
			}
		} else {
			this.addHistory('You can\'t go that way.');
		}
	}

	getLocation() {
		return rooms[this.state.location];
	}
}