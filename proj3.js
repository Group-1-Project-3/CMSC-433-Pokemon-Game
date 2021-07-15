
/*  
 * Below are a set of singleton/regular classes that create the engine and structure which will 
 * define the behavoir, graphics, and gameplay of our pokemon game. Each class has a specific role-
 * the Texture Manager class loads a map of images or animations that we will use through out our
 * game. The Animation class is responisble for making those images come to life and appear like they
 * are actually moving. The Canvas object is just a wrapper over our canvas element that is provided in
 * default javascript. The Events class attaches events to the DOM.
 */

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

const AudioManager = {
    Init: function () {
        
    }
};

const TextureManager = {
    TextureMap: TEXTURES,
    Init: function () {
        const keys = Object.keys(this.TextureMap);
        let imagePath = "";
        keys.forEach( (key) => {
            imagePath = this.TextureMap[key].path;
            this.TextureMap[key].image = this.CreateImage(imagePath);
        } );
    },
    CreateImage: function (src) {
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
            x - Camera.camX,
            y - Camera.camY,
            texture.frameWidth,
            texture.frameHeight
        );
    },
    DrawTile: function (textureId, tileRow, tileCol, xRow, yCol) {
        const texture = this.TextureMap[textureId];
        const ts = texture.frameWidth;
        Canvas.Context.drawImage(
            texture.image,
            tileCol * ts,
            tileRow * ts,
            ts,
            ts,
            xRow * ts - Camera.camX,
            yCol * ts - Camera.camY,
            ts,
            ts
        );
    }
};

const Camera = {
    playerX: 0,
    playerY: 0,
    playerW: 0,
    playerH: 0,
    mapW: 0,
    mapH: 0,
    camX: 0, 
    camY: 0,
    Init: function (map) {
        this.mapW = map.widthPx;
        this.mapH = map.heightPx;
    },
    SetTargetPlayerCoordinates: function (x, y, w, h) {
        this.playerX = x;
        this.playerY = y;
        this.playerW = w;
        this.playerH = h;
    },
    Update: function () {
        this.camX = this.playerX - ( Canvas.CanWidth / 2 );
        this.camY = this.playerY - ( Canvas.CanHeight / 2 );

        /* keep screen grounded at start */
        if (this.playerX < ( Canvas.CanWidth / 2 ) )
            this.camX = 0
        if (this.playerY < ( Canvas.CanHeight / 2 ) )
            this.camY = 0

        /* keep screen grounded at end */
        if (this.playerX > ( this.mapW - ( Canvas.CanWidth / 2 ) ) )
            this.camX = this.mapW - Canvas.CanWidth;
        if (this.playerY > this.mapH - ( Canvas.CanHeight / 2 ) ) 
            this.camY = this.mapH - Canvas.CanHeight;
    }
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

const CollisionHandler = {
    mapH: 0,
    mapW: 0,
    collisionLayer: {},
    Init: function (map) {
        this.mapH = map.heightPx;
        this.mapW = map.widthPx;
        this.collisionLayer = map.GetCollisionLayer();
    },
    IsOutOfBoundsCollision: function (textureId, x, y) { 
        /* If our player goes out of bounds we don't update 'x' and 'y' */
        let rightBody = x + TextureManager.TextureMap[textureId].frameWidth;
        let bottomBody = y + TextureManager.TextureMap[textureId].frameHeight;
        let leftBody = x;
        let topBody = y;
        let rightWall = this.mapW;
        let leftWall = 0;
        let topWall = 0;
        let bottomWall = this.mapH;

        if ( rightBody >= rightWall || bottomBody >= bottomWall || topBody <= topWall || leftBody <= leftWall)
            return true;

        return false;
    },
    IsMapCollision: function (textureId, x, y) {
        /* If our player goes into collision layer we don't update 'x' and 'y' */
        let leftSide = Math.floor(x / this.collisionLayer.tileSize);
        let rightSide = Math.ceil((x + TextureManager.TextureMap[textureId].frameWidth) / this.collisionLayer.tileSize);
        let topSide = Math.floor(y / this.collisionLayer.tileSize);
        let bottomSide = Math.ceil((y + TextureManager.TextureMap[textureId].frameHeight) / this.collisionLayer.tileSize);

        for (let i = leftSide; i < rightSide; i++) {
            for (let j = topSide; j < bottomSide; j++) {
                console.log(this.collisionLayer.tileMap[i][j]);
                if (this.collisionLayer.tileMap[j][i] !== 0) {
                    return true;
                }
            }
        }

        return false;        
    }
}

const MapParser = {
    Load: function (jsonMap, srcTileSet) {
        /* Parse the tileset */
        let tileSet = this.ParseTileSet(jsonMap.tilesets[0]);

        /* Parse the tilelayer */
        let tileLayers = [];
        for (let i = 0; i < jsonMap.layers.length; i++) {
            const layerElem = jsonMap.layers[i];
            tileLayers.push( this.ParseTileLayer(layerElem, tileSet, srcTileSet) );
        }

        /* Get map size */
        const width = jsonMap['width'];
        const height = jsonMap['height'];
        const tilewidth = jsonMap['tilewidth'];
        let totalWidth = width * tilewidth;
        let totalHeight = height * tilewidth;

        return new Map(tileLayers, totalWidth, totalHeight);
    },
    ParseTileLayer: function (layerElem, tileSet, srcTileSet) {
        const colCount = layerElem.width;
        const rowCount = layerElem.height;
        const tileSize = tileSet.tileSize;

        let tileMap = [];
        let index = 0;
        for (let i = 0; i < rowCount; i++) {
            let row = [];
            for (let j = 0; j < colCount; j++) {
                row.push( layerElem.data[index++] );
            }
            tileMap.push(row);
        }

        return new TileLayer(tileSize, rowCount, colCount, tileMap, tileSet, srcTileSet);    
    },
    ParseTileSet: function (tileElem) {
        const tileSize = tileElem.tilewidth;
        const colCount = tileElem.columns;
        return new TileSet(tileSize, colCount);    
    }
}

function Player(x, y, dx, dy) {
    this._animation = new Animation('trainer_red');
    this._x = x;
    this._y = y;
    this._dx = dx;
    this._dy = dy;
    this.action = "idle";

    Player.prototype.Update = function () {
        let prevX = this._x;
        let prevY = this._y;

        if (Events.KEY === "RIGHT"){
            this._x += this._dx * Clock.DeltaTime;
            this.action = "walk_right";
        }
        else if (Events.KEY === "LEFT") {
            this._x += -this._dx * Clock.DeltaTime;
            this.action = "walk_left";
        }
        else if (Events.KEY === "UP") {
            this._y += -this._dy * Clock.DeltaTime;
            this.action = "walk_up";
        }
        else if (Events.KEY === "DOWN") {
            this._y += this._dy * Clock.DeltaTime;
            this.action = "walk_down";
        }
        else if (Events.KEY === "") {
            this._animation.Stop(0);
        }

        if (CollisionHandler.IsOutOfBoundsCollision('trainer_red', this._x, this._y) || CollisionHandler.IsMapCollision('trainer_red', this._x, this._y)) {
            // do nothing
            this._x = prevX;
            this._y = prevY;
        }

        Camera.SetTargetPlayerCoordinates(this._x, this._y, 0, 0);
        this._animation.SetProps(this.action, 6);
        this._animation.Update();
    }

    Player.prototype.Render = function () {
        this._animation.Render(this._x, this._y);
    }
};

function Animation(textureId) {
    this.delay;
    this.frame = {};
    this.frameIndex;
    this.frameSet;
    this.count;
    this.id = textureId;
    this.action;
    this.stopped;

    Animation.prototype.SetProps = function (action, delay) {
        if (this.action !== action || this.stopped === true) {
            this.action = action;
            this.delay = delay;
            this.frame = {};
            this.frameIndex = 0;
            this.frameSet = TextureManager.TextureMap[this.id].frameSets[action];
            this.count = 0;
            this.stopped = false;
        }
    }

    Animation.prototype.Stop = function (frameIndex) {
        this.stopped = true;
        this.frameIndex = frameIndex;
        this.delay = Infinity;
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

function TileSet(tileSize, colCount) {
    this.tileSize = tileSize;
    this.colCount = colCount;
}

function TileLayer(tileSize, rowCount, colCount, tileMap, tileSet, srcTileSet) {
    this.tileSet = tileSet;
    this.tileMap = tileMap;
    this.rowCount = rowCount;
    this.colCount = colCount;
    this.tileSize = tileSize;
    this.textureId = srcTileSet;
 
    TileLayer.prototype.Render = function () {
        for (let i = 0; i < this.rowCount; i++) {
            for (let j = 0; j < this.colCount; j++) {
                let id = this.tileMap[i][j];

                if (id === 0)
                    continue;
                
                let col = (id - 1) % tileSet.colCount;
                let row = Math.floor((id - 1) / tileSet.colCount);                    

                TextureManager.DrawTile(this.textureId, row, col, j, i);
            }
        }    
    }
}

function Map(tileLayers, widthPx, heightPx) {
    this.tileLayers = tileLayers;
    this.widthPx = widthPx;
    this.heightPx = heightPx;

    Map.prototype.GetCollisionLayer = function () {
        return this.tileLayers[this.tileLayers.length - 1];
    }

    Map.prototype.Render = function () {
        for (let i = 0; i < tileLayers.length; i++)
            tileLayers[i].Render();
    }
}

const Game = {
    Map: MapParser.Load(MAP, 'outside_tileset'),
    Player: new Player(200, 200, 5, 5),
    Init: function (){
        Canvas.Init();
        Events.Init();    
        TextureManager.Init();
        Camera.Init(this.Map);
        CollisionHandler.Init(this.Map);
    },
    Update: function () {
        this.Player.Update();
        Camera.Update();
    },
    Render: function () {
        this.Map.Render();
        this.Player.Render();
    },
    Clear: function () {
        Canvas.Context.clearRect(0, 0, Canvas.CanWidth, Canvas.CanHeight);
    }
};

/* 
 * The below is our main game loop. Each iteration of the loop we update our sprites and animations
 * and then render them on the canvas element that we have cached from the html DOM in our html file.
 * The Clock object is used to make our updates frame rate independent so that our animations and sprite
 * movements will be kept the same speed across multiple different screen refresh rates. Most monitors have
 * refresh rates of 60fps so this will be our target. 
 */

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