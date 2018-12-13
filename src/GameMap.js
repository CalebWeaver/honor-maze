import * as _ from 'lodash';
import {items} from './items';

export class GameMap {

	static originalRooms = {};

	constructor() {
		createRooms();
		this.rooms = GameMap.originalRooms;
	}

	getAllRoomStates() {
		let roomStates = {};
		Object.keys(this.rooms).forEach(roomName => {
			roomStates[roomName] = this.rooms[roomName].getState();
		});
		return roomStates;
	}

	setAllRoomStates(saveState) {
		Object.keys(saveState).forEach(roomKey => {
			let room = this.getRoom(roomKey);
			room.setState(saveState[roomKey]);
		});
	}

	getRoom(roomName) {
		return this.rooms[roomName];
	}

	getRoomDesc(roomName) {

		let roomDesc = '';

		roomDesc += this.rooms[roomName].desc + '\n';

		_.map(this.getRoom(roomName).events, (evt) => {
			if (!Array.isArray(evt)) {
				roomDesc += evt[evt.state] ? evt[evt.state] + '\n' : '';
			} else {
				evt.forEach(subEvent => {
					roomDesc += subEvent[subEvent.state] + '\n';
				});
			}
		});
		return roomDesc;
	}

	resetRooms() {
		createRooms();
	}
}

class Room {
	constructor(desc, exits, events) {
		this.desc = desc;
		this.exits = exits;
		this.events = events;
	}

	getState() {
		let state = {};
		let room = this;
		if (room.events) {
			Object.keys(room.events).forEach(eventKey => {
				let roomEvent = room.events[eventKey];
				if (roomEvent.state) {
					state[eventKey] = roomEvent.state;
				} else {
					state[eventKey] = {};
					Object.keys(roomEvent).forEach(subeventKey => {
						state[eventKey][subeventKey] = roomEvent[subeventKey].state;
					});
				}
			});
		}
		return state;
	}

	setState(state) {
		let room = this;
		if (room.events) {
			Object.keys(room.events).forEach(eventKey => {
				if (room.events[eventKey].state) {
					room.events[eventKey].state = state[eventKey];
				} else {
					Object.keys(room.events[eventKey]).forEach(subeventKey => {
						room.events[eventKey][subeventKey].state = state[eventKey][subeventKey];
					});
				}
			});
		}
	}
}

const createRooms = function() {

	GameMap.originalRooms.exit = new Room(
		'As you walk down the long hall you eventually see sunlight and the fresh air of freedom. You feel reinvigorated and alive as you never have before. By giving honor to others, you have freed yourself. Congratulations.'
	);

	GameMap.originalRooms.tricolorCenter = new Room(
		'You find yourself in a room of three colors which come to distinct borders. You have a vague sense of direction and are able to find your bearings. To your east is yellow, at the center of which is a wooden door. To the south, blue, in which is a stone door. Finally, to the west is red where there is a metal door. The north end of the room holds no color.',
		{
			n: {
				name: 'exit',
				state: 'locked',
			},
			s: 'blueFoyer',
			e: 'yellowFoyer',
			w: 'redFoyer',
		},
		{
			i: {
				state: 'uncleared',
				uncleared: 'It is white with a barred door. Through it is darkness and you soon see a large beast come attacking at the door, trying to chew through it, seeming desperate to break the bars, though they hold fast. On the door is a lock which has space for a three sided key.',
				cleared: 'The door is now open and the creature sits docile, excited for his master to be free.',
				evt: game => game.showItemInput()
			},
			p: {
				title: 'note',
				state: 'uncleared',
				uncleared: 'You notice a note laying in the corner.',
				desc: 'You pick up the note',
				item: 'note'
			},
			'tricolor key': {
				evt: function (game) {
					if (game.getItem('tricolor key').items.length === 3) {
						// this.events.i.state = 'cleared';
						this.exits.n.state = 'unlocked';
						game.removeItem('tricolor key');
						game.addHistory('As you approach the door, the beast attacks the bars even more, though never close to where you move. The key fits clean in the lock. You twist and hear the lock \'click\' and the door swings open. The beast gives a howl of joy and runs to your side, master and companion reunited. To the north, the door is open.');
					} else {
						game.addHistory('Your key doesn\'t quite fit the lock');
					}
				}
			},
			'fish': {
				evt: function(game) {
					if (this.exits.n.state === 'unlocked') {
						this.events.i.state = 'cleared';
						game.removeItem('fish');
						game.addHistory('You offer the fish to the beast and he happily gobbles it down. Balthazar was such a good and loyal creature while you were locked away. You pat his head and his tail wags appreciatively.');
					} else {
						game.addHistory('That\'s no use here');
					}
				}
			}
		}
	);

	GameMap.originalRooms.yellowFoyer = new Room(
		'You enter into a yellow room which coalesces into what seems to be a utility shed. The rooms are dimly lit and are old and dusty. The walls are nearly covered with items of all sorts, you can only guess if there\'s a system of organization. To the north there lies an old rusted and broken watering can, and a rake on either side of a door. To the south there is a coil of electrical wire and a box of batteries lying on a bench next to a door. To the east there is a room with little of the clutter of the surrounding area.',
		{
			n: 'fishing',
			s: 'gardening',
			e: 'eagle',
			w: 'tricolorCenter'
		}
	);

	GameMap.originalRooms.fishing = new Room(
		'You walk into a room full of lures, boggles, hats and poles. Oddly, there doesn\'t seem to be and lines, hooks, or actual bait. The walls are cluttered with items of all sorts and pictures of lands all over. To the south you see the telltale yellow of the room in which you began. To the east you notice some sawdust littering the floor in front of a doorway.',
		{
			s: 'yellowFoyer',
			e: 'woodworking'
		},
		{
			p: {
				title: 'fishing pole shaft',
				state: 'uncleared',
				desc: 'You grab one of the fishing poles',
				item: 'fishing pole shaft',
			}
		}
	);

	GameMap.originalRooms.gardening = new Room(
		'This room is full of watering pales, hoses, and dirt. You suspect you could grow just about anything with the supplies in this room. To the north, you see the shining yellow which surrounds the wooden door through which you entered. To the east you notice some coils of electrical wire in front of a doorway.',
		{
			n: 'yellowFoyer',
			e: 'electrical'
		},
		{
			p: {
				title: 'gardening hose',
				state: 'uncleared',
				desc: 'You grab one of the gardening hoses',
				item: 'gardening hose',
			}
		}
	);

	GameMap.originalRooms.woodworking = new Room(
		'You enter the room to find lumber and wood scraps adorning the various benches and tables. There are many manual tools and the smell of sawdust in the air. To the west you see a tackle box laying on the ground next to a door. To the south you see a suspiciously empty room.',
		{
			s: 'eagle',
			w: 'fishing'
		},
		{
			p: {
				title: 'carving knife',
				state: 'uncleared',
				desc: 'You grab one of the carving knives',
				item: 'carving knife',
			}
		}
	);

	GameMap.originalRooms.electrical = new Room(
		'In this room you find wire cutters, soldering irons and batteries. It seems so be an electrical laboratory of some sort. You worry about touching much of anything, lest you electrocute yourself. To the west you see a potted plant with a sproutling next to a door. To the north you see a room with far less clutter than the others.',
		{
			n: 'eagle',
			w: 'gardening'
		},
		{
			p: {
				title: 'wire cutters',
				state: 'uncleared',
				desc: 'You grab one of the wire cutters',
				item: 'wire cutters',
			}
		}
	);

	GameMap.originalRooms.eagle = new Room(
		'You enter the mostly empty room, confused by it compared to the rest of the area. In the corner, you notice a large bird cage. To the north you see a stack of wood blocks strewn in front of a door. To the south you see a couple batteries lying about next to a door. To the west, you can see the wooden door, surrounded by yellow, shining bright in the dim shed.',
		{
			n: 'woodworking',
			s: 'electrical',
			w: 'yellowFoyer'
		}, {
			i: {
				state: 'uncleared',
				uncleared: 'Inside the cage is a majestic eagle. The eagle is fiercely angry, flapping its wings trying to escape. You notice grasped in its talon is a gleaming yellow key.',
				cleared: 'The cage sits empty and broken, its old inhabitant now gone.',
				evt: game => game.showItemInput()
			},
			'wire cutters': {
				evt: function (game) {
					this.events.i.state = 'cleared';
					game.removeItem('wire cutters');
					game.addItem(items['yellow key']);
					game.addHistory('As you press the wire cutters to the cage the eagle gets even more upset, but you press on. Once you cut open a section of the cage, the eagle flies out in a flurry. He goes into the north room, flies left and disappears. In his now empty cage, lies the yellow key, which you take.');
				}
			},
			'fishing pole': {
				evt: function (game) {
					game.addHistory('You spend some time trying to fish the key out of the cage, but to no avail. The eagle is too fast for that.');
				}
			},
			'carving knife': {
				evt: function (game) {
					game.addHistory('You can\'t bring yourself to do that to an eagle.');
				}
			},
			'gardening hose': {
				evt: function (game) {
					game.addHistory('You don\'t think that\'s how a gardening hose works.');
				}
			}
		}
	);

	GameMap.originalRooms.blueFoyer = new Room(
		'You enter into a room which reminds you of a lovely and lived in home, aside from the blue crystalline wall surrounding a stone door. There are pictures on the wall of families of all sorts. To the north is the stone door. To the south you see a wide expanse of a living room. To the west you see some clothes laying on the ground. To the east you smell lovely cooking food.',
		{
			n: 'tricolorCenter',
			s: 'elephant',
			e: 'kitchen',
			w: 'laundry'
		}
	);

	GameMap.originalRooms.kitchen = new Room(
		'You follow the scent of cooking food and come into a kitchen. You think your favorite meal might be cooking, but can\'t seem to find where the smell is coming from. To the west you see the blue wall and stone door through which you came. To the south is a glass french door, leading to the back yard.',
		{
			w: 'blueFoyer',
			s: 'backyard'
		},
		{
			p: {
				title: 'fishing hook',
				state: 'uncleared',
				uncleared: 'Something faintly shines in the corner on the counter.',
				desc: 'You find a small rusted fishing hook, laying on the counter in the corner. Long forgotten.',
				item: 'fishing hook',
			},
		}
	);

	GameMap.originalRooms.laundry = new Room(
		'You come into a room with a washer, dryer and a rack for hanging. There are some clothes piled in the corner and strewn about on the floor. There is also a large sink on the north wall. To the east you can see a bit of the blue wall, indicating the direction from which you came. To the south, you see some couches and hear laughter.',
		{
			e: 'blueFoyer',
			s: 'living'
		},
		{
			i: {
				state: 'uncleared',
				evt: game => game.showItemInput()
			},
			'dirty metal bar': {
				evt: function (game) {
					this.events.i.state = 'cleared';
					game.removeItem('dirty metal bar');
					game.addItem(items.lever);
					game.addHistory('You run the filthy metal bar under some warm water and apply generous portions of soap to it. After some time and much elbow grease, you clean the long bar and find it to look something like a lever.');
				}
			}
		}
	);

	GameMap.originalRooms.living = new Room(
		'You walk towards the sounds of laughter though you don\'t see anyone around. There are two large and fluffy couches on the south and west walls, but you find yourself in too much need to complete your quest to take a break. To the north you notice a shirt laying next to a door way. To the east you see a large and expansive room.',
		{
			n: 'laundry',
			e: 'elephant'
		}
	);

	GameMap.originalRooms.elephant = new Room(
		'As you enter the wide and expanding room, you first don\'t notice anything out of the ordinary until you look up. To the north you clearly see the stone door through which you entered. To the west you hear laughter. To the east there is a glass door leading outside.',
		{
			n: 'blueFoyer',
			w: 'living',
			e: 'backyard'
		},
		{
			i: {
				state: 'uncleared',
				uncleared: 'High above you see a pedestal on which an elephant is sitting looking longingly at the higher platform. Far on the other side of the room is another pedestal, even taller. You think you might see a smaller pedestal in the center of the second, taller one and can see the faintest glint of blue from it. On the southern wall there appears a mechanism of some sort, though there is a circular hole in the center of what might be a switch.',
				cleared: 'The elephant sits on the taller pedestal, it seeming to be his natural fit. He looks at you and you think you can read thanks in his eyes.',
				evt: game => game.showItemInput()
			},
			lever: {
				evt: function (game) {
					this.events.i.state = 'cleared';
					game.removeItem('lever');
					game.addItem(items['blue key']);
					game.addHistory('You insert the lever into the mechanism and pull it. The walls begin to make a whirring noise, and from them sprouts a platform, from the pedestal on which the elephant sits, to the one higher. The elephant follows the walkway to the top and with his trunk, he drops the glimmering blue key, which you quickly take.');
				}
			}
		}
	);

	GameMap.originalRooms.backyard = new Room(
		'You come outside to find a large backyard with a swing set and a sandbox, though neither look like they\'ve been used in some time. To the north you see glass french doors leading into a kitchen. To the west you see a glass door leading into a wide expanse of a room. To the south, past the swing set and play ground you see a large mud patch. It\'s gross.',
		{
			n: 'kitchen',
			s: 'mud0',
			w: 'elephant'
		},
		{
			p: {
				title: 'worm',
				state: 'uncleared',
				uncleared: 'There are some worms crawling around in the dirt around you.',
				desc: 'You pick up a worm. It\'s slimy and you feel gross.',
				item: 'worm',
			},
		}
	);

	GameMap.originalRooms.mud0 = new Room(
		'You step into the mud, and it comes up to your knees and seems to get even deeper. You don\'t enjoy it. To the north, you see the playground and back of the house. To the south there is more mud.',
		{
			n: 'backyard',
			s: 'mud2',
		}
	);

	GameMap.originalRooms.mud1 = new Room(
		'The mud is nearly to your waist. The smell is not just just of earth but also grime. To the north it seems to get more shallow. To the west, there is a fence. To the south and east, there is more mud.',
		{
			n: 'mud0',
			s: 'mud4',
			e: 'mud2'
		}
	);

	GameMap.originalRooms.mud2 = new Room(
		'The mud is nearly to your waist, now. To the north it seems to get more shallow. To the south, east, and west, there is more mud.',
		{
			n: 'mud0',
			s: 'mud5',
			e: 'mud3',
			w: 'mud1'
		}
	);

	GameMap.originalRooms.mud3 = new Room(
		'The mud is nearly to your waist. You think you feel something under the surface. Hopefully it\'s just your imagination. To the north it seems to get more shallow. To the east, there is a fence. To the south and west, there is more mud.',
		{
			n: 'mud0',
			s: 'mud6',
			w: 'mud2'
		}
	);

	GameMap.originalRooms.mud4 = new Room(
		'The mud is to your waist. The smell is getting worse. To the north it seems to get more shallow. To the west, there is a fence. To the south and east, there is more mud.',
		{
			n: 'mud1',
			s: 'mud7',
			e: 'mud5'
		}
	);

	GameMap.originalRooms.mud5 = new Room(
		'The mud is to your waist. You regret coming out here. To the north it seems to get more shallow. To the south, west, and east, there is more mud.',
		{
			n: 'mud2',
			s: 'mud8',
			e: 'mud6',
			w: 'mud4'
		}
	);

	GameMap.originalRooms.mud6 = new Room(
		'The mud is to your waist. You notice a disturbance in the surface of the mud. To the north it seems to get more shallow. To the east, there is a fence. To the south and west, there is more mud.',
		{
			n: 'mud3',
			s: 'mud9',
			w: 'mud5'
		},
		{
			p: {
				title: 'dirty metal bar',
				state: 'uncleared',
				desc: 'You search around in the mud and grime and find something solid in the mass of goo.',
				item: 'dirty metal bar'
			}
		});

	GameMap.originalRooms.mud7 = new Room(
		'The mud is above your waist. The smell awful. You don\'t think you can go any further in, though the mud continue on to the horizon. To the north it seems to get more shallow. To the west, there is a fence. To the south and east, there is more mud.',
		{
			n: 'mud4',
			e: 'mud8'
		}
	);

	GameMap.originalRooms.mud8 = new Room(
		'The mud is above your waist. You feel exhaustion overtaking you. You don\'t think you can go any further in, though the mud continue on to the horizon. To the north it seems to get more shallow. To the west, south, and east, there is more mud.',
		{
			n: 'mud5',
			e: 'mud9',
			w: 'mud7'
		}
	);

	GameMap.originalRooms.mud9 = new Room(
		'The mud is above your waist. You feel something nibble at your ankle. You don\'t think you can go any further in, though the mud continue on to the horizon. To the north it seems to get more shallow. To the east, there is a fence. To the south and west, there is more mud.',
		{
			n: 'mud6',
			w: 'mud8'
		}
	);

	GameMap.originalRooms.redFoyer = new Room(
		'You come into a room where the red coalesces into the outdoors. You are surrounded by rolling hills, vast greenery and various animals scurrying about from the trees and bushes. To the north the grass and brush are giving way to more rocky terrain. To the south, the rolling hills around you level out into a vast prairie. To the west, the animals seem to be less frequent. To the east, you see a metal door, incongruous with your surroundings.',
		{
			n: 'rocks',
			s: 'stream',
			e: 'tricolorCenter',
			w: 'lion',
		}
	);

	GameMap.originalRooms.lion = new Room(
		'You walk through some thicket and find a low outcropping of stone, under which lays a lion. \n To the north you see a forest of dense trees. To the south, you see smoke. To the east you see lines of red and the metal door.',
		{
			n: 'forest',
			s: 'camp',
			e: 'redFoyer'
		},
		{
			i: {
				state: 'uncleared',
				uncleared: 'He is large and scarred, but also seems old and weak. He seems thinner than he should, almost emaciated. You turn to run but not before seeing a shining red key under his paw. \n "What do you want, child?" He asks in a raspy voice. You gesture towards the key. "Ah, you seek the key? I\'ll need something in payment. Maybe something to help my strength return." ',
				cleared: 'He is strong and healthy, now, his power returned to him. While you still might not feel comfortable around him, you think he will let you live.',
				evt: (game) => {
					game.showItemInput();
				}
			},
			'rabbit': {
				evt: function (game) {
					this.events.i.state = 'cleared';
					game.addHistory('The lion watches you intently as you hold out the rabbit. No sooner does he take a bite than does his entire visage change, as he reverts to a lion in his prime. He roars a mighty roar, dropping you to your knees, but then he merely holds out the red key. You take it gingerly');
					game.removeItem('rabbit');
					game.addItem(items['red key']);
				}
			},
			'fish': {
				evt: function(game) {
					game.addHistory('The lion looks unamused and says, "You don\'t expect me to eat that, do you? I much prefer rabbit. Go feed that to whatever pet you keep."');
				}
			}
		}
	);

	GameMap.originalRooms.forest = new Room(
		'You come to a forest, teeming with wildlife. You hear birds chirping, deer rustling around in the distance and nearby you notice some rabbits.',
		{
			s: 'lion',
			e: 'rocks'
		},
		{
			p: {
				title: 'sticks',
				state: 'uncleared',
				uncleared: 'You notice some sticks lying around you.',
				desc: 'You pick up a few of the sticks.',
				item: 'sticks',
			},
			i: {
				state: 'uncleared',
				evt: (game) => {
					game.showItemInput();
				}
			},
			'animal trap': {
				evt: function (game) {
					this.events.i.state = 'cleared';
					if (game.getItem('animal trap').items.length !== 4) {
						game.addHistory('Your trap doesn\'t seem too effective at capturing rabbits.');
					} else {
						game.addHistory('You set up your primitive trap and after some trial and error are able to catch a rabbit.');
						game.removeItem('animal trap');
						game.addItem(items.rabbit);
					}
				}
			}
		}
	);

	GameMap.originalRooms.rocks = new Room(
		'The greenery and life slowly gives way to some rocky terrain, with mountains in the far distance. There are no animals here, and the sun burns down hot on your head.',
		{
			s: 'redFoyer',
			w: 'forest'
		},
		{
			p: {
				title: 'thread',
				state: 'uncleared',
				uncleared: 'You notice an old and tattered traveller\'s pack.',
				desc: 'Though most of the pack is in shambles, you are able to find most of a spool of thread.',
				item: 'thread',
			}
		}
	);

	GameMap.originalRooms.camp = new Room(
		'As you approach the smoke you find a campsite. Although there is remnants of a fresh fire, there are no other signs of recent inhabitants. There are three tents with various supplies inside, including food, some empty crates, a canteen and a sleeping bag. \n To the north you see more rolling hills. To the east you see a vast prairie.',
		{
			n: 'lion',
			e: 'stream',
		},
		{
			p: {
				carrots: {
					title: 'carrots',
					state: 'uncleared',
					uncleared: 'You see some food.',
					desc: 'Much of the food seems to have gone bad sitting out in the warm for who knows how long, but you are able to find some carrots which still seem to have some snap.',
					item: 'carrots',
				},
				crate: {
					title: 'crate',
					state: 'uncleared',
					uncleared: 'You find some empty wooden crates.',
					desc: 'You take one of the crates. It\'s bulky and cumbersome, but it\'s yours.',
					item: 'crate',
				},
				canteen: {
					title: 'canteen',
					state: 'uncleared',
					uncleared: 'You notice a canteen.',
					desc: 'As you pick up the canteen, you find it to have a bit of liquid still at the bottom.',
					item: 'canteen',
				},
				'sleeping bag': {
					title: 'sleeping bag',
					state: 'uncleared',
					uncleared: 'There is a sleeping bag on the floor in the corner.',
					desc: 'You pick up the sleeping bag carefully.',
					item: 'sleeping bag',
				}
			}
		}
	);

	GameMap.originalRooms.stream = new Room(
		'As you walk along the prairie, you come to a stream. It seems like someone once fished here, though now the area is overgrown.',
		{
			n: 'redFoyer',
			w: 'camp'
		}, {
			p: {
				title: 'fishing line',
				state: 'uncleared',
				uncleared: 'You do manage to find several feet of fishing line in the brushes.',
				desc: 'You pick up the fishing line.',
				item: 'fishing line',
			},
			i: {
				state: 'uncleared',
				evt: game => game.showItemInput()
			},
			'fishing pole': {
				evt: function(game) {
					if (game.getItem('fishing pole').items.length === 4) {
						this.events.i.state = 'cleared';
						game.addHistory('You throw your line into the water and after considerable time you pull in a fish.');
						game.addItem(items.fish);
					} else {
						game.addHistory('The fish don\'t seem interested.');
					}
				}
			}
		}
	);
};