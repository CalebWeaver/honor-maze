(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{115:function(e,t,o){e.exports=o(232)},120:function(e,t,o){},122:function(e,t,o){},125:function(e,t,o){},127:function(e,t,o){},175:function(e,t,o){},232:function(e,t,o){"use strict";o.r(t);var n=o(0),a=o.n(n),s=o(14),i=o.n(s),r=(o(120),o(7)),h=o(5),u=o(9),l=o(8),c=o(10),m=(o(122),function(){function e(){Object(r.a)(this,e)}return Object(h.a)(e,null,[{key:"handleGameKeyDown",value:function(e,t){(function(e){return"Escape"===e.code})(e)&&t.escape(),t.isInputOpen()||(!function(e){return"KeyN"===e.code}(e)?!function(e){return"KeyS"===e.code}(e)?!function(e){return"KeyE"===e.code}(e)?!function(e){return"KeyW"===e.code}(e)?!function(e){return"KeyI"===e.code}(e)?!function(e){return"KeyP"===e.code}(e)?!function(e){return"KeyX"===e.code}(e)?function(e){return"KeyU"===e.code}(e)&&(e.preventDefault(),t.use()):(e.preventDefault(),t.examine()):t.pickup():(e.preventDefault(),t.interact()):t.moveWest():t.moveEast():t.moveSouth():t.moveNorth())}}]),e}());var d=o(25),y=function(){function e(t,o,n){Object(r.a)(this,e),this.name=t,this.descFlavor=o,this.use=n,this.items=[]}return Object(h.a)(e,[{key:"desc",value:function(){var e=this.descFlavor;return this.required&&(e+=" Currently has ",this.items.forEach(function(t){return e+=t+", "}),e=e.substring(0,e.length-2),e+=". Needs "+(this.required.length-this.items.length)+" more items."),e}}]),e}(),f={};f["hall key"]=new y("Hall Key","An old brass skeleton key."),f.sticks=new y("Sticks","They're brown and sticky.","animal trap"),f.carrots=new y("Carrots","Not your favorite, but they are food.","animal trap"),f.crate=new y("Crate","A wooden box with 5 sides. Large enough to comfortably hold a rabbit.","animal trap"),f.canteen=new y("Canteen","There's a bit of foul-smelling liquid inside."),f["sleeping bag"]=new y("Sleeping Bag","Careful, you don't want to wake it."),f["fishing line"]=new y("Fishing Line","Somehow, it's not even tangled.","fishing pole"),f.thread=new y("Thread","Durable, but difficult to see.","animal trap"),f["animal trap"]=new y("Animal Trap","Be vewy vewy quiet."),f["animal trap"].required=["sticks","crate","carrots","thread"],f.rabbit=new y("Rabbit","Don't worry, it's not that cute."),f.fish=new y("Fish","Something doesn't seem right about this."),f["red key"]=new y("Red Key","A crystalline red key, in the form of an old skeleton key. It matches the color of the room in which you began perfectly.","tricolor key"),f["fishing pole shaft"]=new y("Fishing Pole Shaft","A step up from bare hands.","fishing pole"),f["wire cutters"]=new y("Wire Cutters","Like big scissors. Best not to run."),f["gardening hose"]=new y("Gardening Hose","A green rubber hose, though you're not sure it will do much good without a spigot to hook into."),f["carving knife"]=new y("Carving Knife","Maybe just become a carpenter?"),f["yellow key"]=new y("Yellow Key","A bright and glistening yellow key. Seems made of the same stuff as the room in which you began.","tricolor key"),f["dirty metal bar"]=new y("Dirty Metal Bar","A long piece of metal covered in mud and muck. Why are you carrying this?"),f["fishing hook"]=new y("Fishing Hook","It's old, and rusted, but you doubt the fish will mind.","fishing pole"),f.worm=new y("Worm","Gross.","fishing pole"),f.lever=new y("Lever","A long lever, which seems like it could slot into a mechanism."),f["blue key"]=new y("Blue Key","A royal blue key, shining and crystalline as the room from which you entered.","tricolor key"),f["tricolor key"]=new y("Tricolor Key","A three sided key, of three distinct colors. The red, blue and yellow of the room in which you began."),f["tricolor key"].required=["red key","yellow key","blue key"],f.note=new y("Note","The note reads: 'I don't know how I got here but that creature terrifies me. Exhausted... I feel, so tired. No matter what door I go through, I can't seem to find peace. A quest keeps nagging at me. I've noticed some keys laying around but the animals, they guard them jealously. I worry they'll set that beast free if they ever meet up. Maybe one of these times, I'll remember what I've already tried.' You recognize the handwriting to be your own."),f["fishing pole"]=new y("Fishing Pole","You might be able to catch a fish with this."),f["fishing pole"].required=["fishing pole shaft","fishing line","fishing hook","worm"];var g=o(37),w=function(){function e(){Object(r.a)(this,e),v(),this.rooms=e.originalRooms}return Object(h.a)(e,[{key:"getAllRoomStates",value:function(){var e=this,t={};return Object.keys(this.rooms).forEach(function(o){t[o]=e.rooms[o].getState()}),t}},{key:"setAllRoomStates",value:function(e){var t=this;Object.keys(e).forEach(function(o){t.getRoom(o).setState(e[o])})}},{key:"getRoom",value:function(e){return this.rooms[e]}},{key:"getRoomDesc",value:function(e){var t="";return t+=this.rooms[e].desc+"\n",g.map(this.getRoom(e).events,function(e){Array.isArray(e)?e.forEach(function(e){t+=e[e.state]+"\n"}):t+=e[e.state]?e[e.state]+"\n":""}),t}},{key:"resetRooms",value:function(){v()}}]),e}();w.originalRooms={};var p=function(){function e(t,o,n){Object(r.a)(this,e),this.desc=t,this.exits=o,this.events=n}return Object(h.a)(e,[{key:"getState",value:function(){var e={},t=this;return t.events&&Object.keys(t.events).forEach(function(o){var n=t.events[o];n.state?e[o]=n.state:(e[o]={},Object.keys(n).forEach(function(t){e[o][t]=n[t].state}))}),e}},{key:"setState",value:function(e){var t=this;t.events&&Object.keys(t.events).forEach(function(o){t.events[o].state?t.events[o].state=e[o]:Object.keys(t.events[o]).forEach(function(n){t.events[o][n].state=e[o][n]})})}}]),e}(),v=function(){w.originalRooms.hall1=new p("You see a long stretch of hallway before you.",{n:"hall2"}),w.originalRooms.hall2=new p("You see more hallway before you.",{s:"hall1",n:"hall3"},{p:{title:"key",state:"uncleared",uncleared:"You also see a key on the ground.",desc:"You pick up the key.",item:"hall key"}}),w.originalRooms.hall3=new p("A short stretch of hall ends at a doorway.",{s:"hall2",n:{name:"treasure",state:"locked"}},{i:{state:"uncleared",uncleared:"You come to a locked door",cleared:"You see an open door, with a treasure room behind on the other side.",evt:function(e){e.showItemInput()}},"hall key":{evt:function(e){this.events.i.state="cleared",this.exits.n.state="unlocked",e.removeItem("hall key"),e.addHistory("The lock clicks and the door swings open, revealing the treasure beyond.")}}}),w.originalRooms.treasure=new p("You enter into a large room filled with treasure!",{s:"hall3"}),w.originalRooms.exit=new p("As you walk down the long hall you eventually see sunlight and the fresh air of freedom. You feel reinvigorated and alive as you never have before. By giving honor to others, you have freed yourself. Congratulations."),w.originalRooms.tricolorCenter=new p("You find yourself in a room of three colors which come to distinct borders. You have a vague sense of direction and are able to find your bearings. To your east is yellow, at the center of which is a wooden door. To the south, blue, in which is a stone door. Finally, to the west is red where there is a metal door. The north end of the room holds no color.",{n:{name:"exit",state:"locked"},s:"blueFoyer",e:"yellowFoyer",w:"redFoyer"},{p:{title:"note",state:"uncleared",uncleared:"You notice a note laying in the corner.",desc:"You pick up the note",item:"note"},i:{state:"uncleared",uncleared:"It is white with a barred door. Through it is darkness and you soon see a large beast come attacking at the door, trying to chew through it, seeming desperate to break the bars, though they hold fast. On the door is a lock which has space for a three sided key.",cleared:"The door is now open and the creature sits docile, excited for his master to be free.",evt:function(e){return e.showItemInput()}},"tricolor key":{evt:function(e){3===e.getItem("tricolor key").items.length?(this.exits.n.state="unlocked",e.removeItem("tricolor key"),e.addHistory("As you approach the door, the beast attacks the bars even more, though never close to where you move. The key fits clean in the lock. You twist and hear the lock 'click' and the door swings open. The beast gives a howl of joy and runs to your side, master and companion reunited. To the north, the door is open.")):e.addHistory("Your key doesn't quite fit the lock")}},fish:{evt:function(e){"unlocked"===this.exits.n.state?(this.events.i.state="cleared",e.removeItem("fish"),e.addHistory("You offer the fish to the beast and he happily gobbles it down. Balthazar was such a good and loyal creature while you were locked away. You pat his head and his tail wags appreciatively.")):e.addHistory("That's no use here")}}}),w.originalRooms.yellowFoyer=new p("You enter into a yellow room which coalesces into what seems to be a utility shed. The rooms are dimly lit and are old and dusty. The walls are nearly covered with items of all sorts, you can only guess if there's a system of organization. To the north there lies an old rusted and broken watering can, and a rake on either side of a door. To the south there is a coil of electrical wire and a box of batteries lying on a bench next to a door. To the east there is a room with little of the clutter of the surrounding area.",{n:"fishing",s:"gardening",e:"eagle",w:"tricolorCenter"}),w.originalRooms.fishing=new p("You walk into a room full of lures, boggles, hats and poles. Oddly, there doesn't seem to be and lines, hooks, or actual bait. The walls are cluttered with items of all sorts and pictures of lands all over. To the south you see the telltale yellow of the room in which you began. To the east you notice some sawdust littering the floor in front of a doorway.",{s:"yellowFoyer",e:"woodworking"},{p:{title:"fishing pole shaft",state:"uncleared",desc:"You grab one of the fishing poles",item:"fishing pole shaft"}}),w.originalRooms.gardening=new p("This room is full of watering pales, hoses, and dirt. You suspect you could grow just about anything with the supplies in this room. To the north, you see the shining yellow which surrounds the wooden door through which you entered. To the east you notice some coils of electrical wire in front of a doorway.",{n:"yellowFoyer",e:"electrical"},{p:{title:"gardening hose",state:"uncleared",desc:"You grab one of the gardening hoses",item:"gardening hose"}}),w.originalRooms.woodworking=new p("You enter the room to find lumber and wood scraps adorning the various benches and tables. There are many manual tools and the smell of sawdust in the air. To the west you see a tackle box laying on the ground next to a door. To the south you see a suspiciously empty room.",{s:"eagle",w:"fishing"},{p:{title:"carving knife",state:"uncleared",desc:"You grab one of the carving knives",item:"carving knife"}}),w.originalRooms.electrical=new p("In this room you find wire cutters, soldering irons and batteries. It seems so be an electrical laboratory of some sort. You worry about touching much of anything, lest you electrocute yourself. To the west you see a potted plant with a sproutling next to a door. To the north you see a room with far less clutter than the others.",{n:"eagle",w:"gardening"},{p:{title:"wire cutters",state:"uncleared",desc:"You grab one of the wire cutters",item:"wire cutters"}}),w.originalRooms.eagle=new p("You enter the mostly empty room, confused by it compared to the rest of the area. In the corner, you notice a large bird cage. To the north you see a stack of wood blocks strewn in front of a door. To the south you see a couple batteries lying about next to a door. To the west, you can see the wooden door, surrounded by yellow, shining bright in the dim shed.",{n:"woodworking",s:"electrical",w:"yellowFoyer"},{i:{state:"uncleared",uncleared:"Inside the cage is a majestic eagle. The eagle is fiercely angry, flapping its wings trying to escape. You notice grasped in its talon is a gleaming yellow key.",cleared:"The cage sits empty and broken, its old inhabitant now gone.",evt:function(e){return e.showItemInput()}},"wire cutters":{evt:function(e){this.events.i.state="cleared",e.removeItem("wire cutters"),e.addItem(f["yellow key"]),e.addHistory("As you press the wire cutters to the cage the eagle gets even more upset, but you press on. Once you cut open a section of the cage, the eagle flies out in a flurry. He goes into the north room, flies left and disappears. In his now empty cage, lies the yellow key, which you take.")}},"fishing pole":{evt:function(e){e.addHistory("You spend some time trying to fish the key out of the cage, but to no avail. The eagle is too fast for that.")}},"carving knife":{evt:function(e){e.addHistory("You can't bring yourself to do that to an eagle.")}},"gardening hose":{evt:function(e){e.addHistory("You don't think that's how a gardening hose works.")}}}),w.originalRooms.blueFoyer=new p("You enter into a room which reminds you of a lovely and lived in home, aside from the blue crystalline wall surrounding a stone door. There are pictures on the wall of families of all sorts. To the north is the stone door. To the south you see a wide expanse of a living room. To the west you see some clothes laying on the ground. To the east you smell lovely cooking food.",{n:"tricolorCenter",s:"elephant",e:"kitchen",w:"laundry"}),w.originalRooms.kitchen=new p("You follow the scent of cooking food and come into a kitchen. You think your favorite meal might be cooking, but can't seem to find where the smell is coming from. To the west you see the blue wall and stone door through which you came. To the south is a glass french door, leading to the back yard.",{w:"blueFoyer",s:"backyard"},{p:{title:"fishing hook",state:"uncleared",uncleared:"Something faintly shines in the corner on the counter.",desc:"You find a small rusted fishing hook, laying on the counter in the corner. Long forgotten.",item:"fishing hook"}}),w.originalRooms.laundry=new p("You come into a room with a washer, dryer and a rack for hanging. There are some clothes piled in the corner and strewn about on the floor. There is also a large sink on the north wall. To the east you can see a bit of the blue wall, indicating the direction from which you came. To the south, you see some couches and hear laughter.",{e:"blueFoyer",s:"living"},{i:{state:"uncleared",evt:function(e){return e.showItemInput()}},"dirty metal bar":{evt:function(e){this.events.i.state="cleared",e.removeItem("dirty metal bar"),e.addItem(f.lever),e.addHistory("You run the filthy metal bar under some warm water and apply generous portions of soap to it. After some time and much elbow grease, you clean the long bar and find it to look something like a lever.")}}}),w.originalRooms.living=new p("You walk towards the sounds of laughter though you don't see anyone around. There are two large and fluffy couches on the south and west walls, but you find yourself in too much need to complete your quest to take a break. To the north you notice a shirt laying next to a door way. To the east you see a large and expansive room.",{n:"laundry",e:"elephant"}),w.originalRooms.elephant=new p("As you enter the wide and expanding room, you first don't notice anything out of the ordinary until you look up. To the north you clearly see the stone door through which you entered. To the west you hear laughter. To the east there is a glass door leading outside.",{n:"blueFoyer",w:"living",e:"backyard"},{i:{state:"uncleared",uncleared:"High above you see a pedestal on which an elephant is sitting looking longingly at the higher platform. Far on the other side of the room is another pedestal, even taller. You think you might see a smaller pedestal in the center of the second, taller one and can see the faintest glint of blue from it. On the southern wall there appears a mechanism of some sort, though there is a circular hole in the center of what might be a switch.",cleared:"The elephant sits on the taller pedestal, it seeming to be his natural fit. He looks at you and you think you can read thanks in his eyes.",evt:function(e){return e.showItemInput()}},lever:{evt:function(e){this.events.i.state="cleared",e.removeItem("lever"),e.addItem(f["blue key"]),e.addHistory("You insert the lever into the mechanism and pull it. The walls begin to make a whirring noise, and from them sprouts a platform, from the pedestal on which the elephant sits, to the one higher. The elephant follows the walkway to the top and with his trunk, he drops the glimmering blue key, which you quickly take.")}}}),w.originalRooms.backyard=new p("You come outside to find a large backyard with a swing set and a sandbox, though neither look like they've been used in some time. To the north you see glass french doors leading into a kitchen. To the west you see a glass door leading into a wide expanse of a room. To the south, past the swing set and play ground you see a large mud patch. It's gross.",{n:"kitchen",s:"mud0",w:"elephant"},{p:{title:"worm",state:"uncleared",uncleared:"There are some worms crawling around in the dirt around you.",desc:"You pick up a worm. It's slimy and you feel gross.",item:"worm"}}),w.originalRooms.mud0=new p("You step into the mud, and it comes up to your knees and seems to get even deeper. You don't enjoy it. To the north, you see the playground and back of the house. To the south there is more mud.",{n:"backyard",s:"mud2"}),w.originalRooms.mud1=new p("The mud is nearly to your waist. The smell is not just just of earth but also grime. To the north it seems to get more shallow. To the west, there is a fence. To the south and east, there is more mud.",{n:"mud0",s:"mud4",e:"mud2"}),w.originalRooms.mud2=new p("The mud is nearly to your waist, now. To the north it seems to get more shallow. To the south, east, and west, there is more mud.",{n:"mud0",s:"mud5",e:"mud3",w:"mud1"}),w.originalRooms.mud3=new p("The mud is nearly to your waist. You think you feel something under the surface. Hopefully it's just your imagination. To the north it seems to get more shallow. To the east, there is a fence. To the south and west, there is more mud.",{n:"mud0",s:"mud6",w:"mud2"}),w.originalRooms.mud4=new p("The mud is to your waist. The smell is getting worse. To the north it seems to get more shallow. To the west, there is a fence. To the south and east, there is more mud.",{n:"mud1",s:"mud7",e:"mud5"}),w.originalRooms.mud5=new p("The mud is to your waist. You regret coming out here. To the north it seems to get more shallow. To the south, west, and east, there is more mud.",{n:"mud2",s:"mud8",e:"mud6",w:"mud4"}),w.originalRooms.mud6=new p("The mud is to your waist. You notice a disturbance in the surface of the mud. To the north it seems to get more shallow. To the east, there is a fence. To the south and west, there is more mud.",{n:"mud3",s:"mud9",w:"mud5"},{p:{title:"dirty metal bar",state:"uncleared",desc:"You search around in the mud and grime and find something solid in the mass of goo.",item:"dirty metal bar"}}),w.originalRooms.mud7=new p("The mud is above your waist. The smell awful. You don't think you can go any further in, though the mud continue on to the horizon. To the north it seems to get more shallow. To the west, there is a fence. To the south and east, there is more mud.",{n:"mud4",e:"mud8"}),w.originalRooms.mud8=new p("The mud is above your waist. You feel exhaustion overtaking you. You don't think you can go any further in, though the mud continue on to the horizon. To the north it seems to get more shallow. To the west, south, and east, there is more mud.",{n:"mud5",e:"mud9",w:"mud7"}),w.originalRooms.mud9=new p("The mud is above your waist. You feel something nibble at your ankle. You don't think you can go any further in, though the mud continue on to the horizon. To the north it seems to get more shallow. To the east, there is a fence. To the south and west, there is more mud.",{n:"mud6",w:"mud8"}),w.originalRooms.redFoyer=new p("You come into a room where the red coalesces into the outdoors. You are surrounded by rolling hills, vast greenery and various animals scurrying about from the trees and bushes. To the north the grass and brush are giving way to more rocky terrain. To the south, the rolling hills around you level out into a vast prairie. To the west, the animals seem to be less frequent. To the east, you see a metal door, incongruous with your surroundings.",{n:"rocks",s:"stream",e:"tricolorCenter",w:"lion"}),w.originalRooms.lion=new p("You walk through some thicket and find a low outcropping of stone, under which lays a lion. \n To the north you see a forest of dense trees. To the south, you see smoke. To the east you see lines of red and the metal door.",{n:"forest",s:"camp",e:"redFoyer"},{i:{state:"uncleared",uncleared:'He is large and scarred, but also seems old and weak. He seems thinner than he should, almost emaciated. You turn to run but not before seeing a shining red key under his paw. \n "What do you want, child?" He asks in a raspy voice. You gesture towards the key. "Ah, you seek the key? I\'ll need something in payment. Maybe something to help my strength return." ',cleared:"He is strong and healthy, now, his power returned to him. While you still might not feel comfortable around him, you think he will let you live.",evt:function(e){e.showItemInput()}},rabbit:{evt:function(e){this.events.i.state="cleared",e.addHistory("The lion watches you intently as you hold out the rabbit. No sooner does he take a bite than does his entire visage change, as he reverts to a lion in his prime. He roars a mighty roar, dropping you to your knees, but then he merely holds out the red key. You take it gingerly"),e.removeItem("rabbit"),e.addItem(f["red key"])}},fish:{evt:function(e){e.addHistory('The lion looks unamused and says, "You don\'t expect me to eat that, do you? I much prefer rabbit. Go feed that to whatever pet you keep."')}}}),w.originalRooms.forest=new p("You come to a forest, teeming with wildlife. You hear birds chirping, deer rustling around in the distance and nearby you notice some rabbits.",{s:"lion",e:"rocks"},{p:{title:"sticks",state:"uncleared",uncleared:"You notice some sticks lying around you.",desc:"You pick up a few of the sticks.",item:"sticks"},i:{state:"uncleared",evt:function(e){e.showItemInput()}},"animal trap":{evt:function(e){this.events.i.state="cleared",4!==e.getItem("animal trap").items.length?e.addHistory("Your trap doesn't seem too effective at capturing rabbits."):(e.addHistory("You set up your primitive trap and after some trial and error are able to catch a rabbit."),e.removeItem("animal trap"),e.addItem(f.rabbit))}}}),w.originalRooms.rocks=new p("The greenery and life slowly gives way to some rocky terrain, with mountains in the far distance. There are no animals here, and the sun burns down hot on your head.",{s:"redFoyer",w:"forest"},{p:{title:"thread",state:"uncleared",uncleared:"You notice an old and tattered traveller's pack.",desc:"Though most of the pack is in shambles, you are able to find most of a spool of thread.",item:"thread"}}),w.originalRooms.camp=new p("As you approach the smoke you find a campsite. Although there is remnants of a fresh fire, there are no other signs of recent inhabitants. There are three tents with various supplies inside, including food, some empty crates, a canteen and a sleeping bag. \n To the north you see more rolling hills. To the east you see a vast prairie.",{n:"lion",e:"stream"},{p:{carrots:{title:"carrots",state:"uncleared",uncleared:"You see some food.",desc:"Much of the food seems to have gone bad sitting out in the warm for who knows how long, but you are able to find some carrots which still seem to have some snap.",item:"carrots"},crate:{title:"crate",state:"uncleared",uncleared:"You find some empty wooden crates.",desc:"You take one of the crates. It's bulky and cumbersome, but it's yours.",item:"crate"},canteen:{title:"canteen",state:"uncleared",uncleared:"You notice a canteen.",desc:"As you pick up the canteen, you find it to have a bit of liquid still at the bottom.",item:"canteen"},"sleeping bag":{title:"sleeping bag",state:"uncleared",uncleared:"There is a sleeping bag on the floor in the corner.",desc:"You pick up the sleeping bag carefully.",item:"sleeping bag"}}}),w.originalRooms.stream=new p("As you walk along the prairie, you come to a stream. It seems like someone once fished here, though now the area is overgrown.",{n:"redFoyer",w:"camp"},{p:{title:"fishing line",state:"uncleared",uncleared:"You do manage to find several feet of fishing line in the brushes.",desc:"You pick up the fishing line.",item:"fishing line"},i:{state:"uncleared",evt:function(e){return e.showItemInput()}},"fishing pole":{evt:function(e){4===e.getItem("fishing pole").items.length?(this.events.i.state="cleared",e.addHistory("You throw your line into the water and after considerable time you pull in a fish."),e.addItem(f.fish)):e.addHistory("The fish don't seem interested.")}}})},k=(o(125),o(57)),b=o(36);o(127);var I=Object(k.a)({})(function(e){e.classes;var t=[];return e.items.forEach(function(e){e.required?t.push(a.a.createElement(b.a,{variant:"body1",component:"p",key:e.name},e.name,": ",e.items.length," of ",e.required.length)):t.push(a.a.createElement(b.a,{variant:"body1",component:"p",key:e.name},e.name))}),a.a.createElement("div",null,a.a.createElement(b.a,{variant:"h3",component:"h2",className:"inventory-header"},"Inventory"),t)}),T=(o(175),o(99)),E=o(100);var Y=Object(k.a)({})(function(e){e.classes;var t=[];return e.room.history.forEach(function(e){t.push(a.a.createElement(b.a,{variant:"h6",component:"p",className:"history-row",key:e.moveCount},e.desc))}),a.a.createElement(T.a,{className:"card-container"},a.a.createElement(E.a,{className:"history-content"},t))}),R=o(12);var S=Object(R.a)({})(function(e){return e.classes,a.a.createElement("div",{className:"instructions"},a.a.createElement(b.a,{variant:"h3",component:"h2",className:"header"},"Instructions:"),a.a.createElement(b.a,{variant:"body1",component:"p"},"N: move North"),a.a.createElement(b.a,{variant:"body1",component:"p"},"S: move South"),a.a.createElement(b.a,{variant:"body1",component:"p"},"E: move East"),a.a.createElement(b.a,{variant:"body1",component:"p"},"W: move West"),a.a.createElement(b.a,{variant:"body1",component:"p"},"P: Pickup an item from the current location"),a.a.createElement(b.a,{variant:"body1",component:"p"},"I: Interact with your surroundings using an item from your inventory"),a.a.createElement(b.a,{variant:"body1",component:"p"},"U: Use one item in your inventory with another"),a.a.createElement(b.a,{variant:"body1",component:"p"},"X: eXamine an item in your inventory"))}),H=o(63),C=o(39),x=function(e){function t(e){var o;return Object(r.a)(this,t),(o=Object(u.a)(this,Object(l.a)(t).call(this,e))).state=o.getNewState(),o.gameMap=new w,o.itemInputRef=a.a.createRef(),o.examineInputRef=a.a.createRef(),o.useInputRef=a.a.createRef(),o}return Object(c.a)(t,e),Object(h.a)(t,[{key:"getNewState",value:function(){return{moveCount:0,location:"",inventory:new d.b,roomHistory:new d.a,roomState:{},userItemInput:"",showItemInput:!1,userExamineInput:"",showExamineInput:!1,userPrimaryUseInput:"",showUseInput:!1,userSecondaryUseInput:"",newGameConfirm:!1}}},{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.handleKeydown.bind(this)),document.title="Maze of Honor";var e=localStorage.getItem("state");if(e){var t=JSON.parse(e);t.inventory=new d.b(t.inventory).map(function(e){return Object.setPrototypeOf(e,y.prototype)}),t.roomHistory=new d.a(t.roomHistory),t.roomHistory.map(function(e){return e.history=new d.a(e.history)}),this.gameMap.setAllRoomStates(t.roomState),this.setState(t)}else this.move("tricolorCenter");this.setState({newGameConfirm:!1})}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.handleKeydown.bind(this)),this.saveGameState()}},{key:"saveGameState",value:function(){var e=this;this.setState(function(t){t.roomState=e.gameMap.getAllRoomStates()});var t=Object.assign({},this.state);t.inventory=this.state.inventory.toJS(),t.roomHistory=this.state.roomHistory.toJS(),localStorage.setItem("state",JSON.stringify(t))}},{key:"handleKeydown",value:function(e){m.handleGameKeyDown(e,this),this.saveGameState()}},{key:"render",value:function(){var e,t=this,o=[];return this.state.roomHistory.forEach(function(e){o.push(a.a.createElement(Y,{room:e,key:e.moveCount}))}),e=this.state.newGameConfirm?a.a.createElement("div",null,a.a.createElement(H.a,{onClick:function(){return t.newGame(t.state.newGameConfirm)},variant:"outlined",color:"primary",className:"new-game-button"},"Confirm"),a.a.createElement(H.a,{onClick:function(){return t.cancelNewGame()},variant:"outlined",className:"new-game-button"},"Cancel")):a.a.createElement(H.a,{onClick:function(){return t.newGame(t.state.newGameConfirm)},variant:"outlined",className:"new-game-button"},"New Game"),a.a.createElement("div",{className:"container"},a.a.createElement("link",{rel:"stylesheet",href:"https://fonts.googleapis.com/css?family=Roboto:300,400,500"}),a.a.createElement("div",{className:"history"},this.state.showItemInput&&a.a.createElement("label",{className:"input-prompt"},a.a.createElement(b.a,{variant:"body1",component:"p",className:"inline-block"},"What item do you use?"),a.a.createElement(C.a,{type:"text",value:this.state.userItemInput,onChange:function(e){return t.handleItemInputChange(e)},onKeyDown:function(e){return t.handleItemInputEnter(e)},inputRef:this.itemInputRef,className:"margin_small"})),this.state.showExamineInput&&a.a.createElement("label",{className:"input-prompt"},a.a.createElement(b.a,{variant:"body1",component:"p",className:"inline-block"},"What do you examine?"),a.a.createElement(C.a,{type:"text",value:this.state.userExamineInput,onChange:function(e){return t.handleExamineInputChange(e)},onKeyDown:function(e){return t.handleExamineInputEnter(e)},inputRef:this.examineInputRef,className:"margin_small"})),this.state.showUseInput&&a.a.createElement("label",{className:"input-prompt"},a.a.createElement(b.a,{variant:"body1",component:"p",className:"inline-block"},"What do you use?"),a.a.createElement(C.a,{type:"text",value:this.state.userPrimaryUseInput,onChange:function(e){return t.handlePrimaryUseInputChange(e)},onKeyDown:function(e){return t.handleUseInputEnter(e)},inputRef:this.useInputRef,className:"margin_small"}),a.a.createElement(b.a,{variant:"body1",component:"p",className:"inline-block"},"with"),a.a.createElement(C.a,{type:"text",value:this.state.userSecondaryUseInput,onChange:function(e){return t.handleSecondaryUseInputChange(e)},onKeyDown:function(e){return t.handleUseInputEnter(e)},className:"margin_small"})),o),a.a.createElement("div",{className:"sidebar-container"},a.a.createElement("div",{className:"sidebar-aligner"},e,a.a.createElement(I,{items:this.state.inventory}),a.a.createElement(S,null))))}},{key:"newGame",value:function(e){e?(localStorage.setItem("state",""),this.setState(this.getNewState()),this.gameMap.resetRooms(),this.move("tricolorCenter")):this.setState({newGameConfirm:!0})}},{key:"cancelNewGame",value:function(){this.setState({newGameConfirm:!1})}},{key:"escape",value:function(){this.setState({showExamineInput:!1,showUseInput:!1,showItemInput:!1})}},{key:"showExamineInput",value:function(){this.setState({showExamineInput:!0}),this.examineInputRef.current.focus()}},{key:"handleExamineInputChange",value:function(e){this.setState({userExamineInput:e.target.value})}},{key:"handleExamineInputEnter",value:function(e){"Enter"===e.key&&this.submitItemToExamine()}},{key:"submitItemToExamine",value:function(){var e=this.state.userExamineInput.trim().toLowerCase();this.setState({userExamineInput:""}),this.state.inventory.get(e)?this.addHistory(this.state.inventory.get(e).desc()):e&&this.addHistory("You don't have one of those."),this.setState({showExamineInput:!1})}},{key:"showUseInput",value:function(){this.setState({showUseInput:!0}),this.useInputRef.current.focus()}},{key:"handlePrimaryUseInputChange",value:function(e){this.setState({userPrimaryUseInput:e.target.value})}},{key:"handleSecondaryUseInputChange",value:function(e){this.setState({userSecondaryUseInput:e.target.value})}},{key:"handleUseInputEnter",value:function(e){"Enter"===e.key&&this.submitItemToUse()}},{key:"submitItemToUse",value:function(){var e=this.state.userPrimaryUseInput.trim().toLowerCase(),t=this.state.userSecondaryUseInput.trim().toLowerCase();this.setState({userPrimaryUseInput:""}),this.setState({userSecondaryUseInput:""}),this.state.inventory.get(e)?this.state.inventory.get(t)?e!==t?this.useItems(f[e],f[t]):this.addHistory("You only have one of those."):t&&this.addHistory("You don't have "+t):e&&this.addHistory("You don't have "+e),this.setState({showUseInput:!1})}},{key:"useItems",value:function(e,t){if(!e.use){var o=e;e=t,t=o}if(e.use){var n=e.name.toLowerCase(),a=t.name.toLowerCase();if(e.use===t.use)if(this.state.inventory.has(e.use))this.addHistory("Try using each of those with the "+e.use);else{var s=f[e.use];this.addItem(s),this.addComponentToItem(n,s),this.addComponentToItem(a,s),this.removeItem(n),this.removeItem(a)}else if(e.use===a){var i=this.state.inventory.get(a);this.addComponentToItem(n,i),this.removeItem(n)}}}},{key:"showItemInput",value:function(){this.setState({showItemInput:!0}),this.itemInputRef.current.focus()}},{key:"isInputOpen",value:function(){return this.state.showItemInput||this.state.showExamineInput||this.state.showUseInput}},{key:"getItem",value:function(e){return this.state.inventory.get(e)}},{key:"handleItemInputChange",value:function(e){this.setState({userItemInput:e.target.value})}},{key:"handleItemInputEnter",value:function(e){"Enter"===e.key&&this.submitItemForInteract(e)}},{key:"submitItemForInteract",value:function(){var e=this.state.userItemInput.trim().toLowerCase();if(this.setState({userItemInput:""}),this.state.inventory.get(e)){var t=this.getLocation().events[e];t?t.evt.call(this.getLocation(),this):this.addHistory("That's no use here.")}else e&&this.addHistory("You don't have one of those.");this.setState({showItemInput:!1})}},{key:"removeItem",value:function(e){this.setState(function(t){return t.inventory=t.inventory.remove(e),t})}},{key:"addItem",value:function(e){this.setState(function(t){return t.inventory=t.inventory.set(e.name.toLowerCase(),e),t})}},{key:"addComponentToItem",value:function(e,t){this.setState(function(o){var n=o.inventory;return t.items.push(e),n.set(t.name,t),o.inventory=n,o})}},{key:"moveNorth",value:function(){var e=this.getLocation().exits.n;this.move(e)}},{key:"moveSouth",value:function(){var e=this.getLocation().exits.s;this.move(e)}},{key:"moveEast",value:function(){var e=this.getLocation().exits.e;this.move(e)}},{key:"moveWest",value:function(){var e=this.getLocation().exits.w;this.move(e)}},{key:"pickup",value:function(){var e=this.getLocation().events;if(e&&e.p){var t=e.p;if("uncleared"===t.state)this.pickupItem(t);else if(t.state)this.addHistory("You don't find anything.");else{var o=g.filter(Object.keys(t),function(e){return"uncleared"===t[e].state}),n=g.head(o);n?this.pickupItem(this.getLocation().events.p[n]):this.addHistory("You don't find anything.")}}else this.addHistory("You don't find anything.")}},{key:"pickupItem",value:function(e){e.state="cleared",this.addHistory(e.desc);var t=f[e.item];this.addItem(t)}},{key:"interact",value:function(){var e=this.getLocation().events;e&&e.i&&"uncleared"===e.i.state?e.i.evt(this):this.addHistory("There is nothing to do here.")}},{key:"examine",value:function(){this.state.inventory.size?this.showExamineInput():this.addHistory("You don't have anything to examine.")}},{key:"use",value:function(){this.state.inventory.size?this.showUseInput():this.addHistory("You don't have anything to use.")}},{key:"addRoomHistory",value:function(e){var t=this;this.setState(function(o){return o.moveCount=o.moveCount+1,o.roomHistory=o.roomHistory.insert(0,t.getRoomHistoryEntry(e,o.moveCount)),o})}},{key:"addHistory",value:function(e){var t=this;e&&this.setState(function(o){var n=t.getHistoryEntry(e,o.moveCount),a=o.roomHistory.get(0);console.log(a);var s=Object.assign({},a,{history:a.history.insert(0,n)});return o.moveCount=o.moveCount+1,o.roomHistory=o.roomHistory.set(0,s),o})}},{key:"getRoomHistoryEntry",value:function(e,t){return{moveCount:t,history:e?new d.a([this.getHistoryEntry(e,t)]):new d.a}}},{key:"getHistoryEntry",value:function(e,t){return{desc:e,moveCount:t}}},{key:"move",value:function(e){e?"locked"===e.state?this.addHistory("The door is locked."):(e=e.name||e,this.addRoomHistory(),this.addHistory(this.gameMap.getRoomDesc(e)),this.setState({location:e})):this.addHistory("You can't go that way.")}},{key:"getLocation",value:function(){return this.gameMap.getRoom(this.state.location)}}]),t}(a.a.Component),N=o(105),j=o.n(N),O=function(e){function t(){return Object(r.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(j.a,null),a.a.createElement(x,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[115,2,1]]]);
//# sourceMappingURL=main.62b41869.chunk.js.map