import { Canvas, TextureManager, Animation } from "../src/graphics.js";
import { Events } from "../src/input.js";
import { SCALE } from "../proj3.js";
import { Pokemon, Party } from "../src/pokemon.js";
import { SceneManager } from "./scene_manager.js";

const BattleScene = {
    // is_base_animated : 0,
    // is_health_box_animated: 0,
    // is_health_filled : 0,
    // initial_x_playerBase : 900,
    // initial_x_foeBase : -500,
    // initial_x_playerHealth : 1600,
    // initial_x_foeHealth : -1000,
    // command_animation : new Animation("command"),
    // fight_command_animation : new Animation("fight_command"),
    // normal_attack_animation : new Animation("normal_attack_anim"),
    // special_attack_animation : new Animation("special_attack_anim"),
    // action : "fight",
    // command_x : 600,
    // command_y : 500,
    // fight_command_x : 10,
    // fight_command_y : 490,
    // attacking_flag : false,
    // normal_attack : false,
    // special_attack : false,
    // player_pokemon : "ODDISH",
    // foe_pokemon : "PIKACHU",


    Init: function(player_pokemon, foe_pokemon){
        this.initial_x_playerBase = 900;
        this.initial_x_foeBase = -500;
        this.initial_x_playerHealth = 1600;
        this.initial_x_foeHealth = -1000;
        this.command_x = 600;
        this.command_y = 500;
        this.fight_command_x = 10;
        this.fight_command_y = 490;

        this.is_base_animated = 0;
        this.is_health_box_animated = 0;
        this.is_health_filled = 0;

        this.command_animation = new Animation("command");
        this.fight_command_animation = new Animation("fight_command");
        this.normal_attack_animation = new Animation("normal_attack_anim");
        this.special_attack_animation = new Animation("special_attack_anim");

        this.action = "fight";

        this.attacking_flag = false;
        this.normal_attack = false;
        this.special_attack = false;

        this.player_pokemon = player_pokemon;
        this.foe_pokemon = foe_pokemon;

        drawInitBattle(this.initial_x_playerBase, this.initial_x_foeBase, this.player_pokemon, this.foe_pokemon);
    },

    Animations: function(){
        if (!this.is_base_animated){
            this.initial_x_playerBase -= 10;
            this.initial_x_foeBase += 10;

            if (this.initial_x_playerBase == -300)
                this.is_base_animated = 1;
        }
        else {
            if (!this.is_health_box_animated){
                this.initial_x_playerHealth -= 10;
                this.initial_x_foeHealth += 10;

                if (this.initial_x_foeHealth == 0){
                    this.is_health_box_animated = 1;
                }

            }

        }
        console.log(this.player_pokemon.hp);
        var playerPokemon_hp_percentage = this.player_pokemon.hp / this.player_pokemon.hpmax;
        var foePokemon_hp_percentage = this.foe_pokemon.hp / this.foe_pokemon.hpmax;
        if (playerPokemon_hp_percentage < 0){
            playerPokemon_hp_percentage = 0;
        }
        if (foePokemon_hp_percentage < 0){
            foePokemon_hp_percentage = 0;
        }

        drawInitBattle(this.initial_x_playerBase, this.initial_x_foeBase, this.player_pokemon, this.foe_pokemon);
        drawHealthBoxes(this.initial_x_playerHealth, this.initial_x_foeHealth, foePokemon_hp_percentage, playerPokemon_hp_percentage);


        if (this.is_base_animated && this.is_health_box_animated){
            drawStatPlayer(this.player_pokemon.pokemon_name, this.player_pokemon.level, this.player_pokemon.hp, this.player_pokemon.hpmax);
            drawStatFoe(this.foe_pokemon.pokemon_name, this.foe_pokemon.level);
        }

        if (this.is_base_animated && this.is_health_box_animated && !this.attacking_flag && (this.action != "normal" || this.action != "special")){
            drawOptionsOverlay();
            this.command_animation.SetProps(this.action, 20);
            this.command_animation.Update();
            this.command_animation.Render(this.command_x, this.command_y);


        }
        if (this.attacking_flag && (this.action == "normal" || this.action == "special")){
            drawFightOverlay();
            this.fight_command_animation.SetProps(this.action, 20);
            this.fight_command_animation.Update();
            this.fight_command_animation.Render(this.fight_command_x, this.fight_command_y);
            drawText(60, "Normal attack", 75, 560);
            drawText(60, "Special attack", 515, 560);

        }
        var aiAttack = randomizeAttack();
        console.log(aiAttack);
        if (this.normal_attack){
            this.normalAttack("foe");


            if (aiAttack == "normal"){
                this.action = "normal";
                this.normalAttack("player");
            }
            else if (aiAttack == "special"){
                this.action = "special";
                this.specialAttack("player");
            }

            this.normal_attack = false;

        }

        if (this.special_attack){

            this.specialAttack("foe");

            if (aiAttack == "normal"){
                this.action = "normal";
                this.normalAttack("player");
            }
            else if (aiAttack == "special"){
                this.action = "special";
                this.specialAttack("player");
            }


            this.special_attack = false;
        }

        if (this.player_pokemon.hp == 0){
            TextureManager.DrawPicture('overlay_message', 0, 475, SCALE);
            drawText(60, "Your pokemon has fainted", 50, 575);

        }

        else if (this.foe_pokemon.hp == 0){
            TextureManager.DrawPicture('overlay_message', 0, 475, SCALE);
            drawText(60, "The enemy has fainted", 50, 575);
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
                this.fight_command_x = 10;
                this.fight_command_y = 490;
            }
            else if (this.special_attack){
                this.special_attack = false;
                this.attacking_flag = false;
                this.action = "fight";
                this.fight_command_x = 10;
                this.fight_command_y = 490;
            }
            if (this.displayingNormalAttackText || this.displayingSpecialAttackingText){
                this.action = "fight";
                this.action = "normal";
            }

            if (this.player_pokemon.hp == 0 || this.foe_pokemon.hp == 0){
                SceneManager.toggleBattleSceneLoaded();
                SceneManager.nextScene();
            }



        }

        else if (Events.KEY === "NO"){
            if (this.attacking_flag && !this.normal_attack && !this.special_attack){
                this.attacking_flag = false;
                this.action = "fight";
                this.fight_command_x = 10;
                this.fight_command_y = 490;
            }

        }
        else if (Events.KEY === "SELECTED"){
            if (this.action == "normal"){
                this.normal_attack = true;
                this.fight_command_x = 10;
                this.fight_command_y = 490;

            }
            else if (this.action == "special"){
                this.special_attack = true;
                this.fight_command_x = 10;
                this.fight_command_y = 490;
            }
        }

    },
    normalAttack : function (target) {
        console.log(target);
        if (target == "foe"){
            TextureManager.DrawPicture(this.foe_pokemon.pokemon_name.toUpperCase(), this.initial_x_foeBase + 100, 0, 2);
            this.normal_attack_animation.SetProps(this.action, 5);
            this.normal_attack_animation.Update();
            this.normal_attack_animation.Render(900, 100);
            this.foe_pokemon.hp -= this.player_pokemon.calcDamage(this.foe_pokemon, "normal");
            if (this.foe_pokemon.hp < 0){
                this.foe_pokemon.hp = 0;
            }
        }
        else if (target == "player"){
            TextureManager.DrawPicture(this.player_pokemon.pokemon_name.toUpperCase(), this.initial_x_playerBase + 400, 200, 2);
            this.normal_attack_animation.SetProps(this.action, 5);
            this.normal_attack_animation.Update();
            this.normal_attack_animation.Render(250, 300);
            this.player_pokemon.hp -= this.foe_pokemon.calcDamage(this.player_pokemon, "normal");
            if (this.player_pokemon.hp < 0){
                this.player_pokemon.hp = 0;
            }
        }
        this.action = "fight";
        this.attacking_flag = false;

    },

    specialAttack : function (target) {
        if (target == "foe"){
            TextureManager.DrawPicture(this.foe_pokemon.pokemon_name.toUpperCase(), this.initial_x_foeBase + 100, 0, 2);
            this.special_attack_animation.SetProps(this.action, 5);
            this.special_attack_animation.Update();
            this.special_attack_animation.Render(900, 100);
            this.foe_pokemon.hp -= this.player_pokemon.calcDamage(this.foe_pokemon, "special");
            if (this.foe_pokemon.hp < 0){
                this.foe_pokemon.hp = 0;
            }
        }
        else if (target == "player"){
            TextureManager.DrawPicture(this.player_pokemon.pokemon_name.toUpperCase(), this.initial_x_playerBase + 400, 200, 2);
            this.special_attack_animation.SetProps(this.action, 5);
            this.special_attack_animation.Update();
            this.special_attack_animation.Render(250, 300);
            this.player_pokemon.hp -= this.foe_pokemon.calcDamage(this.player_pokemon, "special");
            if (this.player_pokemon.hp < 0){
                this.player_pokemon.hp = 0;
            }

        }

        this.action = "fight";
        this.attacking_flag = false;

    }

};

function randomizeAttack(){

    var options = ["normal", "special"];
    var random = Math.floor(Math.random() * 2);
    return options[random];
}

function drawInitBattle(initial_x_playerBase, initial_x_foeBase, playerPokemon, foePokemon) {
    var playerPokemonName = playerPokemon.pokemon_name.toUpperCase();
    var foePokemonName = foePokemon.pokemon_name.toUpperCase();
    TextureManager.addImageObject(`./assets/Pokemon Essentials v19.1 2021-05-22/Graphics/Pokemon/Back/${playerPokemonName}.png`, playerPokemonName);
    TextureManager.addImageObject(`./assets/Pokemon Essentials v19.1 2021-05-22/Graphics/Pokemon/Front/${foePokemonName}.png`, foePokemonName);

    TextureManager.DrawPicture('battle_background', 0, 0, SCALE);


    TextureManager.DrawPicture('base1', initial_x_foeBase, 100, SCALE);
    TextureManager.DrawPicture(foePokemonName, initial_x_foeBase + 100, 0, 2);



    TextureManager.DrawPicture('base0', initial_x_playerBase, 325, SCALE);
    TextureManager.DrawPicture(playerPokemonName, initial_x_playerBase + 400, 200, 2);

    TextureManager.DrawPicture('black_bar', 0, 475, SCALE);
}

function drawHealthBoxes(initial_x_playerHealth, initial_x_foeHealth, foeHealth, playerHealth){
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

    TextureManager.DrawPicture('our_health_box', initial_x_playerHealth, 300, SCALE);
    TextureManager.DrawPicture('foe_health_box', initial_x_foeHealth, 50, SCALE);
    TextureManager.DrawBar('health_bar', playerFrame, initial_x_playerHealth + 319, 394, SCALE * playerHealth, SCALE);
    TextureManager.DrawBar('health_bar', foeFrame, initial_x_foeHealth + 277, 144, SCALE * foeHealth, SCALE);

}

function drawOptionsOverlay(){
    var fight = {
        row : 0,
        col : 0
    };

    var catchPokemon = {
        row : 5,
        col : 0
    };

    var swap = {
        row : 1,
        col : 0
    };

    var run = {
        row : 3,
        col : 0
    };

    TextureManager.DrawPicture('field_message_box', 0, 475, SCALE);
    TextureManager.DrawPicture('overlay_command', 0, 475, SCALE);
    drawText(60, "What will you do?", 50, 575);

    TextureManager.DrawFrame('command', fight, 600, 500);
    TextureManager.DrawFrame('command', catchPokemon, 834, 500);
    TextureManager.DrawFrame('command', swap, 600, 600);
    TextureManager.DrawFrame('command', run, 834, 600);
}

function drawFightOverlay(){
    var normal = {
        row : 8,
        col : 0
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

function drawStatPlayer(name, level, currHealth, maxHealth){
    currHealth = parseInt(currHealth);
    if (currHealth < 0){
        currHealth = 0;
    }
    drawText(60, name, 715, 375);
    drawText(60, `Lv.${level}`, 1000, 375);
    drawText(50, `${currHealth}/${maxHealth}`, 930, 460);
}

function drawStatFoe(name, level){
    drawText(60, name, 50, 125);
    drawText(60, `Lv.${level}`, 325, 125);
}

function drawText(size, text, x, y){
    Canvas.Context.font = `${size}px redfont`;
    Canvas.Context.fillStyle = "#4a4a4f";
    Canvas.Context.fillText(text, x, y);

}

export { BattleScene };
