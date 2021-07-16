import { Canvas } from "./graphics.js";

const Camera = {
    target: {},
    mapW: 0,
    mapH: 0,
    camX: 0, 
    camY: 0,
    Init: function (map) {
        this.mapW = map.widthPx;
        this.mapH = map.heightPx;
    },
    SetTarget: function (player) {
        this.target = player.GetOrigin();
    },
    Update: function (dt) {
        this.camX = this.target.x - ( Canvas.CanWidth / 2 );
        this.camY = this.target.y - ( Canvas.CanHeight / 2 );

        /* keep screen grounded at start */
        if (this.target.x < ( Canvas.CanWidth / 2 ) )
            this.camX = 0
        if (this.target.y < ( Canvas.CanHeight / 2 ) )
            this.camY = 0

        /* keep screen grounded at end */
        if (this.target.x > ( this.mapW - ( Canvas.CanWidth / 2 ) ) )
            this.camX = this.mapW - Canvas.CanWidth;
        if (this.target.y > this.mapH - ( Canvas.CanHeight / 2 ) ) 
            this.camY = this.mapH - Canvas.CanHeight;
    }
};

export { Camera };