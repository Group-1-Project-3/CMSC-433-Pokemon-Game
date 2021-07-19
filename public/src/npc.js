import { Animation } from "./graphics.js";

function NPC(textureId, action, x, y){
    this.animation = new Animation(textureId);
    this.action = action;
    this.x = x;
    this.y = y;

    NPC.prototype.Update = function (dt) {
        this.animation.SetProps(this.action, 3);
        this.animation.Update();
    }

    NPC.prototype.Render = function () {
        this.animation.Render(this.x, this.y);
    }
}

export { NPC };
