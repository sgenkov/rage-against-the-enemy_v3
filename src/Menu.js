import { Text } from 'pixi.js';
import { app } from './index';
import gameStateModel from './GameStateModel';

export default class Menu {
    constructor() {
        this.name = "menu";
    };

    init = () => {
        // console.log('Menu.js : MENU INIT'); //^ FLOW
        this.render();
    };

    deInit = () => {
        // console.log("Menu.js : MENU DEINIT"); //^ FLOW
        app.stage.removeChild(this.text);
        this.text.removeListener("pointerdown", this.onClick);
        this.text = null;
    };

    render = () => {
        this.text = new Text("New Game", {
            fontSize: 35,
            fill: "#fcc000",
            align: "center",
            stroke: "#ff0d00",
            strokeThickness: 2,
        });
        this.text.anchor.set(0.5);
        this.text.position.x = app.view.width / 2;
        this.text.position.y = app.view.height / 2;
        this.text.interactive = true;
        this.text.buttonMode = true;
        app.stage.addChild(this.text);
        this.text.on("pointerdown", this.onClick);
    };

    ticker = () => {
        console.log("menu ticker");
    }

    onClick = () => {
        gameStateModel.setState({
          currentScreen: "play",
        });
    };
};