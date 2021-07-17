
import { Pokemon } from "./pokemon_class.js";

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
        var pokcurrentHP = pok.hp;
        console.log("attack is ", pokemon[7]);

        var pok2 = new Pokemon(pokemon_name, type1, type2,totalstat, hp, attack, defense, spattack, spdefense, speed, 5);
        console.log("defense is ", pokemon[8]);
        $("#mybutton").click(function(){
            console.log(pokcurrentHP -= pok.calcDamage(pok2, "special"));
        });
    });
});
