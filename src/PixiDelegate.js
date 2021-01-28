import { colide } from "./utils";
import GraphicElement from './GraphicElement';

export default class PixiDelegate {
    constructor(app, size) {
        this.app = app;
        this.size = size;

        this.freeGraphics = [];
    }

    createElement = (el) => {
        // const color = 0x1FF455;
        // let graphic = new Graphics();
        // graphic.beginFill(color);
        // graphic.drawRect(0, 0, 10, 10)
        // graphic.endFill();

        let graphic = new GraphicElement(el);
        // console.log('graphic element', graphic.rect);
        return graphic.sprite;
    }

    getGraphic = (el) => {
        let {
            freeGraphics,
            createElement,
            app: {
                stage,
            }
        } = this;

        let graphic;
        const foundIndex = freeGraphics.findIndex(g => g.NAME === el.name);

        if (freeGraphics.length == 0 || foundIndex === -1) {
            graphic = createElement(el);
        } else {
            graphic = freeGraphics[foundIndex];                                 // SLOWDOWN CODE HERE ??
            freeGraphics.splice(foundIndex, 1);                                 // SLOWDOWN CODE HERE ??
        };

        graphic.geId = el.id;

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
        graphic.width = width ;
        graphic.height = height ;
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

        children.forEach(child => {
            if (!gameElements.some(gameElement => gameElement.id === child.id)) {
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
                // if (1) {
                let graphic;

                if (map[el.id]) {
                    graphic = map[el.id];
                } else {
                    graphic = getGraphic(el);
                };
                applySize(el, graphic);
            } else {
                if (map[el.id]) {
                    freeUpGraphic(map[el.id]);
                };
            };
        });

        // console.log(`Stage.children.length : ${this.app.stage.children.length}`);
        // console.log(`free graphics length : ${this.freeGraphics.length}`);
    };
};