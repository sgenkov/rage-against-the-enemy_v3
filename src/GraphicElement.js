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
    this.getSprite(el); //TODO: General refactoring of getSprite() method
  };
  
  //TODO: Obtain control over element's size regardless the base dimensions from scene.json
  
  getSprite = (el) => {
    if (this.name === "player") {
      // console.log('PLAYER CREATED'); //^ Object pooling monitoring
      this.sprite = new PIXI.Sprite.from(GameAssetsLoader.SHEETS["player"]);
      // this.rect = {x: 50, y: 50, width: 100, height: 100};
      this.sprite.NAME = this.name; //* experimental
      this.sprite.scale.x = 0.1;
      this.sprite.scale.y = 0.1;
      this.sprite.anchor.set(0.5);
      this.rect.width = this.sprite.width;
      this.rect.height = this.sprite.height;
      // console.log(this.rect);
      // console.log(this.sprite);
    } else if (this.name === "enemy") {
      // console.log('ENEMY CREATED'); //^ Object pooling monitoring
      this.sprite = new PIXI.Sprite.from(GameAssetsLoader.SHEETS["enemy"]);
      this.sprite.NAME = this.name;
      this.sprite.scale.x = -0.1;
      this.sprite.scale.y = 0.1;
      this.sprite.anchor.set(0.5);
      // this.rect.width = this.sprite.width;
      // this.rect.height = this.sprite.height;
      // console.log(this.rect);
      // console.log(this.sprite);
    } else if (this.name === "bullet") {
      // console.log('BULLET CREATED'); //^ Object pooling monitoring
      // console.log(`Owner : ${this.owner}`);
      // this.owner = el.owner;
      this.sprite = new PIXI.Sprite.from(GameAssetsLoader.SHEETS["bullet"]);
      this.sprite.NAME = this.name;
      if (el.hasOwnProperty("owner")) {
        this.sprite.OWNER = el.owner;
      }
      this.sprite.scale.x = this.sprite.OWNER === "player"? 0.2 : -0.2;
      this.sprite.scale.y = 0.2;
      this.sprite.anchor.set(0.5);
      // this.rect.width = this.sprite.width;
      // this.rect.height = this.sprite.height;
    } else if (this.name === "obstacle") {
      // console.log('OBSTACLE CREATED'); //^ Object pooling monitoring
      this.sprite = new PIXI.Sprite.from(GameAssetsLoader.SHEETS["obstacle"]);
      this.sprite.NAME = this.name;
      this.sprite.scale.x = 0.1;
      this.sprite.scale.y = 0.1;
      this.sprite.anchor.set(0.5);
      // this.rect.width = this.sprite.width;
      // this.rect.height = this.sprite.height;
    }
    else {
      throw new Error("GraphicElement.js : unknown graphic type");
    };
  };
};
