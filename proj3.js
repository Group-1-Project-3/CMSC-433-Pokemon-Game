import { Pokemon } from "./pokemon_class.js";

var pokeChosen; //Pokemon chosen by the user
var pokeparty = []; //"Pokemon Holder" Array that will hold all the pokemon
var user;

//Get selected Pokemon
$(document).ready(function () {
	document.getElementById('submit').onclick = function () {
		var selected = document.querySelector('input[type=radio][name=pokemon]:checked');

		$.get(`get_pokemon_data.php?pokemon_name=${selected.value}`, function (data) {
			var pokemon = jQuery.parseJSON(data);
			var pokemon_id = pokemon[1];
			var pokemon_name = pokemon[2];
			var type1 = pokemon[3];
			var type2 = pokemon[4];
			var totalstat = pokemon[5];
			var hp = pokemon[6];
			var attack = pokemon[7];
			var defense = pokemon[8];
			var spattack = pokemon[9];
			var spdefense = pokemon[10];
			var speed = pokemon[11];

			//TEST
			console.log(selected.value);

			//Set pokeChosen to new pokemon object of user's choice	
			pokeChosen = new Pokemon(pokemon_name, type1, type2, totalstat, hp, attack, defense, spattack, spdefense, speed, 1);

			//Add the pokemon chosen into the array
			pokeparty.push(pokeChosen);

			user = new Player(pokeparty);
		});
	}
});


// *****Classes and Objects*****


//Player Object/Class
class Player {

	//Create player obj with their starter pokemon
	constructor(pokeparty) {
		this.pokeparty = pokeparty;
	}

	//Add pokemon to player's team
	addPokemon(newPokemon) {
		this.pokeparty.push(newPokemon);
	}

	//Get Pokemon Info
	getPokeInfo(pokeName, pokeparty) {
		let i = 0;
		let len = pokeparty.length;

		//Check that array isn't empty
		if (len > 0) {
			for (i; i < len; i++) {
				if (pokeparty[i].pokemon_name == pokeName) {
					//Ouput Pokemon Info

					//TEST (DELETE LATER)
					console.log(pokeparty[i].pokemon_name);
					console.log("Attack " + pokeparty[i].spattack);
				}
			}
		}
		else if (len == 0) {
			//Output that there is no Pokemon

			//TEST (DEL LATER)
			console.log("There is no pokemon currently in the array.");
		}
	}
}

/* Classes & Objects */
const Canvas = {
	Context: {},
	CanWidth: 0,
	CanHeight: 0,
	_canvas: {},
	Init: function () {
		this._canvas = document.getElementById('canvas');
		this.Context = this._canvas.getContext('2d');
		this.CanWidth = this._canvas.width;
		this.CanHeight = this._canvas.height;
	}
};

const TextureManager = {
	TextureMap: TEXTURES,
	Init: function () {
		const keys = Object.keys(this.TextureMap);
		let imagePath = "";
		keys.forEach((key) => {
			imagePath = this.TextureMap[key].path;
			this.TextureMap[key].image = this.createImage(imagePath);
		});
	},
	createImage: function (src) {
		const image = new Image();
		image.src = src;
		return image;
	},
	DrawFrame: function (textureId, currFrame, x, y) {
		const SCALE = 2.34375;
		const texture = this.TextureMap[textureId];
		Canvas.Context.drawImage(
			texture.image,
			currFrame.row * texture.frameWidth,
			currFrame.col * texture.frameHeight,
			texture.frameWidth,
			texture.frameHeight,
			x,
			y,
			texture.frameWidth * SCALE,
			texture.frameHeight * SCALE
		);
	}
};

const Clock = {
	DeltaTime: 0,
	_prevTime: 0,
	_millisecondsPerSecond: 1000,
	_targetFrameRate: 60,
	Tick: function () {
		this.DeltaTime = ((Date.now() - this._prevTime) / this._millisecondsPerSecond) * this._targetFrameRate;
		this._prevTime = Date.now();
	},
};

//Starter Scene Choosing pokemon
const StarterScene = {
	Init: function () {
		let starterBackground = new Image();
		starterBackground.src = "assets/Pokemon Essentials v19.1 2021-05-22/Graphics/Pictures/helpadventurebg.png"
		Canvas.Context.drawImage(starterBackground, 0, 0, 1200, 700);
		pokeStarterAnimationOverlay();
	},
};

//Animation overlay for bobbing pokemon
function pokeStarterAnimationOverlay() {
	var frame = {
		row: 0,
		col: 0
	};

	
}

const Game = {
	Init: function () {
		Canvas.Init();
		TextureManager.Init();
		StarterScene.Init();
	},
	Update: function () {
		// Player.Update();
	},
	Render: function () {
		// Player.Render();

	},
	Clear: function () {
		// Canvas.Context.clearRect(0, 0, Canvas.CanWidth, Canvas.CanHeight);
	}
};

function drawBackground(textureId) {
	var frame = {
		row: 0,
		col: 0
	};

	TextureManager.DrawFrame(textureId, frame, 0, 0);

}

// function draw_menu_overlay(){
//     var frame = {
//         row : 0,
//         col : 0
//     };
//     TextureManager.DrawFrame();
// }

function slideInAnimation() {
	var frame = {
		row: 0,
		col: 0
	};
	TextureManager.DrawFrame('base0', frame, -300, 325);
	TextureManager.DrawFrame('base1', frame, 600, 100);
}

// to do list: make a script to grab path of image of pokemon (front and back)
// function drawPokemons(){
//     var frame = {
//         row : 0,
//         col : 0
//     };
//
// }

function Animation(textureId) {
	this.delay;
	this.frame = {};
	this.frameIndex;
	this.frameSet;
	this.count;
	this.id = textureId;
	this.action;

	Animation.prototype.SetProps = function (action, delay) {
		if (this.action !== action) {
			this.action = action;
			this.delay = delay;
			this.frame = {};
			this.frameIndex = 0;
			this.frameSet = TextureManager.TextureMap[this.id].frameSets[action];
			this.count = 0;
		}
	}

	Animation.prototype.Update = function () {
		this.count++;
		if (this.count >= this.delay) {
			// update the animation to the next frame in the frame set
			this.frameIndex = (this.frameIndex >= this.frameSet.length - 1) ? 0 : this.frameIndex + 1;
			// reset the count
			this.count = 0;
		}

		const frameArray = this.frameSet[this.frameIndex];
		this.frame.row = frameArray[1];
		this.frame.col = frameArray[0];
	}

	Animation.prototype.Render = function (x, y) {
		TextureManager.DrawFrame(this.id, this.frame, x, y);
	}
}


function main() {

	/* Game loop */
	Game.Clear();
	Game.Update();
	Game.Render();
	Clock.Tick();

	requestAnimationFrame(main);
}

/* Prepare game by init events and defaults */
Game.Init();
/* Performs at 60fps on most monitorss */
requestAnimationFrame(main);

