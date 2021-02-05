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
        //TODO: new Graphics() for the walls???
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

        let foundIndex; 
        if (el.hasOwnProperty("owner")) { //^ Bullet direction handle
            foundIndex = freeGraphics.findIndex(g => (g.NAME === el.name) && (g.OWNER === el.owner));
        } else {
            foundIndex = freeGraphics.findIndex(g => {
                if (el.state !== 'stateless') {
                    return (g.NAME === el.name) && (el.state === g.STATE);
                } else {
                    return (g.NAME === el.name); 
                };
            });
        };

        if (freeGraphics.length == 0 || foundIndex === -1) {
            graphic = createElement(el);
        } else {
            graphic = freeGraphics[foundIndex];                                 //? SLOWDOWN CODE HERE ??
            freeGraphics.splice(foundIndex, 1);                                 //? SLOWDOWN CODE HERE ??
        };
        graphic.geId = el.id;
        // graphic.hasOwnProperty("SPEED") && (graphic.rotation = -Math.atan(graphic.SPEED.y / graphic.SPEED.x));
        stage.addChild(graphic);

        return graphic;
    };

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

    applySize = ({ rect: { x, y, width, height } }, graphic) => {
        graphic.x = x;
        graphic.y = y;
        // graphic.width = width;
        // graphic.height = height;
    };

    deInit = () => {

        this.app.stage.removeChildren();

        this.app = null;
    }

    render(gameElements) {
        if (this.app == null) {
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

        children.forEach(child => { //TODO: Move this loop somewhere ?
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
            // console.log('el from pixiDelegate : ', el);
            if (colide(el.rect, size || screen)) {
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