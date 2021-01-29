import { app } from './index';
import * as PIXI from 'pixi.js';
import sheetSource from './SpriteSheet.json';
import GameAssetsLoader from "./GameAssetsLoader";

export default class GraphicElement {
  constructor(el) {
    // console.log('el rect', el.rect);
    this.name = el.name;
    this.speed = 0;
    this.type = el.type;
    this.rect = el.rect;
    this.getSprite(); //TODO: General refactoring of getSprite() method
  };
  //TODO: Obtain control over element's size regardless the base dimensions from scene.json
  
  getSprite = () => {
    if (this.name === "player") {
      console.log('PLAYER CREATED');
      this.sprite = new PIXI.Sprite.from(GameAssetsLoader.SHEETS["player"]);
      // this.rect = {x: 50, y: 50, width: 100, height: 100};
      // console.log(this.rect);
      this.sprite.NAME = this.name; //* experimental
      this.sprite.scale.x = 2.1;
      this.sprite.scale.y = 2.1;
      this.sprite.x = 130;
      this.sprite.y = 50;
      this.sprite.anchor.set(0.5);
    } else if (this.name === "enemy") {
      console.log('ENEMY CREATED');
      this.sprite = new PIXI.Sprite.from(GameAssetsLoader.SHEETS["enemy"]);
      this.sprite.NAME = this.name;
      this.sprite.scale.x = -0.1;
      this.sprite.scale.y = 0.1;
      this.sprite.x = 130;
      this.sprite.y = 150;
      this.sprite.anchor.set(0.5);
    } else if (this.name === "bullet") {
      console.log('BULLET CREATED');
      this.sprite = new PIXI.Sprite.from(GameAssetsLoader.SHEETS["bullet"]);
      this.sprite.NAME = this.name;
      this.sprite.scale.x = -0.1;
      this.sprite.scale.y = 0.1;
      this.sprite.x = 130;
      this.sprite.y = 150;
      this.sprite.anchor.set(0.5);
    } else if (this.name === "rock") {
      console.log('ROCK CREATED');
      this.sprite = new PIXI.Sprite.from(GameAssetsLoader.SHEETS["rock"]);
      this.sprite.NAME = this.name;
      this.sprite.scale.x = -0.1;
      this.sprite.scale.y = 0.1;
      this.sprite.x = 130;
      this.sprite.y = 150;
      this.sprite.anchor.set(0.5);
    }
    else {
      throw new Error("GraphicElement.js : unknown graphic type");
    }
  };
};
