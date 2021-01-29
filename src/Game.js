import { colide, getIndex } from "./utils";
import { onKeyDown, onKeyUp } from './ControlsHandler';
import { app } from './index';
import CommonBehaviours  from './CommonBehaviours';
import GameElementFactory from './GameElementFactory';
import Enemy from './UnitModel/Enemy';

export default class Game {
  constructor(delegate) {
    // this.behaviours = commonBehaviours;
    this.name = "play";
    this.delegate = delegate;
    this.score = 0;
    this.distanceTraveled = 0;
    this.hiScore = localStorage.getItem("hiScore")
      ? localStorage.getItem("hiScore")
      : 0;
    this.gameElements = [];

  };

  init = () => {
    console.log(`Hi Score : ${this.hiScore}`);
    console.log("Game.js : GAME INIT");
    this.factory = new GameElementFactory(this.gameElements);
    this.behaviours = new CommonBehaviours(this.gameElements).commonBehaviours;

    document.addEventListener("keydown", (e) => onKeyDown(e, this));
    document.addEventListener("keyup", (e) => onKeyUp(e, this));
    // console.log(this.gameElements);
    app.ticker.add(this.gameTicker);
  };

  deInit = () => {
    console.log("Game.js : GAME DEINIT");
    // app.stage.removeChild(this.text);
    document.removeEventListener("keyup", onKeyUp);
    document.removeEventListener("keydown", onKeyDown);
  };

  gameTicker = () => {
    ++this.distanceTraveled;
    // console.log('gameEls : ', this.gameElements);  //! this.gameElements DOES NOT filters himself ! FIND WHY !
    if (this.distanceTraveled % 100 === 0) {
      this.factory.createEnemy();
    };

    let {
      behaviours,
      delegate,
    } = this;

    this.gameElements.forEach(el => {
      el.behaviours.forEach(b => {
        let behaviour = behaviours[b];
        if (behaviour) {
          behaviour(el);
        };
      });

      // el.behaviours = el.behaviours.filter(
      //   (behaviour) => behaviour !== "score"
      // );
      this.gameElements.forEach(el2 => {
        let test = el2.hitGroup & el.colides;
        let test2 = colide(el.rect, el2.rect);
        // console.log(el2.hitGroup);
        // console.log(el);
        // if (test > 0 && test2) {
          if (test > 0 && test2) {
          // el2.behaviours.push("score");
          // el2.behaviours.push("explode");
          // el.behaviours.push("explode"); //* This one removes only the Enemy
          el2.behaviours.push("explode"); //* This one removes both colided elements

          el.colideMap[test].forEach(b => {
            behaviours[b](el);
          })

        }
      })
    })
    console.log(this.gameElements);
    delegate.render(this.gameElements);
  };

};
