import { TextureManager } from "./graphics.js";

const MapParser = {
    Load: function (jsonMap) {
        /* Parse the tilesets */
        let tileSets = [];
        for (let i = 0; i < jsonMap['tilesets'].length; i++) {
            const tileSetElem = jsonMap['tilesets'][i];
            tileSets.push( this.ParseTileSet(tileSetElem) );
        }

        /* Parse the tilelayers */
        let tileLayers = [];
        for (let i = 0; i < jsonMap['layers'].length; i++) {
            const layerElem = jsonMap['layers'][i];
            tileLayers.push( this.ParseTileLayer(layerElem, tileSets) );
        }

        /* Get map size */
        const width = jsonMap['width'];
        const height = jsonMap['height'];
        const tilewidth = jsonMap['tilewidth'];
        let totalWidth = width * tilewidth;
        let totalHeight = height * tilewidth;

        return new Map(tileLayers, totalWidth, totalHeight);
    },
    ParseTileLayer: function (layerElem, tileSet) {
        const colCount = layerElem['width'];
        const rowCount = layerElem['height'];
        const tileSize = tileSet['tileSize'];

        let tileMap = [];
        let index = 0;
        for (let i = 0; i < rowCount; i++) {
            let row = [];
            for (let j = 0; j < colCount; j++) {
                row.push( layerElem['data'][index++] );
            }
            tileMap.push(row);
        }

        return new TileLayer(tileSize, rowCount, colCount, tileMap, tileSet);    
    },
    ParseTileSet: function (tileElem) {
        const tileName = tileElem['name'];
        const tileSize = tileElem['tilewidth'];
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

    Map.prototype.GetCollisionLayer = function () {
        return this.tileLayers[this.tileLayers.length - 1];
    }

    Map.prototype.Render = function () {
        for (let i = 0; i < tileLayers.length; i++)
            tileLayers[i].Render();
    }
}

function TileLayer(tileSize, rowCount, colCount, tileMap, tileSets) {
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

export { Map, MapParser, TileLayer, TileSet };