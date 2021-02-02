import { colide, gameElements } from "./utils";
import { onKeyDown, onKeyUp } from './ControlsHandler';
import { app } from './index';
import CommonBehaviours from './CommonBehaviours';
import GameElementFactory from './GameElementFactory';
import StateMachine from "./StateMachine";

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
      enemyAppearanceFrequency: 100,    //^ increase this to DEcrease difficulty
      enemyShotFrequency: 7,            //^ increase this to increase difficulty 
      obstacleAppearanceFrequency: 42   //^ increase this to increase difficulty 
    };

  };

  init = () => {
    this.factory = new GameElementFactory();
    this.behaviours = new CommonBehaviours(this.factory).commonBehaviours;

    this.unitStateMachine = new StateMachine({
      strong: {
        allowedStates: ["moderate"],
        init: () => {
          // screen = new Menu();
          // screen.init();
        },
        deInit: () => {
          // screen.deInit();
          // screen = null;
        },
      },
      moderate: {
        allowedStates: ["weak"],
        init: () => {
          // screen = new Game(new PixiDelegate(app));
          // screen.init();
        },
        deInit: () => {
          // screen.deInit();
          // screen = null;
        },
      },
      weak: {

      }
    },
    "strong");

    gameElements.push(this.factory.createUnit("player"));
    document.addEventListener("keydown", (e) => onKeyDown(e, this.behaviours));
    document.addEventListener("keyup", (e) => onKeyUp(e));
    app.ticker.add(() => this.gameTicker(gameElements));
  };

  deInit = () => {
    document.removeEventListener("keyup", onKeyUp);
    document.removeEventListener("keydown", onKeyDown);
  };

  gameTicker = (gameElements) => { 
    ++this.distanceTraveled;
    
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
      difficulty: {
        enemyShotFrequency,
        enemyAppearanceFrequency
      }
    } = this;

    if (this.distanceTraveled % enemyAppearanceFrequency === 0) {
      gameElements.push(factory.createUnit("enemy"));
    };

    gameElements.forEach(element => {
      if ((element.name === "enemy") && (Math.random() * 1000 < enemyShotFrequency)) {
        element.behaviours.push("fire");
      };
    });

    // if (this.distanceTraveled % difficulty.obstacleAppearanceFrequency === 0) {
    //   gameElements.push(factory.createUnit("obstacle"));
    // };

  };

};
