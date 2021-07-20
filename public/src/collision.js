import { TextureManager } from "./graphics.js";

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
    IsMapCollision: function (boxCollider) {
        /* If our player goes into collision layer we don't update 'x' and 'y' */
        let leftSide = Math.floor( boxCollider.left / this.collisionLayer.tileSize );
        let rightSide = Math.floor( boxCollider.right / this.collisionLayer.tileSize );
        let topSide = Math.floor( boxCollider.top / this.collisionLayer.tileSize );
        let bottomSide = Math.floor( boxCollider.bottom / this.collisionLayer.tileSize );

        for (let i = leftSide; i <= rightSide; i++) {
            for (let j = topSide; j <= bottomSide; j++) {
                if (this.collisionLayer.tileMap[j][i] !== 0) {
                    return true;
                }
            }
        }

        return false;        
    }
}

function BoxCollider(x, y, w, h, xOffset, yOffset) {
    this.w = w;
    this.h = h;
    this.xOffset = xOffset;
    this.yOffset = yOffset;

    this.left = x + this.xOffset;
    this.right = this.left + this.w;
    this.top = y + this.yOffset;
    this.bottom = this.top + this.h;  

    BoxCollider.prototype.Update = function(x, y) {
        this.left = x + this.xOffset;
        this.right = this.left + this.w;
        this.top = y + this.yOffset;
        this.bottom = this.top + this.h;  
    }
};

export { CollisionHandler, BoxCollider };