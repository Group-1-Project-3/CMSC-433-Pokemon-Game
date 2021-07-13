import { BattleLogic } from "./battle_class.js";
import { Player } from "./player_class.js";
import { Pokemon } from "./pokemon_class.js";

console.log("in");

$(document).ready(function(){
    var pok = "";
    var pok2 = "";

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
        var pokcurrentHP = pok.hp;
        console.log("attack is ", pokemon[7]);

        var pok2 = new Pokemon(pokemon_name, type1, type2,totalstat, hp, attack, defense, spattack, spdefense, speed, 5);
        console.log("defense is ", pokemon[8]);
        $("#mybutton").click(function(p){
            console.log(pokcurrentHP -= pok.calcDamage(pok2, "special"));
        });
        
    });

    let user = new Player("user", [pok]);
    let comp = new Player("comp", [pok2]);
        
    initBattle(user, comp);

    console.log("over");
});

const attack_options = ["physical", "special"];

function getRand(){
    return Math.floor(Math.random() * 2) + 1;
}

function initBattle(user, comp){
    let dead = [];
    let attackedHP = 0;
    let in_progress = true;

    console.log(comp.constructor.name);
    if (comp.constructor.name == "Pokemon")
        var pl2 = new Player("wild", [comp]);
    else
        var pl2 = comp;

    let battle_logic = new BattleLogic(user, pl2);

    // start battle graphics

    while (in_progress){
        // get attack choice from user
        
        let choice = getKey(); // use keypress event to get choice

        attackedHP = battle_logic.attack("user", attack_option[choice]);
    
        // check if any pokemon are out of hp
        dead = battle_logic.swap();
        if (len(dead) > 0){
            in_progress = false; // end battle
            break;
        }

        // opponent attacks 
        battle_logic.attack("comp", attack_option[getRand()]);

        // check if any pokemon are out of hp
        dead = battle_logic.swap();
        if (len(dead) > 0){
            in_progress = false; // end battle
            break;
        }
    }

    return {user, comp};
}

async function getKey() {
    let KEY = "";
    while (KEY != 0 && KEY != 1){
        console.log("wait");
        await waitingKeypress();
        console.log("key pressed");
        $('input').on('keyup', function(e) {
            KEY = e.key;
            console.log(KEY);
        });
    }
    return KEY;
}

