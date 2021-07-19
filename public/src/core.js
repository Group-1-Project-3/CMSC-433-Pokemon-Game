import { MapParser, TileEffect } from "./map.js";
import { Player } from "./player.js";
import { TextureManager, Canvas } from "./graphics.js";
import { Camera } from "./camera.js";
import { CollisionHandler } from "./collision.js";
import { Events } from "./input.js";
import { BattleScene } from "../scenes/battle_scene.js";
import { SceneManager } from "../scenes/scene_manager.js";
import { Pokemon, Party, getPokemonObject, generateRandomPokemon } from "./pokemon.js";
import { NPC } from "./npc.js";
import { POKEMONS } from "../assets/pokemon_data.js";
import { swapAnimation } from "../scenes/swap.js";

const TILEPIXELS = 32;
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



const Game = {
    Map: {},
    Player: {},
    TileEffect: {},
    foe: {},


    Init: function (){
        Canvas.Init();
        Events.Init();
        TextureManager.Init();

        /* Initialize all game classes */
        this.Map = MapParser.Load(MAP);
        this.Player = new Player("trainer_red", "idle", 21 * TILEPIXELS, 47 * TILEPIXELS, 8, 8, 10, 10, true);
        this.TileEffect = new TileEffect("grass", 7, "grass", this.Map, this.Player, 20);



        Camera.Init(this.Map);
        CollisionHandler.Init(this.Map);


        // charizard for debugging MAKE SURE TO CHANGE THIS TO STARTER POKEMON
        var starterPokemon = getPokemonObject("Charmander");
        var secondPokemon = getPokemonObject("Bulbasaur");


        this.Player.playerParty = new Party(starterPokemon, new Array(starterPokemon));
        this.Player.playerParty.pokemonArray[1] = secondPokemon;
    },

    Load: function () {


        // WHEN CODING wild pokemon encounter, CHANGE THIS!!
        if (Events.KEY == "RIGHT") {
            var random = Math.floor(Math.random() * 1000);
            if (random < 25) {
                var pokemonObject = generateRandomPokemon();
                this.foe = {};
                this.foe = new NPC(pokemonObject, new Array(pokemonObject));
                SceneManager.currScene = "battle";
                SceneManager.currScene_index = 2;
            }
        }



        if (SceneManager.getScene() == "talking") {
            // console.log("talking");
            // adds dialogue functionality here
        }
        else if (SceneManager.getScene() == "battle" && !SceneManager.checkBattleSceneLoaded()) {
            BattleScene.Init(this.Player.playerParty.chosenPokemon, this.foe.Party.chosenPokemon);
            SceneManager.toggleBattleSceneLoaded(); // turns sceneLoaded to 1
        }

        else if (SceneManager.getScene() == "swapping"){
            this.Player.playerParty.pokemonArray = swapAnimation.init(this.Player.playerParty.pokemonArray);
            this.Player.playerParty.swapPokemon();

        }


    },
    Update: function () {
        if (SceneManager.getScene() == "walking"){

            this.Player.Update(Clock.DeltaTime);
            this.TileEffect.Update(Clock.DeltaTime);
            Camera.Update(Clock.DeltaTime);
        }
        else if (SceneManager.getScene() == "talking"){
            console.log("talking");
            // adds dialogue functionality here
        }

        else if (SceneManager.getScene() == "battle"){
            BattleScene.Animations();
        }
    },
    Render: function () {
        if (SceneManager.getScene() == "walking"){

            this.Map.Render();
            this.Player.Render();
            this.TileEffect.Render();

        }
    },
    Clear: function () {
        Canvas.Context.clearRect(0, 0, Canvas.CanWidth, Canvas.CanHeight);
    }
};


export { Game, Clock };
