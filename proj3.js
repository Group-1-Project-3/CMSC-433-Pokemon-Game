/* To do:
 * 1.) Make frame rate independent for animations by setting the delay in the animation class proportional to the running frame rate
 * 2.) Put all warrior related events, updates, and renderings in the Warrior class
 * 3.) Create a Canvas class that gets new canvas layers, draws frames, and draw regular pictures (kind of like TextureManager class)
 * 4.) Encapsulate default init functions within Game.Init() like Game.AttachEvents() and Canvas.LoadImages() 
 * 5.) Create a TextureManage class that parses the textures.json file and stores images in a map
 * */

const can = document.getElementById('canvas');
const ctx = can.getContext('2d');
const canWidth = can.width;
const canHeight = can.height;

/* Game Classes & Objects */
const Game = {
    KEY: "",
    _frameWidth: 128 / 4,
    _frameHeight: 192 / 4,
    _sprite: new Image(),
    _animation: new Animation(),
    _frameSets: {
        walk_right: [ [2, 0], [2, 1], [2, 2], [2, 3] ],
        walk_left: [ [1, 0], [1, 1], [1, 2], [1, 3] ],
        walk_up: [ [3, 0], [3, 1], [3, 2], [3, 3] ],
        walk_down: [ [0, 0], [0, 1], [0, 2], [0, 3] ],
        idle: [ [0, 0], [0, 0], [0, 0], [0, 0] ]
    },
    Init: function (){
        this._sprite.src = "assets/Pokemon Essentials v19.1 2021-05-22/Graphics/Characters/NPC 19.png";
    },
    AttachEvents: function () {
        document.addEventListener('keydown', (e) => {
            e.preventDefault();
            const key = e.key;
            if (key === "ArrowUp" || key === "w") 
                this.KEY = "UP";
            else if (key === "ArrowDown" || key === "s") 
                this.KEY = "DOWN";
            else if (key === "ArrowRight" || key === "d") 
                this.KEY = "RIGHT";
            else if (key === "ArrowLeft" || key === "a")
                this.KEY = "LEFT";
        });
        document.addEventListener('keyup', (e) => {
            e.preventDefault();
            this.KEY="";
        });
    },
    Events: function(){
        if (this.KEY === "RIGHT") {
            this._animation.SetProps(this._frameSets.walk_right, 10);
        }
        else if (this.KEY === "LEFT") {
            this._animation.SetProps(this._frameSets.walk_left, 10);
        }
        else if (this.KEY === "UP") {
            this._animation.SetProps(this._frameSets.walk_up, 10);
        }
        else if (this.KEY === "DOWN") {
            this._animation.SetProps(this._frameSets.walk_down, 10);
        }
        else {
            this._animation.SetProps(this._frameSets.idle, 10);
        }
    },
    Update: function () {
        this._animation.Update();
    },
    Render: function () {
        ctx.clearRect(0, 0, canWidth, canHeight);
        ctx.drawImage(
            this._sprite,
            this._animation.frame.row * this._frameWidth,
            this._animation.frame.col * this._frameHeight,
            this._frameWidth,
            this._frameHeight,
            canWidth / 2,
            canHeight / 2,
            this._frameWidth,
            this._frameHeight
        );
    }
};

function Animation() {
    this.delay;
    this.frame = {};
    this.frameIndex;
    this.frameSet;
    this.count;

    this.SetProps = function (frameSet, delay) {
        if (this.frameSet != frameSet) {
            this.delay = delay;
            this.frame = {};
            this.frameIndex = 0;
            this.frameSet = frameSet;
            this.count = 0;
        }
    }

    this.Update = function () {
        this.count++; 
        if (this.count >= this.delay) {
            // update the animation to the next frame in the frame set
            this.frameIndex = (this.frameIndex >= this.frameSet.length - 1) ? 0 : this.frameIndex + 1;
            // reset the count
            this.count = 0;
        }

        const frameArray = this.frameSet[this.frameIndex];
        this.frame.row = frameArray[1];
        this.frame.col = frameArray[0];
    }
}

const Clock = {
    DeltaTime: 0,
    _prevTime: 0,
    _millisecondsPerSecond: 1000,
    _targetFrameRate: 60,
    Tick: function () {
        this.DeltaTime =  ( ( Date.now() - this._prevTime ) / this._millisecondsPerSecond ) * this._targetFrameRate;
        this._prevTime = Date.now();
    },
};

function main() {

    /* Game loop */
    Game.Events();
    Game.Update();
    Game.Render();
    Clock.Tick();

    requestAnimationFrame(main);
}

/* Prepare game by init events and defaults */
Game.AttachEvents();
Game.Init();
/* Request animation frame performs at 60fps on most monitorss */
requestAnimationFrame(main);