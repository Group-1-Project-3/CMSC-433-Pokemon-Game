import { Animation } from "./graphics.js";
import { CollisionHandler } from "./collision.js";
import { Camera } from "./camera.js";
import { Events } from "./input.js";

function Player(x, y, dx, dy) {
    this._animation = new Animation('npc_19');
    this._x = x;
    this._y = y;
    this._dx = dx;
    this._dy = dy;
    this.action = "idle";

    Player.prototype.Update = function (dt) {
        let prevX = this._x;
        let prevY = this._y;

        if (Events.KEY === "RIGHT"){
            this._x += this._dx * dt;
            this.action = "walk_right";
        }
        else if (Events.KEY === "LEFT") {
            this._x += -this._dx * dt;
            this.action = "walk_left";
        }
        else if (Events.KEY === "UP") {
            this._y += -this._dy * dt;
            this.action = "walk_up";
        }
        else if (Events.KEY === "DOWN") {
            this._y += this._dy * dt;
            this.action = "walk_down";
        }
        else if (Events.KEY === "") {
            this._animation.Stop(0);
        }

        /* check for collisions */
        let isCollision =   CollisionHandler.IsOutOfBoundsCollision('npc_19', this._x, this._y) || CollisionHandler.IsMapCollision('npc_19', this._x, this._y);
        if (isCollision) {
            // do nothing
            this._x = prevX;
            this._y = prevY;
        }

        Camera.SetTargetPlayerCoordinates(this._x, this._y, 0, 0);
        this._animation.SetProps(this.action, 6);
        this._animation.Update();
    }

    Player.prototype.Render = function () {
        this._animation.Render(this._x, this._y, SCALE);
    }
};

export { Player };
