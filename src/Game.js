import scene from './scene.json';
import { colide, binaryReprezentation, defaultGameElement } from "./utils";
import GameAssetsLoader from './GameAssetsLoader';
import { onKeyDown, onKeyUp } from './ControlsHandler';
import Rectangle from './Rectangle';
import { app } from './index';

export default class Game {
  constructor(delegate) {
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

    // const tLoader = new GameAssetsLoader();
    // tLoader.loadAssets();

    scene.elements.forEach(({
      dimentions,
      speed = [],
      hitGroup = [],
      colides = [],
      ...rest
  }, index) => {
      let rect = new Rectangle(...dimentions);

      hitGroup = hitGroup.reduce((a, e) =>
          a | binaryReprezentation[e]
          , 0);

      let { colide, colideMap } = Object.entries(colides)
          .reduce(({ colide, colideMap }, [key, value]) => ({
              colide: colide | binaryReprezentation[key],
              colideMap: {
                  ...colideMap,
                  [binaryReprezentation[key]]: value
              }

          })
              , { colide: 0, colideMap: {} })

      this.gameElements.push({
          ...defaultGameElement,
          ...rest,
          id: index,
          rect,
          speed: { x: speed[0] || 0, y: speed[1] || 0 },
          colideMap,
          hitGroup,
          colides: colide,
      });
  });




    this.behaviours = {
      "move": (el) => {
        el.rect.x += el.speed.x;
        el.rect.y += el.speed.y;
      },
      "moveUp": (el) => {
        el.speed.y = -5;
      },
      "moveDown": (el) => {
        el.speed.y = 5;
      },
      "moveLeft": (el) => {
        el.speed.x = -5;
      },
      "moveRight": (el) => {
        el.speed.x = 5;
      },
      "stop": (el) => {
        el.speed.x = 0;
        el.speed.y = 0;
        el.behaviours = el.behaviours.filter(e => e != "stop");
      },
      "score": (el) => {
        el.name === "brick" && ++this.playerScore && el.behaviours.push("hitten");
        if (el.name === "wall4") {
          console.log(`player score: ${this.playerScore}`);
          console.log("Game Over");
        };
      },
      "hitten": (el) => {
        this.gameElements = this.gameElements.filter(ge => ge !== el);
        el.behaviours = el.behaviours.filter(e => e != "hitten");
      },
      "fire": (el) => {
        console.log('FIRE');
      }
    };

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

      el.behaviours = el.behaviours.filter(
        (behaviour) => behaviour !== "score"
      );
      this.gameElements.forEach(el2 => {
        let test = el2.hitGroup & el.colides;

        if (test > 0
          && colide(el.rect, el2.rect)
        ) {
          el2.behaviours.push("score");
          el.colideMap[test].forEach(b => {
            behaviours[b](el);
          })
        }
      })
    })
    delegate.render(this.gameElements);
  };

};
