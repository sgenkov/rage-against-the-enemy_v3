import { colide } from "./utils";
import { onKeyDown, onKeyUp } from './ControlsHandler';
import { app } from './index';
import CommonBehaviours from './CommonBehaviours';
import GameElementFactory from './GameElementFactory';
import Model from './Model';
 
export default class Game {
  constructor(delegate) {
    this.name = "play";
    this.delegate = delegate;
    this.score = 0;
    this.distanceTraveled = 0;
    this.hiScore = localStorage.getItem("hiScore")
      ? localStorage.getItem("hiScore")
      : 0;
    this.difficulty = {
      enemyAppearanceFrequency: 200,    //^ increase this to DEcrease difficulty
      enemyShotFrequency: 7,            //^ increase this to increase difficulty 
      obstacleAppearanceFrequency: 42   //^ increase this to increase difficulty 
    };

  };

  init = () => {
    this.factory = new GameElementFactory();
    this.behaviours = new CommonBehaviours(this.factory).commonBehaviours;
    Model.gameElements.push(this.factory.getUnit("player"));
    document.addEventListener("keydown", (e) => onKeyDown(e, this.behaviours));
    document.addEventListener("keyup", (e) => onKeyUp(e));
    app.ticker.add(this.gameTicker);
  };

  deInit = () => {
    document.removeEventListener("keyup", onKeyUp);
    document.removeEventListener("keydown", onKeyDown);
  };

  gameTicker = () => { 
    ++this.distanceTraveled;
    
    Model.gameElements = Model.gameElements.filter(el => colide(el.rect, app.screen));

    this.generateGameObjects();

    let {
      behaviours,
      delegate,
    } = this;

    Model.gameElements.forEach(el => {
      el.behaviours.forEach(b => {
        let behaviour = behaviours[b];
        if (behaviour) {
          behaviour(el, Model.gameElements);
        };
      });

      Model.gameElements.forEach(el2 => {
        let test = el2.hitGroup & el.colides;
        let test2 = colide(el.rect, el2.rect);
        if (test > 0 && test2) {
          // el.behaviours.push("explode"); //* This one removes only the Enemy
          el2.behaviours.push("break"); //* This one removes both colided elements

          el.colideMap[test].forEach(b => {
            behaviours[b](el);
          })

        }
      })
    })
    // console.log(Model.gameElements);
    delegate.render(Model.gameElements);
  };

  generateGameObjects = () => {
    const {
      factory,
      difficulty: {
        enemyShotFrequency,
        enemyAppearanceFrequency,
        obstacleAppearanceFrequency
      }
    } = this;

      if (this.distanceTraveled % enemyAppearanceFrequency === 0) {
        Model.gameElements.push(factory.getUnit("enemy"));
      };

      Model.gameElements.forEach(element => {
        if ((element.name === "enemy") && (Math.random() * 1000 < enemyShotFrequency)) {
          element.behaviours.push("fire");
        };
      });

    // if (this.distanceTraveled % obstacleAppearanceFrequency === 0) {
    //   Model.gameElements.push(factory.getUnit("obstacle"));
    // };

  };

};
