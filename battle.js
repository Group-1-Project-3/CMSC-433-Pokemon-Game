import { Player } from "./player_class.js";
import {TEXTURES} from ""
class BattleLogic {

    constructor (user, comp){
        this.user = user;
        this.comp = ((comp.constructor.name === "Player") ? comp : new Player([comp]));
        this.background="assets/Pokemon Essentials v19.1 2021-05-22/Graphics/Battlebacks/field_bg.png";
    }


    // returns updated hp for the attacked pokemon
    // give attack type as expected by pokemon class calcDamage 
    // and bool if computer doing the attack
    *attack(attack_type, isComp = false){
        let target_pok = this.comp.pokeparty[0];
        let attack_pok = this.user.pokeparty[0];

        if (isComp == true){
            target_pok = this.user.pokeparty[0];
            attack_pok = this.comp.pokeparty[0];
        } 

        let damage = attack_pok.calcDamage(target_pok, attack_type);
        let newHP = target_pok.hp - damage;
        if (newHP < 0)
            newHP = 0;
        target_pok.hp = newHP;

        if (offence_pl == "user")
            this.comp.pokeparty[0] = target_pok;
        else if (offence_pl == "comp")
            this.user.pokeparty[0] = target_pok;

        return [this.user.pokeparty[0], this.comp.pokeparty[0]];
    }


    // returns if the players have any living pokemon left
    *checkAlive(){
        let useralive = false;
        let compalive = false;
        for (var pok in this.user.pokeparty){
            if (pok.hp > 0)
                useralive = true;
        }
        if (this.comp.pokeparty[0] != "caught"){
            for (var pok in this.comp.pokeparty){
                if (pok.hp > 0)
                    compalive = true;
            }
        }
        
        return [useralive, compalive];
    }


    *getPlayers(){
        return [this.user, this.comp]
    }


    *checkSwap(){
        let result = [false, false];
        if (this.user.pokeparty[0].hp == 0)
            result[0] = true;
        if (this.comp.pokeparty[0].hp == 0)
            result[1] = true;
        return result;
    }


    // moves pokemon to end of array if out of hp
    // returns the new pokemon
    *swap(){
        if (this.user.pokeparty[0].hp == 0){
            let tmp = this.user.pokeparty.shift();
            this.user.pokeparty.push(tmp);
        }

        if (this.comp.pokeparty[0].hp == 0){
            let tmp = this.comp.pokeparty.shift();
            this.comp.pokeparty.push(tmp);
        }

        return [this.user.pokeparty[0], this.comp.pokeparty[0]];
    }


    // calculates if a pokemon was caught and updates the players pokeparty if true
    *catchpok() {
        let N = Math.floor(Math.random() * 255);
        if (N < 25){
            this.user.pokeparty.push(this.comp.pokeparty[0]);
            this.comp.pokeparty[0] = "caught";
            return true;
        }
        let M = Math.floor(Math.random() * 255);
        let HPcur = this.comp.pokeparty[0].hp;
        let HPmax = this.comp.pokeparty[0].hpmax; 
        
        let f = ((HPmax*255*4)/(HPcur*8));
        if (f > M){
            this.user.pokeparty.push(this.comp.pokeparty[0]);
            this.comp.pokeparty[0] = "caught";
            return true;
        }
        return false;
    }
    *displayBattle(){
        const BattleBackground=new Image();
        BattleBackground.Image=this.background;

        Canvas.Context.drawImage(BattleBackground.Image,0,0,Canvas.CanHeight,Canvas.CanWidth);
            


    }
    *swapAnimation(){

    }
    *shake(pokemon, canvas){
        var pokeHeight=pokemon.height;
        var pokewidth=pokemon.width;
        var xPostion=pokemon.xPostion;
        var yPostion=pokemon.yPostion;
        var top=xPostion+pokeHeight;
        var bottom=xPostion-pokeHeight;
        const interal=100;
        const move=20;
        var x=0;
        var y=0;
      tID=setInterval(()=>{
        
          if(xPostion<top){
                xPostion=xPostion+move;
          }
          if(xPostion>bottom){
                xPostion=xPostion-move;
          }

        convas.Image(pokemon.Image,xPostion,yPostion,pokeWidth,pokeHeight,pokemon.framex,pokemon.framey,x,y);   
      },interal);  

    }

}
export { BattleLogic };