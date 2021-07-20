/*
 * The below is our main game loop. Each iteration of the loop we update our sprites and animations
 * and then render them on the canvas element that we have cached from the html DOM in our html file.
 * The Clock object is used to make our updates frame rate independent so that our animations and sprite
 * movements will be kept the same speed across multiple different screen refresh rates. Most monitors have
 * refresh rates of 60fps so this will be our target.
 */

import { Game, Clock } from './src/core.js';
import { CollisionHandler } from "./src/collision.js";
import { MapParser } from './src/map.js';
import { Camera } from "./src/camera.js";
const SCALE = 2.34375;

function main() {

    /* Game loop */
    Game.Clear();
    Game.Load();
    Game.Update();
    Game.Render();
    Clock.Tick();

    requestAnimationFrame(main);
}

function start() {
    /* Prepare game by init events and defaults */
    Game.Init();
    /* Performs at 60fps on most monitorss */
    requestAnimationFrame(main);
}

function load() {
    let ctn = document.getElementById("canvas");
    let strtBtn = document.getElementById("strtBtn");
    let ctrlBtn = document.getElementById("ctrlBtn");
    let mapBtn = document.getElementById("mapBtn");
    let modalButtons = document.getElementById("maps");

    // start button event
    strtBtn.addEventListener("click", (e)=>{
        ctn.style.display = "block"; 
        strtBtn.style.display = "none";
        ctrlBtn.style.display = "inline-block";
        mapBtn.style.display = "inline-block";
        start();
    });
    // map button event
    modalButtons.addEventListener("click", (e)=>{
        if (e.target.id === "beachMap") {
            Game.Map = MapParser.Load(BEACH_MAP);
            CollisionHandler.Init(Game.Map);
            Camera.Init(Game.Map);
        }
        else if (e.target.id === "homeMap") {
            Game.Map = MapParser.Load(HOME_MAP);
            CollisionHandler.Init(Game.Map);
            Camera.Init(Game.Map);
        }
        else if (e.target.id === "gymMap") {
            Game.Map = MapParser.Load(GYM_MAP);
            CollisionHandler.Init(Game.Map);
            Camera.Init(Game.Map);
        }
    });
}

load();

export { SCALE, start };
