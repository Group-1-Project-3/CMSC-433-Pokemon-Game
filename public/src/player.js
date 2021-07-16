import { Animation, TextureManager } from "./graphics.js";
import { CollisionHandler } from "./collision.js";
import { Camera } from "./camera.js";
import { Events } from "./input.js";

function Player(textureId, action, x, y, dx, dy) {
    this.animation = new Animation(textureId);
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.action = action;

    Player.prototype.GetOrigin = function () {
        const w = TextureManager.TextureMap[textureId].frameWidth;
        const h = TextureManager.TextureMap[textureId].frameHeight;
        const xCenter = this.x + ( w / 2 );
        const yCenter = this.y + ( h / 2 );
        return {x: xCenter, y: yCenter};
    }

    Player.prototype.Update = function (dt) {
        let prevX = this.x;
        let prevY = this.y;

        if (Events.KEY === "RIGHT"){
            this.x += this.dx * dt;
            this.action = "walk_right";
        }
        else if (Events.KEY === "LEFT") {
            this.x += -this.dx * dt;
            this.action = "walk_left";
        }
        else if (Events.KEY === "UP") {
            this.y += -this.dy * dt;
            this.action = "walk_up";
        }
        else if (Events.KEY === "DOWN") {
            this.y += this.dy * dt;
            this.action = "walk_down";
        }
        else if (Events.KEY === "") {
            this.animation.Stop(0);
        }

        /* check for collisions */
        let isCollision =   CollisionHandler.IsOutOfBoundsCollision(textureId, this.x, this.y) || 
                            CollisionHandler.IsMapCollision(textureId, this.GetOrigin().x, this.GetOrigin().y);

        if (isCollision) {
            // do nothing
            this.x = prevX;
            this.y = prevY;
        }

        Camera.SetTarget(this);
        this.animation.SetProps(this.action, 6);
        this.animation.Update();
    }

    Player.prototype.Render = function () {
        this.animation.Render(this.x, this.y);
    }
};

export { Player };