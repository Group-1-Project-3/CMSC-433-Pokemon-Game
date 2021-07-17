import { Camera } from "./camera.js";

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
    },
    DrawPicture: function (textureId, x, y, scale) {
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
        )
    },
    DrawBar: function (textureId, currFrame, x, y, xscale, yscale) {
        const texture = this.TextureMap[textureId];
        Canvas.Context.drawImage(
            texture.image,
            currFrame.row * texture.frameWidth,
            currFrame.col * texture.frameHeight,
            texture.frameWidth,
            texture.frameHeight,
            x,
            y,
            texture.frameWidth * xscale,
            texture.frameHeight * yscale
        )
    },

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

export { Canvas, TextureManager, Animation };
