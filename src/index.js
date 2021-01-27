import registerServiceWorker from "./registerServiceWorker";
import { Application } from "pixi.js";
import StateMachine from "./StateMachine";
import Menu from "./Menu";
import gameStateModel from "./GameStateModel";
import Game from "./Game";
import PixiDelegate from './PixiDelegate';
import GameAssetsLoader from "./GameAssetsLoader";

export const app = new Application({
  width: window.innerWidth - 15,
  height: window.innerHeight - 25,
  backgroundColor: 0xdddddd,
});

document.body.appendChild(app.view);

GameAssetsLoader.loadAssets(); // remove the SINGLETON it holds a reference and prevents the GARBAGE COLLECTOR to clear it
let screen;
const stateMachine = new StateMachine(
  {
    menu: {
      allowedStates: ["play"],
      init: () => {
        // console.log("State machine MENU init");
        screen = new Menu();
        screen.init();
        //app.ticker.add(screen.ticker);

        // app.ticker.start();
      },
      deInit: () => {
        // console.log("State machine MENU deinit");
        screen.deInit();
        //app.ticker.remove(screen.ticker);
        screen = null;
      },
    },
    play: {
      allowedStates: ["menu"],
      init: () => {
        // console.log("State machine GAME init");
        screen = new Game(new PixiDelegate(app));
        screen.init();
        //app.ticker.add(screen.ticker);
      },
      deInit: () => {
        // console.log("State machine GAME deinit");
        screen.deInit();
        //app.ticker.remove(screen.ticker);
        screen = null;
      },
    },
  },
  "menu"
);

gameStateModel.addEventListener("stateUpdated", (event) => {
  // console.log(event);
  if (event.target.lastChangedProps.some((e) => e == "currentScreen")) {
    // console.log('E___',event.target.lastChangedProps);
    // console.log('model current screen' , model.currentScreen);
    console.log("state updated");
    stateMachine.setState(gameStateModel.currentScreen);
  }
});


registerServiceWorker();
