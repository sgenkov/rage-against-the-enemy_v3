import scene from './scene.json';
import Rectangle from './Rectangle';
import { getIndex, binaryReprezentation, defaultGameElement } from "./utils";
import GameElement from './GameElement';
import Enemy from './UnitModel/Enemy';

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
        this.gameElements.push(new Enemy({
            "name": "enemy",
            "type": "yellow",
            "behaviours":["move", "moveLeft"],
            "hitGroup":["enemy"],
            "speed":[0,0],
            "colides":{
                "playerBullet":["break"]
            },
            "dimentions": [200, 50, 20, 20]
          }))
    }
};