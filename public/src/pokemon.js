// import { TYPES, TYPE_ORDER, TYPE_CHART } from "./type-chart.js";
import { POKEMONS } from "../assets/pokemon_data.js";

class Party {
    constructor(chosenPokemon, pokemonArray) {
        this.chosenPokemon = chosenPokemon;
        this.pokemonArray = JSON.parse(JSON.stringify(pokemonArray)); // deeps copy pokemon array

    }

    swapPokemon() {
        return 1;
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
