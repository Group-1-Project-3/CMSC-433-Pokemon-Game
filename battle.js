import { BattleLogic } from "./battle_class.js";
import { Player } from "./player_class.js";
import { Pokemon } from "./pokemon_class.js";

const attack_option = ["physical", "special"];


function getRand(){
    return Math.floor(Math.random() * 2);
}

let wild = false;

/*
user: player obj
comp: player obj if trainer, else Pokemon obj (meant for wild pokemon)

returns user and comp as player objs
*/
function initBattle(user, comp){
    let dead = [];

    if (comp.constructor.name == "Pokemon"){
        var pl2 = new Player("wild", [comp]);
        wild = true;
    } else
        var pl2 = comp;

    let battle_logic = new BattleLogic(user, pl2);

    // start battle graphics

    while (true){
        
        let choice = getKey();

        // running away
        if (choice == 3){
            break
        }

        // deal with catch attempt if wild
        if (choice == 2){
            // graphics for catching go here
            let success = battle_logic.catchpok();
            if (success == true){
                break
            } else {
                console.log("failed to catch")
            }
        }

        battle_logic.attack("user", attack_option[choice]);
    
        // graphics of user attacking comp, stats already updated

        // check if any pokemon are out of hp
        dead = battle_logic.swap();
        if (dead.length > 0){
            // graphics for end of battle, winner can be found in dead
            break;
        }
        // can do swapping graphics here, pokeparty array already updated to have next alive pok in pos 0

        // opponent attacks 
        battle_logic.attack("comp", attack_option[getRand()]);

        // graphics of comp attacking user, stats already updated

        // check if any pokemon are out of hp
        dead = battle_logic.swap();
        if (dead.length > 0){
            // graphics for end of battle, winner can be found in dead
            break;
        }
        // can do swapping graphics here, pokeparty array already updated to have next alive pok in pos 0
    }

    comp = pl2;

    return {user, comp};
}

/*
uses prompt for user input
*/
function getKey() {
    let KEY = 4;
    if (wild == true){
        while (KEY != 0 && KEY != 1 && KEY != 2 && KEY != 3){
            KEY = prompt("0 -> physical, 1 -> special, 2 -> catch attempt, 3 -> run");
        }
    } else {
        while (KEY != 0 && KEY != 1){
            KEY = prompt("0 -> physical, 1 -> special");
        }
    }
    return KEY;
}

$(document).ready(function(){
    $.get("get_pokemon_data.php?pokemon_name=Charmander", function(data){
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

        var pok = new Pokemon(pokemon_name, type1, type2,totalstat, hp, attack, defense, spattack, spdefense, speed, 20);

        var pok2 = new Pokemon(pokemon_name, type1, type2,totalstat, hp, attack, defense, spattack, spdefense, speed, 5);

        var pok3 = new Pokemon(pokemon_name, type1, type2,totalstat, hp, attack, defense, spattack, spdefense, speed, 5);

        var pok4 = new Pokemon(pokemon_name, type1, type2,totalstat, hp, attack, defense, spattack, spdefense, speed, 5);

        let user = new Player("user", [pok, pok2]);
        let comp = new Player("comp", [pok3, pok4]);
        
        let result = initBattle(user, pok4);
        console.log(result.user.pokeparty, result.comp.pokeparty);

        console.log("over");
    });
});
