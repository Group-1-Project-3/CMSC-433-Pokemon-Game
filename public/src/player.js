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
    this.nextX = this.x; // buffer for next tile 
    this.nextY = this.x; // buffer for next tile 
    this.action = action;
    this.moving_right = false;
    this.moving_left = false;
    this.moving_up = false;
    this.moving_down = false;
    this.destination;

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

        if (Events.KEY === "RIGHT" && !this.moving_right){
            this.moving_right = true;
            this.destination = this.x + 32;
        }
        else if (Events.KEY === "LEFT" && !this.moving_left) {
            this.moving_left = true;
        }
        else if (Events.KEY === "UP" && !this.moving_up){
            this.moving_up = true;
        }
        else if (Events.KEY === "DOWN" && !this.moving_down){
            this.moving_down = true;
            this.destination = this.y + 32;
        }

        if (this.moving_right) {
            console.log(`${this.destination - this.x}`);
            if (this.destination % this.x === 0) {
                this.x = this.destination;
                this.moving_right = false;
            }
            else{
                this.x += 1;
            }
        }
        else if (this.moving_down) {
            if (this.destination % this.y === 0) {
                this.y = this.destination;
                this.moving_down = false;
            }
            else{
                this.y += 1;
            }
        }
        
        this.animation.SetProps("walk_right", 10);

        /* check for collisions */
        let isCollision =   CollisionHandler.IsOutOfBoundsCollision(textureId, this.x, this.y) || 
                            CollisionHandler.IsMapCollision(textureId, this.GetOrigin().x, this.GetOrigin().y);

        if (isCollision) {
            // do nothing
            this.x = prevX;
            this.y = prevY;
        }

        Camera.SetTarget(this);
        this.animation.Update();
    }

    Player.prototype.Render = function () {
        this.animation.Render(this.x, this.y);
    }
};

export { Player };
