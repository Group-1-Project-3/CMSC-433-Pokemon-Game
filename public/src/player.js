import { Animation, TextureManager } from "./graphics.js";
import { CollisionHandler, BoxCollider } from "./collision.js";
import { Camera } from "./camera.js";
import { Events } from "./input.js";

function Player(textureId, action, x, y, dx, dy, tx, ty) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.tx = tx;
    this.ty = ty;
    this.action = action;
    this.moving_right = false;
    this.moving_left = false;
    this.moving_up = false;
    this.moving_down = false;
    this.moving = false;
    this.destination;
    this.animation = new Animation(textureId, true);
    this.boxCollider = new BoxCollider(this.x, this.y, 12, 15, 11, 30);

    /* constructor */
    if (this.dx > this.tx || this.dx <= 0)
        console.log("ERROR: 'x' velocity is too big or too small");
    if (this.dy > this.ty || this.dy <= 0)
        console.log("ERROR: 'y' velocity is too big or too small");

    Player.prototype.GetOrigin = function () {
        const w = TextureManager.TextureMap[textureId].frameWidth;
        const h = TextureManager.TextureMap[textureId].frameHeight;
        const xCenter = this.x + (w / 2);
        const yCenter = this.y + (h / 2);
        return { x: xCenter, y: yCenter };
    }

    Player.prototype.GetBottom = function () {
        const w = TextureManager.TextureMap[textureId].frameWidth;
        const h = TextureManager.TextureMap[textureId].frameHeight;
        const xBottom = this.x + (w / 2);
        const yBottom = this.y + (3 / 4) * h;
        return { x: xBottom, y: yBottom };
    }

    Player.prototype.Move = function (dt) {
        if (this.moving_right) {
            if (this.destination <= this.x) {
                this.x = this.destination;
                this.moving_right = false;
            }
            else {
                this.action = "walk_right";
                this.x += this.dx;
            }
        }
        else if (this.moving_left) {
            if (this.destination >= this.x) {
                this.x = this.destination;
                this.moving_left = false;
            }
            else {
                this.action = "walk_left";
                this.x += -this.dx;
            }
        }
        else if (this.moving_up) {
            if (this.destination >= this.y) {
                this.y = this.destination;
                this.moving_up = false;
            }
            else {
                this.action = "walk_up";
                this.y += -this.dy;
            }
        }
        else if (this.moving_down) {
            if (this.destination <= this.y) {
                this.y = this.destination;
                this.moving_down = false;
            }
            else {
                this.action = "walk_down";
                this.y += this.dy;
            }
        }

    }

    Player.prototype.Update = function (dt) {
        let prevX = this.x;
        let prevY = this.y;

        this.moving = this.moving_right || this.moving_left || this.moving_down || this.moving_up;
        if (Events.KEY === "RIGHT" && !this.moving) {
            this.moving_right = true;
            let distToNextTile = (this.x % this.tx === 0) ? this.tx : Math.ceil(this.x / this.tx) * this.tx - this.x;
            this.destination = this.x + distToNextTile;
        }
        else if (Events.KEY === "LEFT" && !this.moving) {
            this.moving_left = true;
            let distToNextTile = (this.x % this.tx === 0) ? this.tx : this.x - Math.floor(this.x / this.tx) * this.tx;
            this.destination = this.x - distToNextTile;
        }
        else if (Events.KEY === "UP" && !this.moving) {
            this.moving_up = true;
            let distToNextTile = (this.y % this.ty === 0) ? this.ty : this.y - Math.floor(this.y / this.ty) * this.ty;
            this.destination = this.y - distToNextTile;
        }
        else if (Events.KEY === "DOWN" && !this.moving) {
            this.moving_down = true;
            let distToNextTile = (this.y % this.ty === 0) ? this.ty : Math.ceil(this.y / this.ty) * this.ty - this.y;
            this.destination = this.y + distToNextTile;
        }

        /* move the player */
        this.Move(dt);

        /* check for collisions */
        this.boxCollider.Update(this.x, this.y);
        let isCollision =   CollisionHandler.IsOutOfBoundsCollision(textureId, this.x, this.y) ||
                            CollisionHandler.IsMapCollision(this.boxCollider);

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
        this.animation.SetProps(this.action, 8);

        /* update animation while moving, otherwise reset to initial frame */
        if (this.moving && !this.animation.Finished()) 
            this.animation.Update();
        else
            this.animation.Reset();
    }

    Player.prototype.Render = function () {
        this.animation.Render(this.x, this.y);
    }
};

export { Player };
