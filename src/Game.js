import { colide, gameElements } from "./utils";
import { onKeyDown, onKeyUp } from './ControlsHandler';
import { app } from './index';
import CommonBehaviours from './CommonBehaviours';
import GameElementFactory from './GameElementFactory';


export default class Game {
  constructor(delegate) {
    this.name = "play";
    this.delegate = delegate;
    this.score = 0;
    this.distanceTraveled = 0;
    this.hiScore = localStorage.getItem("hiScore")
      ? localStorage.getItem("hiScore")
      : 0;
    // this.gameElements = [];

    this.difficulty = {
      enemyAppearanceFrequency: 100,    //^ increase this to DEcrease difficulty
      enemyShotFrequency: 7,            //^ increase this to increase difficulty 
      obstacleAppearanceFrequency: 42   //^ increase this to increase difficulty 
    };

  };

  init = () => {
    // console.log(`Hi Score : ${this.hiScore}`); //^ FLOW
    // console.log("Game.js : GAME INIT"); //^ FLOW
    this.factory = new GameElementFactory();
    this.behaviours = new CommonBehaviours(this.factory).commonBehaviours;

    gameElements.push(this.factory.createUnit("player"));
    document.addEventListener("keydown", (e) => onKeyDown(e, this));
    document.addEventListener("keyup", (e) => onKeyUp(e));
    app.ticker.add(() => this.gameTicker(gameElements));
  };

  deInit = () => {
    // console.log("Game.js : GAME DEINIT"); //^ FLOW
    // app.stage.removeChild(this.text);
    document.removeEventListener("keyup", onKeyUp);
    document.removeEventListener("keydown", onKeyDown);
  };

  gameTicker = (gameElements) => { 
    ++this.distanceTraveled;

    // gameElements.forEach(el => { //* Not so good method for clearing the outscoped units ?
    //   if (!colide(el.rect, app.screen)) {
    //     gameElements = gameElements.filter(ge => ge !== el); //! Why is gameElements not defined untill pass it as argument to gameTicker
    //     // const foundIndex = gameElements.findIndex(i => i === el);
    //     // gameElements.splice(foundIndex, 1);
    //   };
    // });

    //? Second filtering solution 
    gameElements = gameElements.filter(el => colide(el.rect, app.screen)); //! Why is gameElements not defined untill pass it as argument to gameTicker

    this.generateGameObjects();

    let {
      behaviours,
      delegate,
    } = this;

    gameElements.forEach(el => {
      el.behaviours.forEach(b => {
        let behaviour = behaviours[b];
        if (behaviour) {
          behaviour(el, gameElements);
        };
      });

      // el.behaviours = el.behaviours.filter(
      //   (behaviour) => behaviour !== "score"
      // );
      gameElements.forEach(el2 => {
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
    // console.log(gameElements);
    delegate.render(gameElements);
  };

  generateGameObjects = () => {
    const {
      factory,
      difficulty
    } = this;

    if (this.distanceTraveled % difficulty.enemyAppearanceFrequency === 0) {
      gameElements.push(factory.createUnit("enemy"));
    };

    gameElements.forEach(element => {
      if ((element.name === "enemy") && (Math.random() * 1000 < difficulty.enemyShotFrequency)) {
        // gameElements.push(factory.createUnit("bullet", element));
        element.behaviours.push("fire");  //? Better than the upper one ?
      };
    });

    // if (this.distanceTraveled % difficulty.obstacleAppearanceFrequency === 0) {
    //   gameElements.push(factory.createUnit("obstacle"));
    // };

  };

};
