import { Canvas } from "./graphics.js";

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
    Update: function (dt) {
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

export { Camera };