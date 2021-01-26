import { app } from './index';
import * as PIXI from 'pixi.js';

export default class GameElement extends PIXI.Sprite {
  constructor(name, type, rect) {
    super();
    this.name = name;
    this.speed = 0;
    this.type = type;
    this.getSprite();
    
  };

  getSprite = () => {
    if (this.name === "player") {
      // console.log('app', app.loader.resources["playerShip"]);
      console.log('PLAYER CREATED');
      this.sprite = new PIXI.Sprite.from(app.loader.resources["playerShip"].url);
      this.sprite.scale.x = -0.1;
      this.sprite.scale.y = 0.1;
      this.sprite.x = 130;
      this.sprite.y = 50;
      this.sprite.anchor.set(0.5);
    } else if (this.name === "enemy") {
      console.log('ENEMY CREATED');
      this.sprite = new PIXI.Sprite.from(app.loader.resources["enemyBlue"].url);
      this.sprite.scale.x = -0.1;
      this.sprite.scale.y = 0.1;
      this.sprite.x = 130;
      this.sprite.y = 150;
      this.sprite.anchor.set(0.5);
    } else {
      console.log('DEFAULT CREATED');
      this.sprite = new PIXI.Sprite.from(app.loader.resources["enemyRed"].url);
      this.sprite.scale.x = -0.1;
      this.sprite.scale.y = 0.1;
      this.sprite.x = 250;
      // this.sprite.y = Math.random() * (app.view.height - 45) + 20;
      this.sprite.y = 250;
      this.sprite.anchor.set(0.5);
    }
  };
};
