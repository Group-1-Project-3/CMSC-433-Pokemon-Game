/*
 * The below is our main game loop. Each iteration of the loop we update our sprites and animations
 * and then render them on the canvas element that we have cached from the html DOM in our html file.
 * The Clock object is used to make our updates frame rate independent so that our animations and sprite
 * movements will be kept the same speed across multiple different screen refresh rates. Most monitors have
 * refresh rates of 60fps so this will be our target.
 */

import { Game, Clock } from './src/core.js';
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

/* Prepare game by init events and defaults */
Game.Init();
requestAnimationFrame(main);
/* Performs at 60fps on most monitorss */



export { SCALE };
