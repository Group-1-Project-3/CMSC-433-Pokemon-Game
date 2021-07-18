import { Pokemon } from "./pokemon_class.js";
import { TEXTURES } from "./assets/textures.js";
import { Canvas, TextureManager, Animation } from "./proj3.js";

class swapAnimation{
    *displaySwap(){
        var frame={
            row:0,
            col:0
        }
        TextureManager.TextureMap =TEXTURES.party_background;
        TextureManager.createImage(TEXTURES.party_background.path);
        TextureManager.DrawFrame(TextureManager.TextureMap,frame,window.innerWidth,window.innerHeight);

    }




}
function main() {
    swapAnimation.displaySwap();
}
main();