import { BattleLogic } from "./battle_class.js";
import { Player } from "./player_class.js";
import { Pokemon } from "./pokemon_class.js";

const attack_option = ["physical", "special"];


function getRand(){
    return Math.floor(Math.random() * 2);
}


function initBattle(user, comp){
    let dead = [];
    let in_progress = true;

    if (comp.constructor.name == "Pokemon")
        var pl2 = new Player("wild", [comp]);
    else
        var pl2 = comp;

    let battle_logic = new BattleLogic(user, pl2);

    // start battle graphics

    while (in_progress){
        
        let choice = getKey();

        battle_logic.attack("user", attack_option[choice]);
    
        // check if any pokemon are out of hp
        dead = battle_logic.swap();
        if (dead.length > 0){
            in_progress = false; // end battle
            break;
        }

        // opponent attacks 
        battle_logic.attack("comp", attack_option[getRand()]);

        // check if any pokemon are out of hp
        dead = battle_logic.swap();
        if (dead.length > 0){
            in_progress = false; // end battle
            break;
        }
    }

    comp = pl2;

    return {user, comp};
}


function getKey() {
    let KEY = 2;
    while (KEY != 0 && KEY != 1){
        KEY = prompt("0 -> physical, 1 -> special");
    }
    return KEY;
}

/*
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
        
        let result = initBattle(user, comp);
        console.log(result.user.pokeparty, result.comp.pokeparty);

        console.log("over");
    });
});
*/
