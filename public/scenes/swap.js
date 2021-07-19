import { Canvas, TextureManager, Animation } from "../src/graphics.js";
import { Events } from "../src/input.js";
import { SCALE } from "../proj3.js";

//import { pokeparty } from "../src/core.js";
const swapAnimation={
    _pokeParty:Array(),
    index:0,
    init:function(){
    
        
        //TextureManager.CreateImage("assets/Pokemon Essentials v19.1 2021-05-22/Graphics/Pictures/Party/bg.PNG");
        //TextureManager.addImageObject("./CMSC-433-Pokemon-Game/public/assets/Pokemon Essentials v19.1 2021-05-22/Graphics/Pictures/Party/bg.PNG",party_background);
        //TextureManager.setImage("./CMSC-433-Pokemon-Game/public/assets/Pokemon Essentials v19.1 2021-05-22/Graphics/Pictures/Party/bg.PNG");
        TextureManager.DrawPicture('party_background',0,0,SCALE);
        swapAnimation.loadChar(); 
        
    },
    pickPokemon:function () {
        var postionx=256;
        var postiony=0;
        var scy=98;
        var scx=256;
        
        let pokemon=this._pokeParty[this.index];
        
        console.log(Events.KEY);
        if(Events.KEY==="DOWN"){
            this.index=this.index+1;
            
        }
        else if(Events.KEY==="UP"){
            this.index=this.index-1;
        }
        if(Events.KEY==="YES"){
          pokemon=this._pokeParty[this.index];  
        }
        if(this.index==0){
            postionx=0;
            postiony=0;
        }
        else if(this.index==1){
            postiony=postiony+scx;
        }
        else if(this.index==2){
            postiony=postiony+scx;
        }
        else if(this.index==3){
            postionx=postionx+scy;
            postiony=0;
        }
        else if(this.index==4){
            postiony=postiony+scx;
        }
        else if(this.index==5){
            postiony=postiony+scx;

        }

            TextureManager.DrawPicture('icon_ball_sel',postionx,postiony,SCALE);
    

        return pokemon
    },
    loadChar:function () {
        
        //Canvas.Context.clearRect(0, 0, Canvas.CanWidth, Canvas.CanHeight);
        var x=256;
        var y=-96;
        var scy=96;
        var scx=256;
        var textX=30;
        var texty=90;
        var panelX=0;
        var panelY=0;
        for (let i=0;i<6;i++){
            TextureManager.DrawPicture('red_panel',panelX,panelY,SCALE);
            TextureManager.addImageObject(`./assets/Pokemon Essentials v19.1 2021-05-22/Graphics/Pokemon/Front/${this._pokeParty[i].pokemon_name}.png`,this._pokeParty[i].pokemon_name);
            TextureManager.DrawPicture(this._pokeParty[i].pokemon_name,x,y,SCALE);

            TextureManager.drawText(`${this._pokeParty[i].pokemon_name}`,textX,texty);
            TextureManager.DrawPicture('lv',textX+10,texty+20,SCALE);
            TextureManager.drawText(`${this._pokeParty[i].level}`,textX+60,texty+50);
            //TextureManager.drawText(`hp: ${this._pokeParty[i].hp}`,textX,texty+50);
            //draw hp bar instead
            this._pokeParty[i].hp=this._pokeParty[i].hp*.75;
            if(this._pokeParty[i].hp>=this._pokeParty[i].hpmax*.60){
                //draw green
                var green={
                    row:0,
                    col:0
                }
                TextureManager.DrawPicture('overlay_hp_back',textX,texty+80,SCALE);
                TextureManager.DrawBar('overlay_hp',green,textX+70,texty+85,this._pokeParty[i].hp/153,SCALE);

            }
            else if(this._pokeParty[i].hp>=this._pokeParty[i].hpmax*.25 & this._pokeParty[i].hp<=this._pokeParty[i].hpmax*.60 ){
                TextureManager.DrawPicture('overlay_hp_back_swap',textX,texty+80,SCALE);
                var blue={
                    row:0,
                    col:1
                }
                TextureManager.DrawBar('overlay_hp',blue,textX+70,texty+85,this._pokeParty[i].hp/153,SCALE);
            }
            else if(this._pokeParty[i].hp<=this._pokeParty[i].hpmax*.25 ){
                TextureManager.DrawPicture('overlay_hp_back_faint',textX,texty+80,SCALE);
                var red={
                    row:0,
                    col:2
                }
                TextureManager.DrawBar('overlay_hp',red,textX+70,texty+85,this._pokeParty[i].hp/153,SCALE);
            }

            
             if(i!=2){
                y=y+scy*SCALE;
                panelY=panelY+scy*SCALE;
                texty=texty+scy*SCALE;
        
            }
         else{
             y=-60;
            texty=120;
                panelY=0;
                x=x+scx*SCALE;
                panelX=panelX+scx*SCALE;
                textX=textX+scx*SCALE;


            }
        
        
    }
    swapAnimation.pickPokemon(); 
        
    }


    

}

export{swapAnimation}