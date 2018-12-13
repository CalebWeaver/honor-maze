export default class ControlsService {
	static handleGameKeyDown(e, game) {
		if (isEscape(e)) {
			game.escape();
		}
		if (!game.isInputOpen()) {
			if (isNorth(e)) {
				game.moveNorth();
			} else if (isSouth(e)) {
				game.moveSouth();
			} else if (isEast(e)) {
				game.moveEast();
			} else if (isWest(e)) {
				game.moveWest();
			} else if (isInteract(e)) {
				e.preventDefault();
				game.interact();
			} else if (isPickup(e)) {
				game.pickup();
			} else if (isExamine(e)) {
				e.preventDefault();
				game.examine();
			} else if (isUse(e)) {
				e.preventDefault();
				game.use();
			}
		}
	}
}

function isNorth(e) {
	return e.code === 'KeyN';
}

function isSouth(e) {
	return e.code === 'KeyS';
}

function isEast(e) {
	return e.code === 'KeyE';
}

function isWest(e) {
	return e.code === 'KeyW';
}

function isInteract(e) {
	return e.code === 'KeyI';
}

function isPickup(e) {
	return e.code === 'KeyP';
}

function isExamine(e) {
	return e.code === 'KeyX';
}

function isUse(e) {
	return e.code === 'KeyU';
}

function isEscape(e) {
	return e.code === 'Escape';
}