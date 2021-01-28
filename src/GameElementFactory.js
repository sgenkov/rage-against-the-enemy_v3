import scene from './scene.json';
import Rectangle from './Rectangle';
import { getIndex, binaryReprezentation, defaultGameElement } from "./utils";
import GameElement from './GameElement';
import Enemy from './UnitModel/Enemy';
import { app } from './index';

export default class GameElementFactory {
    constructor(gameElements) {
        this.gameElements = gameElements;
        this.init();
    };

    init = () => {
        scene.elements.forEach((sceneElement) => {
            this.gameElements.push(new GameElement(sceneElement))

            // this.gameElements.push({
            //     ...defaultGameElement,
            //     ...rest,
            //     id: getIndex(),
            //     rect,
            //     speed: { x: speed[0] || 0, y: speed[1] || 0 },
            //     colideMap,
            //     hitGroup,
            //     colides: colide,
            // });
        });
    };

    createEnemy = () => {
        const newEnemy = new Enemy({
            "name": "enemy",
            "type": "yellow",
            "behaviours": ["move", "moveLeft"],
            "hitGroup": ["enemy"],
            "speed": [0, 0],
            "colides": {
                "playerBullet": ["break"],
                "player": ["explode"]
            },
            "dimentions": [app.view.width, Math.random() * (app.view.height - 45) + 20, 60, 60]
        });
        this.gameElements.push(newEnemy);
    };

};