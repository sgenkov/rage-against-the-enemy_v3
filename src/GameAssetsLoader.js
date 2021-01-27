import { app } from './index';
import * as PIXI from 'pixi.js';
import sheetSource from './SpriteSheet.json';
import { assets } from './scene.json';

class GameAssetsLoader {

    constructor() {
        this.SHEETS = {};
    };

    loadAssets = () => {
        app.loader.baseUrl = "./assets";
        assets.forEach(asset => app.loader.add(asset[0], asset[1]));

        app.loader.onProgress.add(this.showProgress);
        app.loader.onComplete.add(() => this.doneLoading(app));
        app.loader.onError.add(this.reportError);

        app.loader.load();
        app.stage.interactive = true;
    };

    showProgress = (e) => {
        console.log(e.progress);
    };
    reportError = (e) => {
        console.log('ERROR : ' + e.message);
    };

    doneLoading = () => {
        console.log('DONE LOADING!!!');
        this.createSheets();
    };

    createSheets = () => {
        let baseSheet = new PIXI.BaseTexture.from(app.loader.resources["SpriteSheet"].url);
        for (let key in sheetSource.frames) {
          const { x, y, w, h } = sheetSource.frames[key].frame;
          this.SHEETS[key.split('.')[0]] = new PIXI.Texture(baseSheet, new PIXI.Rectangle(x, y, w, h));
        };
      };
};

export default new GameAssetsLoader();