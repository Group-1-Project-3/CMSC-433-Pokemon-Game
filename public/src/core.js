import { MapParser, TileEffect } from "./map.js";
import { Player } from "./player.js";
import { TextureManager, Canvas } from "./graphics.js";
import { Camera } from "./camera.js";
import { CollisionHandler } from "./collision.js";
import { Events } from "./input.js";
import { BattleScene } from "../scenes/battle_scene.js";
import { SceneManager } from "../scenes/scene_manager.js";

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
    Init: function (){
        /* Initialize all game classes */
        Canvas.Init();
        Events.Init();
        TextureManager.Init();
        if (SceneManager.getScene() == "walking"){
            this.Map = MapParser.Load(MAP);
            this.Player = new Player("trainer_red", "idle", 300, 150, 10, 10);
            this.TileEffect = new TileEffect("grass", 7, "grass", this.Map, this.Player, 20);
            Camera.Init(this.Map);
            CollisionHandler.Init(this.Map);
        }
    },

    Load: function (){

        // WHEN CODING wild pokemon encounter, CHANGE THIS!!
        if (Events.KEY == "RIGHT"){
            var random = Math.floor(Math.random() * 1000);
            if (random < 10){
                console.log("Changing scene");
                SceneManager.currScene = "battle";
            }
        }

        if (BattleScene.action == "run" && Events.KEY == "YES"){
            SceneManager.currScene = "walking";
            SceneManager.toggleSceneLoaded(); // turns sceneLoaded to 0
        }


        if (SceneManager.getScene() == "talking"){
            // console.log("talking");
            // adds dialogue functionality here
        }
        else if (SceneManager.getScene() == "battle" && !SceneManager.checkSceneLoaded()){
            BattleScene.Init();
            SceneManager.toggleSceneLoaded(); // turns sceneLoaded to 1
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
