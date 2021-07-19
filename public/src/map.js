import { Animation, TextureManager } from "./graphics.js";

const MapParser = {
    Load: function (jsonMap) {
        /* Get map size */
        const width = jsonMap['width'];
        const height = jsonMap['height'];
        const tileSize = jsonMap['tilewidth'];
        let totalWidth = width * tileSize;
        let totalHeight = height * tileSize;

        /* Parse the tilesets */
        let tileSets = [];
        for (let i = 0; i < jsonMap['tilesets'].length; i++) {
            const tileSetElem = jsonMap['tilesets'][i];
            tileSets.push( this.ParseTileSet(tileSetElem, tileSize) );
        }

        /* Parse the tilelayers */
        let tileLayers = [];
        for (let i = 0; i < jsonMap['layers'].length; i++) {
            const layerElem = jsonMap['layers'][i];
            tileLayers.push( this.ParseTileLayer(layerElem, tileSets, tileSize) );
        }

        return new Map(tileLayers, totalWidth, totalHeight);
    },
    ParseTileLayer: function (layerElem, tileSets, tileSize) {
        const name = layerElem['name'];
        const colCount = layerElem['width'];
        const rowCount = layerElem['height'];

        let tileMap = [];
        let index = 0;
        for (let i = 0; i < rowCount; i++) {
            let row = [];
            for (let j = 0; j < colCount; j++) {
                row.push( layerElem['data'][index++] );
            }
            tileMap.push(row);
        }

        return new TileLayer(name, tileSize, rowCount, colCount, tileMap, tileSets);    
    },
    ParseTileSet: function (tileElem, tileSize) {
        const tileName = tileElem['name'];
        const colCount = tileElem['columns'];
        const firstId = tileElem['firstgid'];
        const lastId = firstId + tileElem['tilecount'] - 1;
        return new TileSet(tileName, tileSize, colCount, firstId, lastId);    
    }
}

function Map(tileLayers, widthPx, heightPx) {
    this.tileLayers = tileLayers;
    this.widthPx = widthPx;
    this.heightPx = heightPx;

    Map.prototype.GetTileLayer = function (layerName) {
        let tileLayer;
        for (let i = 0; i < tileLayers.length; i++) {
            const layer = tileLayers[i];
            if (layer.name === layerName) 
                tileLayer = layer;
        }

        return tileLayer;
    }

    Map.prototype.GetCollisionLayer = function () {
        return this.tileLayers[this.tileLayers.length - 1];
    }

    Map.prototype.Render = function () {
        for (let i = 0; i < tileLayers.length; i++)
            tileLayers[i].Render();
    }
}

function TileLayer(name, tileSize, rowCount, colCount, tileMap, tileSets) {
    this.name = name;
    this.tileSets = tileSets;
    this.tileMap = tileMap;
    this.rowCount = rowCount;
    this.colCount = colCount;
    this.tileSize = tileSize;
 
    TileLayer.prototype.Render = function () {
        for (let i = 0; i < this.rowCount; i++) {
            for (let j = 0; j < this.colCount; j++) {
                let id = this.tileMap[i][j];

                if (id === 0)
                    continue;

                // get the correct tileset
                let ts;
                for (let i = 0; i < this.tileSets.length; i++) {
                    ts = this.tileSets[i];
                    if (id >= ts.firstId && id <= ts.lastId) {
                        // normalize the id to a valid state
                        id = id - (ts.firstId - 1);
                        break;
                    }
                }

                let col = (id - 1) % ts.colCount;
                let row = Math.floor((id - 1) / ts.colCount);                    

                TextureManager.DrawTile(ts.name, row, col, j, i);
            }
        }    
    }
}

function TileSet(name, tileSize, colCount, firstId, lastId) {
    this.name = name;
    this.firstId = firstId;
    this.lastId = lastId;
    this.tileSize = tileSize;
    this.colCount = colCount;
}

function TileEffect(textureId, tileId, layerName, map, player, delay) {
    this.animation = new Animation(textureId, true);
    this.targetTileId = tileId;
    this.tileEffect = false;
    this.player = player;
    this.map = map
    this.layerName = layerName;
    this.previousTiles = [];
    this.delay = delay;
    this.count = 0;

    this.activeTileId;
    this.tileX;
    this.tileY;

    TileEffect.prototype.GetActiveTileId = function (layerName, playerLocation) {
        const tileLayer = this.map.GetTileLayer(layerName);
        const row = Math.floor( playerLocation.y / tileLayer.tileSize );
        const col = Math.floor( playerLocation.x / tileLayer.tileSize );
        const activeTileId = tileLayer.tileMap[row][col];

        return activeTileId;
    }

    TileEffect.prototype.GetActiveTileLocation = function (layerName, playerLocation) {
        const tileLayer = this.map.GetTileLayer(layerName);
        const row = Math.floor( playerLocation.y / tileLayer.tileSize );
        const col = Math.floor( playerLocation.x / tileLayer.tileSize );

        return {row: row, col: col};
    }


    TileEffect.prototype.TargetTileIsActive = function () {
        return this.activeTileId === this.targetTileId
    }

    TileEffect.prototype.TargetTileIsNew = function () {
    }

    TileEffect.prototype.Update = function (dt) {
        this.activeTileId = this.GetActiveTileId(this.layerName, this.player.GetBottom());
        this.tileX = this.GetActiveTileLocation( this.layerName, this.player.GetBottom() ).col * 32;
        this.tileY = this.GetActiveTileLocation( this.layerName, this.player.GetBottom() ).row * 32;

        /* 
         * If the animation below has stopped than animate again
         */

        this.tileEffect = false;

        if (this.TargetTileIsActive() && this.TargetTileIsNew()) {
            console.log("Made it");
            if (!this.animation.Finished()) {
                this.tileEffect = true;
                this.animation.SetProps("brush", 10);
                this.animation.Update();
            }
            else{
                this.tileEffect = false;
            }
        }
    }

    TileEffect.prototype.Render = function () {
        if (this.tileEffect === true)
            this.animation.Render(this.tileX, this.tileY);
    }
}

export { Map, MapParser, TileLayer, TileSet, TileEffect };