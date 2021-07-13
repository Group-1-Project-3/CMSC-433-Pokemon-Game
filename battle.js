import { BattleLogic } from "./battle_class.js";

const attack_options = ["physical", "special"];

function getRand(){
    return Math.floor(Math.random() * 2) + 1;
}

function initBattle(user, comp){
    let dead = [];
    let attackedHP = 0;
    let in_progress = true;

    if (comp.constructor.name == "Pokemon")
        let pl2 = new Player("wild", [comp]);
    else
        let pl2 = comp;

    let battle_logic = new BattleLogic(user, pl2);

    // start battle graphics

    while (in_progress){
        // get attack choice from user
        let choice = 1; // use keypress event to get choice

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

