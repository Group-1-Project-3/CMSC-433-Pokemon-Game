// import { TYPES, TYPE_ORDER, TYPE_CHART } from "./type-chart.js";
import { POKEMONS } from "../assets/pokemon_data.js";


class Party {
    constructor(chosenPokemon, pokemonArray) {
        this.chosenPokemon = chosenPokemon;
        this.pokemonArray = pokemonArray;
    }


}

class Pokemon {

    constructor(id, pokemon_name, type1, type2, totalstat, hp, attack, defense, spattack, spdefense, speed, level = 1) {
        this.id = id;
        this.pokemon_name = pokemon_name;
        this.type1 = type1;
        this.type2 = type2;
        this.totalstat = totalstat;
        this.hpmax = hp;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.spattack = spattack;
        this.spdefense = spdefense;
        this.speed = speed;
        this.xp = this.calcRequiredXP(level - 1);
        this.level = level;
    }

    copyPokemon(target){
        this.id = target.id;
        this.pokemon_name = target.pokemon_name;
        this.type1 = target.type1;
        this.type2 = target.type2;
        this.totalstat = target.totalstat;
        this.hpmax = target.hp;
        this.hp = target.hpmax;
        this.attack = target.attack;
        this.defense = target.defense;
        this.spattack = target.spattack;
        this.spdefense = target.spdefense;
        this.speed = target.speed;
        this.xp = target.xp
        this.level = target.level;
    }

    calcRequiredXP(level) {
        // fast leveling
        return 4 * (level ** 3) / 5;
    }

    calcDamage(targetPokemon, typeOfAttack) {
        if (typeOfAttack == "normal") {
            var random = Math.floor(Math.random() * (1.00 - 0.85)) + 0.85;
            // var type = TYPE_CHART[this.type1][TYPE_ORDER[targetPokemon.type1]];
            var type = 1;
            var critical = 1;
            return ((2 * this.level + 10) / 250 * (this.attack) / (targetPokemon.defense) * 100 + 2) * type * random * critical;
        } else if (typeOfAttack == "special") {
            var random = Math.floor(Math.random() * (1.00 - 0.85)) + 0.85;
            // var type = TYPE_CHART[this.type1][TYPE_ORDER[targetPokemon.type1]];
            var type = 1;
            var critical = 1;
            return parseInt(((2 * this.level + 10) / 250 * (this.attack) / (targetPokemon.defense) * 100 + 2) * type * random * critical);
        }
    }

    catchPokemon() {
        var f = (this.hpmax * 255 * 4) / (this.hp * 12);
        var m = Math.floor(Math.random() * 255);
        if (f >= m) {
            return true;
        } else {
            return false;
        }
    }
    calcRunChance(targetPokemon, attempt_n){
        var random = Math.floor(Math.random() * 128);
        var odd = (Math.floor(this.speed * 128 / targetPokemon.speed) + 30 * attempt_n) % 256;
        return (random < odd);
    }

}

function getPokemonObject(pokemon_name){

    var pokemon = POKEMONS[pokemon_name];
    var pokemonObject = new Pokemon(pokemon["pokemon_id"], pokemon["pokemon_name"], pokemon["type1"], pokemon["type2"], pokemon["totalstat"], pokemon["hp"], pokemon["attack"], pokemon["defense"], pokemon["spattack"], pokemon["spdefense"], pokemon["speed"]);
    return pokemonObject;
}

function generateRandomPokemon(){
    var keys = Object.keys(POKEMONS);
    var pokemon = POKEMONS[keys[Math.floor(Math.random() * keys.length)]];
    var pokemonObject = getPokemonObject(pokemon["pokemon_name"]);
    return pokemonObject;
}

export { Pokemon, Party, getPokemonObject, generateRandomPokemon };
