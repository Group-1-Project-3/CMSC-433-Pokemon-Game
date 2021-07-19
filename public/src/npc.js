import { Party, Pokemon } from "./pokemon.js";
import { Player } from "./player.js";
import { TextureManager, Animation } from "./graphics.js";


class NPC {

    // constructor(textureId, action, x, y, dx, dy, tx, ty){
    //     this.model = new Player(textureId, action, x, y, dx, dy, tx, ty, false);
    // }
    constructor(pokemon, pokemonArray){
        this.Party = new Party(pokemon, pokemonArray);
    }

    setDialogue(dialogue){
        this.dialogue = dialogue;
    }
    modelNPC(textureId, x, y){
        this.Model = new Animation(textureId);
        this.Model.SetProps("idle", 1);
        this.Model.Update();
        this.Model.Render(x, y);
    }

    talk(){
        return this.dialogue;
    }
}


export { NPC };
