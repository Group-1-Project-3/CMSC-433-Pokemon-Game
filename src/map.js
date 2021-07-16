import { TextureManager } from "./graphics.js";

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

function TileSet(tileSize, colCount) {
    this.tileSize = tileSize;
    this.colCount = colCount;
}

export { Map, MapParser, TileLayer, TileSet };