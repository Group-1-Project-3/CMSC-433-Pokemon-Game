
// import { Pokemon } from "./pokemon_class.js";

/* Classes & Objects */
const Canvas = {
    Context: {},
    CanWidth: 0,
    CanHeight: 0,
    _canvas: {},
    Init: function () {
        this._canvas = document.getElementById('canvas');
        this.Context = this._canvas.getContext('2d');
        this.CanWidth = this._canvas.width;
        this.CanHeight = this._canvas.height;

    }
};

const TextureManager = {
    TextureMap: TEXTURES,
    Init: function () {
        const keys = Object.keys(this.TextureMap);
        let imagePath = "";
        keys.forEach( (key) => {
            imagePath = this.TextureMap[key].path;
            this.TextureMap[key].image = this.createImage(imagePath);
        } );
    },
    createImage: function (src) {
        const image = new Image();
        image.src = src;
        return image;
    },
    DrawFrame: function (textureId, currFrame, x, y) {
        const texture = this.TextureMap[textureId];
        Canvas.Context.drawImage(
            texture.image,
            currFrame.row * texture.frameWidth,
            currFrame.col * texture.frameHeight,
            texture.frameWidth,
            texture.frameHeight,
            x,
            y,
            texture.frameWidth,
            texture.frameHeight
        );
    },

    DrawPicture: function (textureId, x, y, scale){
        const texture = this.TextureMap[textureId];
        Canvas.Context.drawImage(
            texture.image,
            0,
            0,
            texture.frameWidth,
            texture.frameHeight,
            x,
            y,
            texture.frameWidth * scale,
            texture.frameHeight * scale
    )}
};

const Events = {
    KEY: "",
    Init: function() {
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
    }
};

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

const Player = {
    _animation: new Animation('trainer_red'),
    _x: 10,
    _y: 10,
    _dx: 5,
    _dy: 5,
    Update: function () {
        let prevX = this._x;
        let prevY = this._y;

        if (Events.KEY === "RIGHT"){
            this._x += this._dx * Clock.DeltaTime;
            this._animation.SetProps('walk_right', 10);
        }
        else if (Events.KEY === "LEFT") {
            this._x += -this._dx * Clock.DeltaTime;
            this._animation.SetProps('walk_left', 10);
        }
        else if (Events.KEY === "UP") {
            this._y += -this._dy * Clock.DeltaTime;
            this._animation.SetProps('walk_up', 10);
        }
        else if (Events.KEY === "DOWN") {
            this._y += this._dy * Clock.DeltaTime;
            this._animation.SetProps('walk_down', 10);
        }
        else {
            this._animation.SetProps('idle', 10);
        }

        /* If our player goes out of bounds or runs into the collision layer we don't update 'x' and 'y' */
        let rightBody = this._x + TextureManager.TextureMap['trainer_red'].frameWidth;
        let bottomBody = this._y + TextureManager.TextureMap['trainer_red'].frameHeight;
        let leftBody = this._x;
        let topBody = this._y;
        let rightWall = Canvas.CanWidth;
        let leftWall = 0;
        let topWall = 0;
        let bottomWall = Canvas.CanHeight;

        if ( rightBody >= rightWall || bottomBody >= bottomWall || topBody <= topWall || leftBody <= leftWall){
            // do nothing
            this._x = prevX;
            this._y = prevY;
        }

        this._animation.Update();
    },
    Render: function () {
        this._animation.Render(this._x, this._y);
    }
};

const BattleScene = {
    Init: function(){
        drawBackground('battle_background');
        slideInAnimation();
        draw_fight_overlay();

    },



};

const Game = {
    Init: function (){
        Canvas.Init();
        Events.Init();
        TextureManager.Init();
        BattleScene.Init();
    },
    Update: function () {
        // Player.Update();
    },
    Render: function () {
        // Player.Render();

    },
    Clear: function () {
        // Canvas.Context.clearRect(0, 0, Canvas.CanWidth, Canvas.CanHeight);
    }
};

function drawBackground(textureId) {
    const SCALE = 2.37;
    TextureManager.DrawPicture(textureId, 0, 0, SCALE);

}

// function draw_menu_overlay(){
//     var frame = {
//         row : 0,
//         col : 0
//     };
//     TextureManager.DrawFrame();
// }

function draw_fight_overlay(){
    const SCALE = 2.37;
    TextureManager.DrawPicture('overlay_message_box', 0, 475, SCALE);
    TextureManager.DrawPicture('overlay_fight', 0, 475, SCALE);
    TextureManager.DrawPicture('our_health_box', 731, 300, SCALE);
    TextureManager.DrawPicture('foe_health_box', 0, 50, SCALE);
    TextureManager.DrawPicture('pokemon_front', 650, 0, SCALE);
    TextureManager.DrawPicture('pokemon_back', 100, 100, SCALE);

}

function slideInAnimation(){
    const SCALE = 2.37;
    TextureManager.DrawPicture('base0', -300, 325, SCALE);
    TextureManager.DrawPicture('base1', 600, 100, SCALE);
}


// function drawPokemons(){
//     var frame = {
//         row : 0,
//         col : 0
//     };
//
// }

function Animation(textureId) {
    this.delay;
    this.frame = {};
    this.frameIndex;
    this.frameSet;
    this.count;
    this.id = textureId;
    this.action;

    Animation.prototype.SetProps = function (action, delay) {
        if (this.action !== action) {
            this.action = action;
            this.delay = delay;
            this.frame = {};
            this.frameIndex = 0;
            this.frameSet = TextureManager.TextureMap[this.id].frameSets[action];
            this.count = 0;
        }
    }

    Animation.prototype.Update = function () {
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

    Animation.prototype.Render = function (x, y) {
        TextureManager.DrawFrame(this.id, this.frame, x, y);
    }
}


function main() {

    /* Game loop */
    Game.Clear();
    Game.Update();
    Game.Render();
    Clock.Tick();

    requestAnimationFrame(main);
}

/* Prepare game by init events and defaults */
Game.Init();
/* Performs at 60fps on most monitorss */
requestAnimationFrame(main);

// $(document).ready(function(){
//
//     $.get("get_pokemon_data.php?pokemon_name=Charmander", function(data){
//         var pokemon = jQuery.parseJSON(data);
//         var pokemon_id = pokemon[1];
//         var pokemon_name = pokemon[2];
//         var type1 = pokemon[3];
//         var type2 = pokemon[4];
//         var totalstat = pokemon[5];
//         var hp = pokemon[6];
//         var attack = pokemon[7];
//         var defense = pokemon[8];
//         var spattack = pokemon[9];
//         var spdefense = pokemon[10];
//         var speed = pokemon[11];
//
//         $("#mybutton").click(function(p){
//
//         });
//     });
// });