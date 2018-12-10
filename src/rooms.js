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

rooms.exit = new Room(
	'As you walk down the long hall you eventually see sunlight and the fresh air of freedom. You feel reinvigorated and alive as you never have before. By giving honor to others, you have freed yourself. Congratulations.'
);

rooms.tricolorCenter = new Room(
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
		p: {
			title: 'note',
			state: 'uncleared',
			uncleared: 'You notice a note laying in the corner.',
			desc: 'You pick up the note',
			item: 'note'
		},
		i: {
			state: 'uncleared',
			uncleared: 'It is white with a barred door. Through it is darkness and you soon see a large beast come attacking at the door, trying to chew through it, seeming desperate to break the bars, though they hold fast. On the door is a lock which has space for a three sided key.',
			cleared: 'The door is now open and the creature sits docile, excited for his master to be free.',
			evt: game => game.showItemInput()
		},
		'tricolor key': {
			evt: function(game) {
				this.events.i.state = 'cleared';
				this.exits.n.state = 'unlocked';
				game.removeItem('tricolor key');
				game.addHistory('As you approach the door, the beast attacks the bars even more, though never close to where you move. The key fits clean in the lock. You twist and hear the lock \'click\' and the door swings open. The beast gives a howl of joy and runs to your side, master and companion reunited. To the north, the door is open.');
			}
		}
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

rooms.kitchen = new Room(
	'You follow the scent of cooking food and come into a kitchen. You think your favorite meal might be cooking, but can\'t seem to find where the smell is coming from. To the west you see the blue wall and stone door through which you came. To the south is a glass french door, leading to the back yard.',
	{
		w: 'blueFoyer',
		s: 'backyard'
	}
);

rooms.laundry = new Room(
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
			evt: function(game) {
				this.events.i.state = 'cleared';
				game.removeItem('dirty metal bar');
				game.addItem(items.lever);
				game.addHistory('You run the filthy metal bar under some warm water and apply generous portions of soap to it. After some time and much elbow grease, you clean the long bar and find it to look something like a lever.');
			}
		}
	}
);

rooms.living = new Room(
	'You walk towards the sounds of laughter though you don\'t see anyone around. There are two large and fluffy couches on the south and west walls, but you find yourself in too much need to complete your quest to take a break. To the north you notice a shirt laying next to a door way. To the east you see a large and expansive room.',
	{
		n: 'laundry',
		e: 'elephant'
	}
);

rooms.elephant = new Room(
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
			evt: function(game) {
				this.events.i.state = 'cleared';
				game.removeItem('lever');
				game.addItem(items['blue key']);
				game.addHistory('You insert the lever into the mechanism and pull it. The walls begin to make a whirring noise, and from them sprouts a platform, from the pedestal on which the elephant sits, to the one higher. The elephant follows the walkway to the top and with his trunk, he drops the glimmering blue key, which you quickly take.');
			}
		}
	}
);

rooms.backyard = new Room(
	'You come outside to find a large backyard with a swing set and a sandbox, though neither look like they\'ve been used in some time. To the north you see glass french doors leading into a kitchen. To the west you see a glass door leading into a wide expanse of a room. To the south, past the swing set and play ground you see a large mud patch. It\'s gross',
	{
		n: 'kitchen',
		s: 'mud0',
		w: 'elephant'
	}
);

rooms.mud0 = new Room(
	'You step into the mud, and it comes up to your knees and seems to get even deeper. You don\'t enjoy it. To the north, you see the playground and back of the house. To the south there is more mud.',
	{
		n: 'backyard',
		s: 'mud2',
	}
);

rooms.mud1 = new Room(
	'The mud is nearly to your waist. The smell is not just just of earth but also grime. To the north it seems to get more shallow. To the west, there is a fence. To the south and east, there is more mud.',
	{
		n: 'mud0',
		s: 'mud4',
		e: 'mud2'
	}
);

rooms.mud2 = new Room(
	'The mud is nearly to your waist, now. To the north it seems to get more shallow. To the south, east, and west, there is more mud.',
	{
		n: 'mud0',
		s: 'mud5',
		e: 'mud3',
		w: 'mud1'
	}
);

rooms.mud3 = new Room(
	'The mud is nearly to your waist. You think you feel something under the surface. Hopefully it\'s just your imagination. To the north it seems to get more shallow. To the east, there is a fence. To the south and west, there is more mud.',
	{
		n: 'mud0',
		s: 'mud6',
		w: 'mud2'
	}
);

rooms.mud4 = new Room(
	'The mud is to your waist. The smell is getting worse. To the north it seems to get more shallow. To the west, there is a fence. To the south and east, there is more mud.',
	{
		n: 'mud1',
		s: 'mud7',
		e: 'mud5'
	}
);

rooms.mud5 = new Room(
	'The mud is to your waist. You regret coming out here. To the north it seems to get more shallow. To the south, west, and east, there is more mud.',
	{
		n: 'mud2',
		s: 'mud8',
		e: 'mud6',
		w: 'mud4'
	}
);

rooms.mud6 = new Room(
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

rooms.mud7 = new Room(
	'The mud is above your waist. The smell awful. You don\'t think you can go any further in, though the mud continue on to the horizon. To the north it seems to get more shallow. To the west, there is a fence. To the south and east, there is more mud.',
	{
		n: 'mud4',
		e: 'mud8'
	}
);

rooms.mud8 = new Room(
	'The mud is above your waist. You feel exhaustion overtaking you. You don\'t think you can go any further in, though the mud continue on to the horizon. To the north it seems to get more shallow. To the west, south, and east, there is more mud.',
	{
		n: 'mud5',
		e: 'mud9',
		w: 'mud7'
	}
);

rooms.mud9 = new Room(
	'The mud is above your waist. You feel something nibble at your ankle. You don\'t think you can go any further in, though the mud continue on to the horizon. To the north it seems to get more shallow. To the east, there is a fence. To the south and west, there is more mud.',
	{
		n: 'mud6',
		w: 'mud8'
	}
);

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
	'A crystalline red key, in the form of an old skeleton key. It matches the color of the room in which you began perfectly.',
	'tricolor key'
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
	'A bright and glistening yellow key. Seems made of the same stuff as the room in which you began.',
	'tricolor key'
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
	'A royal blue key, shining and crystalline as the room from which you entered.',
	'tricolor key'
);

//Tricolor
items['tricolor key'] = new Item(
	'Tricolor Key',
	'A three sided key, of three distinct colors. The red, blue and yellow of the room in which you began.'
);
items['tricolor key'].required = ['red key', 'yellow key', 'blue key'];
items['note'] = new Item(
	'Note',
	"The note reads: 'I don't know how I got here but that creature terrifies me. Exhausted... I feel, so tired. No matter what door I go through, I can't seem to find peace. A quest keeps nagging at me. I've noticed some keys laying around but the animals, they guard them jealously. I worry they'll set that beast free if they ever meet up. Maybe one of these times, I'll remember what I've already tried.' You recognize the handwriting to be your own."
);