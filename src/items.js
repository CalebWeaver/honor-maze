export class Item {
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
	'fishing pole',
);
items['thread'] = new Item(
	'Thread',
	'Durable, but difficult to see.',
	'animal trap',
);
items['animal trap'] = new Item(
		'Animal Trap',
		'Be vewy vewy quiet.'
);
items['animal trap'].required = ['sticks', 'crate', 'carrots', 'thread'];
items.rabbit = new Item(
	'Rabbit',
	'Don\'t worry, it\'s not that cute.'
);
items['fish'] = new Item(
	'Fish',
	'Something doesn\'t seem right about this.'
);
items['red key'] = new Item(
	'Red Key',
	'A crystalline red key, in the form of an old skeleton key. It matches the color of the room in which you began perfectly.',
	'tricolor key'
);

//Yellow
items['fishing pole shaft'] = new Item(
	'Fishing Pole Shaft',
	'A step up from bare hands.',
	'fishing pole'
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
items['fishing hook'] = new Item(
	'Fishing Hook',
	'It\'s old, and rusted, but you doubt the fish will mind.',
	'fishing pole',
);
items['worm'] = new Item(
	'Worm',
	'Gross.',
	'fishing pole',
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
items['fishing pole'] = new Item(
	'Fishing Pole',
	'You might be able to catch a fish with this.'
);
items['fishing pole'].required = ['fishing pole shaft', 'fishing line', 'fishing hook', 'worm'];