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
    this.moving_right = false;
    this.moving_left = false;
    this.moving_up = false;
    this.moving_down = false;
    this.moving = false;
    this.destination;

    /* constructor */
    if (this.dx > 32 || this.dx <= 0)
        console.log("ERROR: 'x' velocity is too big or too small");
    if (this.dy > 32 || this.dy <= 0)
        console.log("ERROR: 'y' velocity is too big or too small");

    Player.prototype.GetOrigin = function () {
        const w = TextureManager.TextureMap[textureId].frameWidth;
        const h = TextureManager.TextureMap[textureId].frameHeight;
        const xCenter = this.x + ( w / 2 );
        const yCenter = this.y + ( h / 2 );
        return {x: xCenter, y: yCenter};
    }

    Player.prototype.GetBottom = function () {
        const w = TextureManager.TextureMap[textureId].frameWidth;
        const h = TextureManager.TextureMap[textureId].frameHeight;
        const xBottom = this.x + ( w / 2 );
        const yBottom = this.y + (3/4) * h;
        return {x: xBottom, y: yBottom};
    }
    
    Player.prototype.Move = function (dt) {
        if (this.moving_right) {
            if (this.destination <= this.x) {
                this.x = this.destination;
                this.moving_right = false;
            }
            else{
                this.action = "walk_right";
                this.x += this.dx;
            }
        }
        else if (this.moving_left) {
            if (this.destination >= this.x) {
                this.x = this.destination;
                this.moving_left = false;
            }
            else{
                this.action = "walk_left";
                this.x += -this.dx;
            }
        }
        else if (this.moving_up) {
            if (this.destination >= this.y) {
                this.y = this.destination;
                this.moving_up = false;
            }
            else{
                this.action = "walk_up";
                this.y += -this.dy;
            }
        }
        else if (this.moving_down) {
            if (this.destination <= this.y) {
                this.y = this.destination;
                this.moving_down = false;
            }
            else{
                this.action = "walk_down";
                this.y += this.dy;
            }
        }
    }

    Player.prototype.Update = function (dt) {
        let prevX = this.x;
        let prevY = this.y;

        this.moving = this.moving_right || this.moving_left || this.moving_down || this.moving_up;
        if (Events.KEY === "RIGHT" && !this.moving){
            this.moving_right = true;
            let distToNextTile = (this.x % 32 === 0) ? 32 : Math.ceil(this.x / 32) * 32 - this.x;
            this.destination = this.x + distToNextTile;
        }
        else if (Events.KEY === "LEFT" && !this.moving) {
            this.moving_left = true;
            let distToNextTile = (this.x % 32 === 0) ? 32 : this.x - Math.floor(this.x / 32) * 32; 
            this.destination = this.x - distToNextTile;
        }
        else if (Events.KEY === "UP" && !this.moving){
            this.moving_up = true;
            let distToNextTile = (this.y % 32 === 0) ? 32 : this.y - Math.floor(this.y / 32) * 32; 
            this.destination = this.y - distToNextTile;
        }
        else if (Events.KEY === "DOWN" && !this.moving){
            this.moving_down = true;
            let distToNextTile = (this.y % 32 === 0) ? 32 : Math.ceil(this.y / 32) * 32 - this.y;
            this.destination = this.y + distToNextTile; 
        }

        /* move the player */
        this.Move(dt);

        /* check for collisions */
        let isCollision =   CollisionHandler.IsOutOfBoundsCollision(textureId, this.x, this.y) ||
                            CollisionHandler.IsMapCollision(textureId, this.GetOrigin().x, this.GetOrigin().y);

        if (isCollision) {
            // revert back to previous tile
            this.x = prevX;
            this.y = prevY;
            /* reset */
            this.moving = false;
            this.moving_left = false;
            this.moving_right = false;
            this.moving_up = false;
            this.moving_down = false;
        }

        Camera.SetTarget(this);
        this.animation.SetProps(this.action, 3);
        this.animation.Update();
    }

    Player.prototype.Render = function () {
        this.animation.Render(this.x, this.y);
    }
};

export { Player };
