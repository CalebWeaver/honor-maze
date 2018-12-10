class Room {
	constructor(desc, exits, events) {
		this.desc = desc;
		this.exits = exits;
		this.events = events;
	}
}

export let rooms = {};
rooms.hall1 = new Room(
	'You see a long stretch of hallway before you.',
	{
		n: 'hall2'
	}
);
rooms.hall2 = new Room(
	'You see more hallway before you.',
	{
		s: 'hall1',
		n: 'hall3'
	},
	{
		p: {
			title: 'key',
			state: 'uncleared',
			uncleared: 'You also see a key on the ground.',
			desc: 'You pick up the key.',
			item: 'hall key'
		}
	}
);
rooms.hall3 = new Room(
	'A short stretch of hall ends at a doorway.',
	{
		s: 'hall2',
		n: {
			name: 'treasure',
			state: 'locked'
		}
	},
	{
		i: {
			state: 'uncleared',
			uncleared: 'You come to a locked door',
			cleared: 'You see an open door, with a treasure room behind on the other side.',
			evt: (game) => {
				game.showItemInput();
			}
		},
		'hall key': {
			evt: function(game) {
				this.events.i.state = 'cleared';
				this.exits.n.state = 'unlocked';
				game.removeItem('hall key');
				game.addHistory('The lock clicks and the door swings open, revealing the treasure beyond.');
			}
		}
	}
);
rooms.treasure = new Room(
	'You enter into a large room filled with treasure!',
	{
		s: 'hall3'
	}
);

rooms.tricolorCenter = new Room(
	'You find yourself in a room of three colors which come to distinct borders. You have a vague sense of direction and are able to find your bearings. To your east is yellow, at the center of which is a wooden door. To the south, blue, in which is a stone door. Finally, to the west is red where there is a metal door. The north end of the room holds no color. It is white with a barred door. Through it is darkness and you soon see a large beast come attacking at the door, trying to chew through it, seeming desperate to break the bars, though they hold fast. On the door is a lock which has space for a three sided key.',
	{
		n: {
			name: '',
			state: 'locked',
		},
		s: 'blueFoyer',
		e: 'yellowFoyer',
		w: 'redFoyer',
	}
);

rooms.yellowFoyer = new Room(
	'You enter into a yellow room which coalesces into what seems to be a utility shed. The rooms are dimly lit and are old and dusty. The walls are nearly covered with items of all sorts, you can only guess if there\'s a system of organization. To the north there lies an old rusted and broken watering can, and a rake on either side of a door. To the south there is a coil of electrical wire and a box of batteries lying on a bench. To the east there is little of the clutter of the surrounding area.',
	{
		n: 'fishing',
		s: 'gardening',
		e: 'eagle',
		w: 'tricolorCenter'
	}
);

rooms.fishing = new Room(
	'You walk into a room full of lures, boggles, hats and poles. The walls are cluttered with items of all sorts and pictures of lands all over. To the south you see the telltale yellow of the room in which you began. To the east you notice some sawdust littering the floor.',
	{
		s: 'yellowFoyer',
		e: 'woodworking'
	},
	{
		p: {
			title: 'fishing pole',
			state: 'uncleared',
			desc: 'You grab one of the fishing poles',
			item: 'fishing pole',
		}
	}
);

rooms.gardening = new Room(
	'This room is full of watering pales, hoses, and dirt. You suspect you could grow just about anything with the supplies in this room. Tot he north, you see the shining yellow which surrounds the wooden door through which you entered. To the east you notice some coils of electrical wire.',
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

rooms.woodworking = new Room(
	'You enter the room to find lumber and wood scraps adorning the various benches and tables. There are many manual tools and the smell of sawdust in the air. To the west you see a tackle box laying on the ground. To the south you see a suspiciously empty room.',
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

rooms.electrical = new Room(
	'In this room you find wire cutters, soldering irons and batteries. It seems so be an electrical laboratory of some sort. You worry about touching much of anything, lest you electrocute yourself. To the west you see a potted plant with a sproutling. To the north you see a room with far less clutter than the others.',
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

rooms.eagle = new Room(
	'You enter the mostly empty room, confused by it compared to the rest of the area. In the corner, you notice a large bird cage. To the north you see a stack of wood blocks. To the south you see a couple batteries lying about. To the west, you can see the wooden door, surrounded by yellow, shining bright in the dim shed.',
	{
		n: 'woodworking',
		s: 'electrical',
		w: 'yellowFoyer'
	},{
		i: {
			state: 'uncleared',
			uncleared: 'Inside the cage is a majestic eagle. The eagle is fiercely angry, flapping its wings trying to escape. You notice grasped in its talon is a gleaming yellow key.',
			cleared: 'The cage sits empty and broken, its old inhabitant now gone.',
			evt: game => game.showItemInput()
		},
		'wire cutters': {
			evt: function(game) {
				this.events.i.state = 'cleared';
				game.removeItem('wire cutters');
				game.addItem(items['yellow key']);
				game.addHistory('As you press the wire cutters to the cage the eagle gets even more upset, but you press on. Once you cut open a section of the cage, the eagle flies out in a flurry. He goes into the north room, flies left and disappears. In his now empty cage, lies the yellow key, which you take.');
			}
		},
		'fishing pole': {
			evt: function(game) {
				game.addHistory('You spend some time trying to fish the key out of the cage, but to no avail. The eagle is too fast for that.');
			}
		},
		'carving knife': {
			evt: function(game) {
				game.addHistory('You can\'t bring yourself to do that to an eagle.');
			}
		},
		'gardening hose': {
			evt: function(game) {
				game.addHistory('You don\'t think that\'s how a gardening hose works.');
			}
		}
	}
);

rooms.blueFoyer = new Room(
	'You enter into a room which reminds you of a lovely and lived in home, aside from the blue crystalline wall surrounding a stone door. There are pictures on the wall of families of all sorts. To the north is the stone door. To the south you see a wide expanse of a living room. To the west you see some clothes laying on the ground. To the east you smell lovely cooking food.',
	{
		n: 'tricolorCenter',
		s: 'elephant',
		e: 'kitchen',
		w: 'laundry'
	}
);

rooms.kitchen = new Room();

rooms.laundry = new Room();

rooms.living = new Room();

rooms.elephant = new Room();

rooms.backyard = new Room();

rooms.mud1 = new Room();

rooms.mud2 = new Room();

rooms.mud3 = new Room();

rooms.redFoyer = new Room(
	'You come into a room where the red coalesces into the outdoors. You are surrounded by rolling hills, vast greenery and various animals scurrying about from the trees and bushes. To the north the grass and brush are giving way to more rocky terrain. To the south, the rolling hills around you level out into a vast prairie. To the west, the animals seem to be less frequent. To the east, you see a metal door, incongruous with your surroundings.',
	{
		n: 'rocks',
		s: 'stream',
		e: 'tricolorCenter',
		w: 'lion',
	}
);

rooms.lion = new Room(
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
			evt: function(game) {
				this.events.i.state = 'cleared';
				game.addHistory('The lion watches you intently as you hold out the rabbit. No sooner does he take a bite than does his entire visage change, as he reverts to a lion in his prime. He roars a mighty roar, dropping you to your knees, but then he merely holds out the red key. You take it gingerly');
				game.removeItem('rabbit');
				game.addItem(items['red key']);
			}
		}
	}
);

rooms.forest = new Room(
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
			evt: function(game) {
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

rooms.rocks = new Room(
	'The greenery and life slowly gives way to some rocky terrain, with mountains in the far distance. There are no animals here, and the sun burns down hot on your head.',
	{
		s: 'redFoyer',
		w: 'forest'
	}
);

rooms.camp = new Room(
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

rooms.stream = new Room(
	'As you walk along the prairie, you come to a stream. It seems like someone once fished here, though now the area is overgrown.',
	{
		n: 'redFoyer',
		w: 'camp'
	},{
		p: {
			title: 'fishing line',
			state: 'uncleared',
			uncleared: 'You do manage to find several feet of fishing line in the brushes.',
			desc: 'You pick up the fishing line.',
			item: 'fishing line',
		}
	}
);

class Item {
	constructor(name, desc, use) {
		this.name = name;
		this.descFlavor = desc;
		this.use = use;
		this.items = [];
	}

	desc() {
		let fullDesc = this.descFlavor;
		if (this.required) {
			fullDesc += ' Currently has ';
			this.items.forEach(item => fullDesc += item + ', ');
			fullDesc = fullDesc.substring(0, fullDesc.length - 2);
			fullDesc += '. Needs ' + (this.required.length - this.items.length) + ' more items.';
		}
		return fullDesc;
	}
}

export let items = {};
	items['hall key'] = new Item(
		'Hall Key',
		'An old brass skeleton key.'
	);

//Red
items.sticks = new Item(
		'Sticks',
		'They\'re brown and sticky.',
		'animal trap',
);
items.carrots = new Item(
		'Carrots',
		'Not your favorite, but they are food.',
		'animal trap',
);
items.crate = new Item(
		'Crate',
		'A wooden box with 5 sides.',
		'animal trap',
);
items.canteen = new Item(
		'Canteen',
		'There\'s a bit of foul-smelling liquid inside.'
);
items['sleeping bag'] = new Item(
		'Sleeping Bag',
		'Careful, you don\'t want to wake it.'
);
items['fishing line'] = new Item(
		'Fishing Line',
		'Somehow, it\'s not even tangled.',
		'animal trap',
);
items['animal trap'] = new Item(
		'Animal Trap',
		'Be vewy vewy quiet.'
);
items['animal trap'].required = ['sticks', 'crate', 'carrots', 'fishing line'];
items.rabbit = new Item(
	'Rabbit',
	'Don\'t worry, it\'s not that cute.'
);
items['red key'] = new Item(
	'Red Key',
	'A crystalline red key, in the form of an old skeleton key. It matches the color of the room in which you began perfectly.'
);

//Yellow
items['fishing pole'] = new Item(
	'Fishing Pole',
	'A step up from bare hands.'
);
items['wire cutters'] = new Item(
	'Wire Cutters',
	'Like big scissors. Best not to run.'
);
items['gardening hose'] = new Item(
	'Gardening Hose',
	'A green rubber hose, though you\'re not sure it will do much good without a spigot to hook into.'
);
items['carving knife'] = new Item(
	'Carving Knife',
	'Maybe just become a carpenter?'
);
items['yellow key'] = new Item(
	'Yellow Key',
	'A bright and glistening yellow key. Seems made of the same stuff as the room in which you began.'
);

//Blue
items['dirty metal bar'] = new Item(
	'Dirty Metal Bar',
	'A long piece of metal covered in mud and muck. Why are you carrying this?'
);
items['lever'] = new Item(
	'Lever',
	'A long lever, which seems like it could slot into a mechanism.'
);
items['blue key'] = new Item(
	'Blue Key',
	'A royal blue key, shining and crystalline as the room from which you entered.'
);