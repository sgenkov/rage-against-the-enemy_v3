import { Graphics } from "pixi.js";
import { colide } from "./utils";
import GameElement from './GameElement';
import { app } from './index';
import * as PIXI from 'pixi.js';

export default class PixiDelegate {
    constructor(app, size) {
        this.app = app;
        this.size = size;

        this.freeGraphics = [];
    }

    createElement = () => {
        // const color = 0x1FF455;
        // let graphic = new Graphics();
        // graphic.beginFill(color);
        // graphic.drawRect(0, 0, 10, 10)
        // graphic.endFill();

        // let graphic = new PIXI.Sprite.from(app.loader.resources["playerShip"].url)
        let graphic = new GameElement();
        console.log('graphic', graphic.sprite);
        return graphic.sprite;
    }

    getGraphic = (id) => {
        let {
            freeGraphics,
            createElement,
            app: {
                stage,
            }
        } = this;

        let graphic;
        if (freeGraphics.length == 0) {
            graphic = createElement();
        } else {
            graphic = freeGraphics.pop();
        }

        graphic.geId = id;

        stage.addChild(graphic);

        return graphic;
    }

    freeUpGraphic = (graphic) => {
        let {
            freeGraphics,
            app: {
                stage,
            }
        } = this;

        delete graphic.geId;
        stage.removeChild(graphic);
        freeGraphics.push(graphic);
    }

    applySize = ({ rect: { x, y, width, height }}, graphic) => {
        graphic.x = x;
        graphic.y = y;
        graphic.width = width;
        graphic.height = height;
    };

    deInit = () => {
        
        this.app.stage.removeChildren();

        this.app = null;
    }

    render(gameElements) {
        if(this.app == null) {
            return;
        };

        let {
            app: {
                stage: {
                    children,
                },
                screen,
                stage
            },
            size,
            applySize,
            freeUpGraphic,
            getGraphic
        } = this;
        // this.app.stage.children = [];
        children.forEach(child => {
            if (!gameElements.some(gameElement => gameElement.id === child.id)) {
                // stage.removeChild(child);
                freeUpGraphic(child);
            };
        });

        let map = children.reduce((acc, el) => {
            if (el.geId == null) {
                return acc;
            } else {
                return {
                    ...acc,
                    [el.geId]: el,
                }
            }
        }, {});

        gameElements.forEach(el => {
            if (colide(el.rect, size || screen)) {
                let graphic;

                if (map[el.id]) {
                    graphic = map[el.id];
                } else {
                    graphic = getGraphic(el.id);
                };
                applySize(el, graphic);
            } else {
                if (map[el.id]) {
                    freeUpGraphic(map[el.id]);
                };
            };
        });

        // console.log(this.app.stage.children.length);
        // console.log(`free graphics length : ${this.freeGraphics.length}`);
    };
};