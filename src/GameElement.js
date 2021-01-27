import { app } from './index';
import * as PIXI from 'pixi.js';
import sheetSource from './SpriteSheet.json';
import GameAssetsLoader from "./GameAssetsLoader";

export default class GameElement {
  constructor(el) {
    this.name = el.name;
    this.speed = 0;
    this.type = el.type;
    this.rect = el.rect;
    // this.SHEETS = {};
    // this.createSheets();
    this.getSprite();
  };

  // createSheets = () => {
  //   let ssheet = new PIXI.BaseTexture.from(app.loader.resources["SpriteSheet"].url);
  //   for (let key in sheetSource.frames) {
  //     const { x, y, w, h } = sheetSource.frames[key].frame;
  //     this.SHEETS[key.split('.')[0]] = new PIXI.Texture(ssheet, new PIXI.Rectangle(x, y, w, h));
  //   };
  // };

  getSprite = () => {
    if (this.name === "player") {
      console.log('PLAYER CREATED');
      this.sprite = new PIXI.Sprite.from(GameAssetsLoader.SHEETS["player"]);
      this.sprite.scale.x = 2.1;
      this.sprite.scale.y = 2.1;
      this.sprite.x = 130;
      this.sprite.y = 50;
      this.sprite.anchor.set(0.5);
    } else if (this.name === "enemy") {
      console.log('ENEMY CREATED');
      this.sprite = new PIXI.Sprite.from(GameAssetsLoader.SHEETS["enemy"]);
      this.sprite.scale.x = -0.1;
      this.sprite.scale.y = 0.1;
      this.sprite.x = 130;
      this.sprite.y = 150;
      this.sprite.anchor.set(0.5);
    } else {
      console.log('DEFAULT CREATED');
      this.sprite = new PIXI.Sprite.from(GameAssetsLoader.SHEETS["rock"]);
      this.sprite.scale.x = -0.1;
      this.sprite.scale.y = 0.1;
      this.sprite.x = 250;
      // this.sprite.y = Math.random() * (app.view.height - 45) + 20;
      this.sprite.y = 250;
      this.sprite.anchor.set(0.5);
    }
  };
};
