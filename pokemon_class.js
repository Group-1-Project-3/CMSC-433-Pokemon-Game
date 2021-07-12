class Pokemon {

    constructor(pokemon_name, type1, type2, totalstat, hp, attack, defense, spattack, spdefense, speed, level){
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

    calcRequiredXP(level){    // fast leveling
        return 4 * (level ** 3) / 5;
    }

    calcDamage(attack, targetPokemon){
        var random = Math.floor(Math.random() * (1.00 - 0.85)) + 0.85;
        // var type = TYPE_CHART[this.type1][TYPE_ORDER[targetPokemon.type1]];
        return ((((2 * this.level) / 5 + 2) * (attack / targetPokemon.defense)) / 50 + 2) * random;
    }

    catch(){
        var f = (this.hpmax * 255 * 4) / (this.hp * 12);
        var m = Math.floor(Math.random() * 255);
        if (f >= m){
            return true;
        }
        else{
            return false;
        }
    }
}
