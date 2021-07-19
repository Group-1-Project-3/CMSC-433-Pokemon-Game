import { MapParser, TileEffect } from "./map.js";
import { Player } from "./player.js";
import { TextureManager, Canvas } from "./graphics.js";
import { Camera } from "./camera.js";
import { CollisionHandler } from "./collision.js";
import { Events } from "./input.js";
import { BattleScene } from "../scenes/battle_scene.js";
import { swapAnimation} from "../scenes/swap.js";
import { Pokemon } from "./pokemon.js";
var pokeChosen; //Pokemon chosen by the user
var pokeparty = []; //"Pokemon Holder" Array that will hold all the pokemon
var user;
const Clock = {
    DeltaTime: 0,
    _prevTime: 0,
    _millisecondsPerSecond: 1000,
    _targetFrameRate: 60,
    Tick: function () {
        this.DeltaTime =  ( ( Date.now() - this._prevTime ) / this._millisecondsPerSecond ) * this._targetFrameRate;
        this._prevTime = Date.now();
    },
};
function populatPokeDec() {
    //var selected = document.querySelector('input[type=keyboard][name=pokemon]:checked');
        
		//$.get(`get_pokemon_data.php?pokemon_name=PIKACHU`, function (data) {
			
            //var pokemon = jQuery.parseJSON("PIKACHU");
			var pokemon_id = "PIKACHU";
			var pokemon_name = "PIKACHU";
			var type1 = 0;
			var type2 = 0;
			var totalstat = 5;
			var hp = 500;
			var attack = 80;
			var defense = 80;
			var spattack = 1;
			var spdefense = 1;
			var speed = 2;

			//TEST
			console.log(pokemon_name);

			//Set pokeChosen to new pokemon object of user's choice	
			pokeChosen = new Pokemon(pokemon_name, type1, type2, totalstat, hp, attack, defense, spattack, spdefense, speed, 1);

			//Add the pokemon chosen into the array
            for(let i=0;i<6;i++){
			    pokeparty.push(pokeChosen);
            }
            
			//user = new Player(pokeparty);

			//TEST
			//console.log(user.pokeparty);
		//});
	
}
const Game = {
    Map: {},
    Player: {},
    TileEffect: {},
    Init: function (){
        /* Initialize all game classes */
        //this.Map = MapParser.Load(MAP);
        //this.Player = new Player("trainer_brendan", "idle", 96, 64, 10, 10);
        //this.TileEffect = new TileEffect("grass", 7, "grass", this.Map, this.Player, 20);

        Canvas.Init();
        Events.Init();
        console.log(Events.KEY);
        TextureManager.Init();
        
        
        //.Init(this.Map);
        //CollisionHandler.Init(this.Map);
    },
    Update: function () {
        populatPokeDec();
        swapAnimation._pokeParty=pokeparty;
        swapAnimation.init();
        //this.Player.Update(Clock.DeltaTime);
        //this.TileEffect.Update(Clock.DeltaTime);
        //Camera.Update(Clock.DeltaTime);
    },
    Render: function () {
        //this.Map.Render();
        //this.Player.Render();
        //this.TileEffect.Render();
    },
    Clear: function () {
        //Canvas.Context.clearRect(0, 0, Canvas.CanWidth, Canvas.CanHeight);
    }
};

export { Game, Clock };
