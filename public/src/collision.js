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
    IsMapCollision: function (textureId, x, y) {
        /* If our player goes into collision layer we don't update 'x' and 'y' */
        console.log(this.collisionLayer.tileSize);
        let leftSide = Math.floor(x / this.collisionLayer.tileSize);
        let rightSide = Math.ceil((x + TextureManager.TextureMap[textureId].frameWidth) / this.collisionLayer.tileSize);
        let topSide = Math.floor(y / this.collisionLayer.tileSize);
        let bottomSide = Math.ceil((y + TextureManager.TextureMap[textureId].frameHeight) / this.collisionLayer.tileSize);

        console.log(`${leftSide}, ${rightSide}, ${topSide}, ${bottomSide}`);
        for (let i = leftSide; i < rightSide; i++) {
            for (let j = topSide; j < bottomSide; j++) {
                if (this.collisionLayer.tileMap[j][i] !== 0) {
                    return true;
                }
            }
        }

        return false;        
    }
}

export { CollisionHandler };