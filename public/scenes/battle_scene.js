import { Canvas, TextureManager, Animation } from "../src/graphics.js";
import { Events } from "../src/input.js";
import { SCALE } from "../proj3.js";

const BattleScene = {
    baseSlidedIn : 0,
    healthBoxSlidedIn: 0,
    healthFilled : 0,
    initial_x_base0 : 900,
    initial_x_base1 : -500,
    initial_x_health0 : 1600,
    initial_x_health1 : -1000,
    command_animation : new Animation("command"),
    action : "fight",
    command_x : 600,
    command_y : 500,

    Init: function(){

        drawInitBattle(this.initial_x_base0, this.initial_x_base1);


    },

    Animations: function(){
        if (!this.baseSlidedIn){
            this.initial_x_base0 -= 10;
            this.initial_x_base1 += 10;

            if (this.initial_x_base0 == -300)
                this.baseSlidedIn = 1;
        }
        else {
            if (!this.healthBoxSlidedIn){
                this.initial_x_health0 -= 10;
                this.initial_x_health1 += 10;

                if (this.initial_x_health1 == 0){
                    this.healthBoxSlidedIn = 1;
                }

            }

        }
        drawInitBattle(this.initial_x_base0, this.initial_x_base1);
        drawHealthBoxes(this.initial_x_health0, this.initial_x_health1, 0.8, 0.2);

        if (this.baseSlidedIn && this.healthBoxSlidedIn){
            drawFightOverlay();
            this.Selection();
        }
    },

    Selection: function(){
        if (Events.KEY === "RIGHT"){
            if (this.action == "fight"){
                this.action = "catch";
                this.command_x = 834;
                this.command_y = 500;
            }
            else if (this.action == "swap"){
                this.action = "run";
                this.command_x = 834;
                this.command_y = 600;
            }
        }
        else if (Events.KEY === "LEFT") {
            if (this.action == "catch"){
                this.action = "fight";
                this.command_x = 600;
                this.command_y = 500;
            }
            else if (this.action == "run"){
                this.action = "swap";
                this.command_x = 600;
                this.command_y = 600;
            }
        }
        else if (Events.KEY === "UP") {
            if (this.action == "swap"){
                this.action = "fight";
                this.command_x = 600;
                this.command_y = 500;
            }
            else if (this.action == "run"){
                this.action = "catch";
                this.command_x = 834;
                this.command_y = 500;
            }
        }
        else if (Events.KEY === "DOWN") {
            if (this.action == "fight"){
                this.action = "swap";
                this.command_x = 600;
                this.command_y = 600;
            }
            else if (this.action == "catch"){
                this.action = "run";
                this.command_x = 834;
                this.command_y = 600;
            }
        }
        this.command_animation.SetProps(this.action, 15);
        this.command_animation.Update();
        this.command_animation.Render(this.command_x, this.command_y);
    }
};

function drawInitBattle(initial_x_base0, initial_x_base1) {

    TextureManager.DrawPicture('battle_background', 0, 0, SCALE);
    TextureManager.DrawPicture('black_bar', 0, 475, SCALE);


    TextureManager.DrawPicture('base1', initial_x_base1, 100, SCALE);
    TextureManager.DrawPicture('pokemon_front', initial_x_base1 + 100, 0, SCALE);

    TextureManager.DrawPicture('base0', initial_x_base0, 325, SCALE);
    TextureManager.DrawPicture('pokemon_back', initial_x_base0 + 400, 100, SCALE);

}

function drawHealthBoxes(initial_x_health0, initial_x_health1, foeHealth, playerHealth){
    var playerFrame = {};
    var foeFrame = {};
    var green = {
        row : 0,
        col : 0
    }
    var orange = {
        row : 0,
        col : 1
    }

    var red = {
        row : 0,
        col : 2
    }

    if (playerHealth > 0.5) {
        playerFrame = green;
    }
    else if (playerHealth > 0.25 && playerHealth <= 0.5){
        playerFrame = orange;
    }
    else if (playerHealth > 0  && playerHealth <= 0.25){
        playerFrame = red;
    }

    if (foeHealth > 0.5) {
        foeFrame = green;
    }
    else if (foeHealth > 0.25 && foeHealth <= 0.5){
        foeFrame = orange;
    }
    else if (foeHealth > 0  && foeHealth <= 0.25){
        foeFrame = red;
    }

    TextureManager.DrawPicture('our_health_box', initial_x_health0, 300, SCALE);
    TextureManager.DrawPicture('foe_health_box', initial_x_health1, 50, SCALE);
    TextureManager.DrawBar('health_bar', playerFrame, initial_x_health0 + 319, 394, SCALE * playerHealth, SCALE);
    TextureManager.DrawBar('health_bar', foeFrame, initial_x_health1 + 277, 144, SCALE * foeHealth, SCALE);

}

function drawFightOverlay(){
    var fight = {
        row : 0,
        col : 0
    };

    var catchPokemon = {
        row : 0,
        col : 5
    };

    var swap = {
        row : 0,
        col : 1
    };

    var run = {
        row : 0,
        col : 3
    };

    TextureManager.DrawPicture('overlay_message_box', 0, 475, SCALE);
    TextureManager.DrawPicture('overlay_command', 0, 475, SCALE);
    Canvas.Context.font = '60px redfont';
    Canvas.Context.fillStyle = "#4a4a4f";
    Canvas.Context.fillText("What will you do?", 50, 575);

    TextureManager.DrawFrame('command', fight, 600, 500);
    TextureManager.DrawFrame('command', catchPokemon, 834, 500);
    TextureManager.DrawFrame('command', swap, 600, 600);
    TextureManager.DrawFrame('command', run, 834, 600);
}



export { BattleScene };
