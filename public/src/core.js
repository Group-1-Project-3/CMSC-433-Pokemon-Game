import { MapParser } from "./map.js";
import { Player } from "./player.js";
import { TextureManager, Canvas } from "./graphics.js";
import { Camera } from "./camera.js";
import { CollisionHandler } from "./collision.js";
import { Events } from "./input.js";
import { BattleScene } from "../scenes/battle_scene.js";

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
    Map: MapParser.Load(MAP),
    // Player: new Player(200, 200, 5, 5),
    Init: function (){
        Canvas.Init();
        Events.Init();
        TextureManager.Init();
        BattleScene.Init();
        // Camera.Init(this.Map);
        // CollisionHandler.Init(this.Map);
    },
    Update: function () {
        BattleScene.Animations();
        // this.Player.Update(Clock.DeltaTime);
        // Camera.Update(Clock.DeltaTime);
    },
    Render: function () {

        // BattleScene.Render();
        // this.Map.Render();
        // this.Player.Render();
    },
    Clear: function () {
        Canvas.Context.clearRect(0, 0, Canvas.CanWidth, Canvas.CanHeight);
    }
};

export { Game, Clock };
