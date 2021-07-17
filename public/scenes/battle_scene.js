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
    fight_command_animation : new Animation("fight_command"),
    normal_attack_animation : new Animation("normal_attack_anim"),
    action : "fight",
    command_x : 600,
    command_y : 500,
    fight_command_x : 10,
    fight_command_y : 490,
    attacking_flag : false,
    normal_attack : false,


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
        drawHealthBoxes(this.initial_x_health0, this.initial_x_health1, 1, 1);


        if (this.baseSlidedIn && this.healthBoxSlidedIn && !this.attacking_flag){
            drawOptionsOverlay();
            this.command_animation.SetProps(this.action, 25);
            this.command_animation.Update();
            this.command_animation.Render(this.command_x, this.command_y);


        }
        if (this.attacking_flag){
            drawFightOverlay();
            this.fight_command_animation.SetProps(this.action, 25);
            this.fight_command_animation.Update();
            this.fight_command_animation.Render(this.fight_command_x, this.fight_command_y);
            drawText("Normal attack", 75, 560);
            drawText("Special attack", 515, 560);

        }
        if (this.normal_attack){
            this.normalAttack();
        }

        this.Selection();
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

            else if (this.action == "normal"){
                this.action = "special";
                this.fight_command_x = 450;
                this.fight_command_y = 490;
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
            else if (this.action == "special"){
                this.action = "normal";
                this.fight_command_x = 10;
                this.fight_command_y = 490;
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

        else if (Events.KEY === "YES"){

            if (this.action == "fight"){
                // calls fight function from battle.js
                this.action = "normal";
                this.attacking_flag = true;
            }
            else if (this.action == "catch"){
                // calls catch function
            }
            else if (this.action == "swap"){
                // calls swap function
            }
            else if (this.action == "run"){
                // calls run function
            }
            else if (this.normal_attack){
                this.normal_attack = false;
                this.attacking_flag = false;
                this.action = "fight";
            }

        }

        else if (Events.KEY === "NO"){
            if (this.attacking_flag && !this.normal_attack){
                this.attacking_flag = false;
                this.action = "fight";
                this.fight_command_x = 10;
                this.fight_command_y = 490;
            }

        }
        else if (Events.KEY === "SELECTED"){
            if (this.action == "normal"){
                this.normal_attack = true;
            }
        }

    },
    normalAttack : function () {
        TextureManager.DrawPicture('pokemon_front', this.initial_x_base1 + 100, 0, SCALE);
        TextureManager.DrawPicture('overlay_message', 0, 475, SCALE);
        drawText("You have used normal attack", 50, 575);
        this.normal_attack_animation.SetProps(this.action, 10);
        this.normal_attack_animation.Update();
        this.normal_attack_animation.Render(900, 100);
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

function drawOptionsOverlay(){
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

    TextureManager.DrawPicture('field_message_box', 0, 475, SCALE);
    TextureManager.DrawPicture('overlay_command', 0, 475, SCALE);
    drawText("What will you do?", 50, 575);

    TextureManager.DrawFrame('command', fight, 600, 500);
    TextureManager.DrawFrame('command', catchPokemon, 834, 500);
    TextureManager.DrawFrame('command', swap, 600, 600);
    TextureManager.DrawFrame('command', run, 834, 600);
}

function drawFightOverlay(){
    var normal = {
        row : 0,
        col : 8
    }
    var special = {
        row : 0,
        col : 0
    }
    TextureManager.DrawPicture('field_message_box', 0, 475, SCALE);
    TextureManager.DrawPicture('overlay_fight', 0, 475, SCALE);
    TextureManager.DrawFrame('fight_command', normal, 10, 490);
    TextureManager.DrawFrame('fight_command', special, 450, 490);


}

function drawText(text, x, y){
    Canvas.Context.font = '60px redfont';
    Canvas.Context.fillStyle = "#4a4a4f";
    Canvas.Context.fillText(text, x, y);

}

export { BattleScene };
