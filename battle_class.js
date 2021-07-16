class BattleLogic {

    constructor (user, comp){
        this.user = user;
        this.comp = comp;
        this.user_pok = user.pokeparty;
        this.comp_pok = comp.pokeparty;
    }

    // returns updated hp for the attacked pokemon
    attack(offence_pl, attack_type){
        let target_pok = this.user_pok[0];
        let attack_pok = this.comp_pok[0];

        if (offence_pl == "user"){
            target_pok = this.comp_pok[0];
            attack_pok = this.user_pok[0];
        } 

        let damage = attack_pok.calcDamage(target_pok, attack_type);
        let newHP = target_pok.hp - damage;
        if (newHP < 0)
            newHP = 0;
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

    catchpok() {
        let N = Math.floor(Math.random() * 255);
        if (N < 25){
            this.caught();
            return true;
        }
        let M = Math.floor(Math.random() * 255);
        let HPcur = this.comp_pok[0].hp;
        let HPmax = this.comp_pok[0].hpmax; 
        
        let f = ((HPmax*255*4)/(HPcur*8));
        if (f > M){
            this.caught();
            return true;
        }
        return false;
    }

    caught(){
        this.user_pok.push(this.comp_pok[0]);
        this.comp_pok[0] = "caught";
        return
    }
}
export { BattleLogic };
