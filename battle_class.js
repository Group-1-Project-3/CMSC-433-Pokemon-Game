

class BattleLogic {

    constructor (user, comp){
        this.user = user;
        this.comp = comp;
        this.user_pok = user.pokparty;
        this.comp_pok = comp.pokparty;
    }

    // returns updated hp for the attacked pokemon
    attack(offence_pl, attack_type){

        if (offence_pl == "user")
            target_pok = this.comp_pok[0];
        else if (offence_pl == "comp")
            target_pok = this.user_pok[0];

        let damage = attack_pok.calcDamage(target_pok, attack_type);
        let newHP = target_pok.hp - damage;
        if (newHp < 0)
            newHp = 0;
        target_pok.hp = newHP;

        if (offence_pl == "user")
            this.comp_pok[0] = target_pok;
        else if (offence_pl == "comp")
            this.user_pok[0] = target_pok;

        return newHP;
    }

    // moves pokemon to end of array if out of hp, returns which if any players are out of pokemon
    swap(){
        if (this.user_pok[0].hp == 0){
            let tmp = this.user_pok.shift();
            this.user_pok.push(tmp);
        }

        if (this.comp_pok[0].hp == 0){
            let tmp = this.comp_pok.shift();
            this.comp_pok.push(tmp);
        }

        let dead = [];
        if (this.user_pok[0].hp == 0)
            dead.push("user");
        if (this.comp_pok[0].hp == 0)
            dead.push("comp");
        
        return dead;
    }
}
export { BattleLogic };
