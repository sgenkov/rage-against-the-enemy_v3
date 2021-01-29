import scene from './scene.json';
import GameElement from './GameElement';
import Enemy from './UnitModel/Enemy';
import Player from './UnitModel/Player';
import { app } from './index';

export default class GameElementFactory {
    constructor(gameElements) {
        this.gameElements = gameElements;
        this.init();
    };

    init = () => {
        scene.elements.forEach((sceneElement) => {

            this.createUnit(sceneElement.name);

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

    createUnit = (type) => {
        switch (type) {
            case "player":
                this.createPlayer();
                break;
            case "enemy":
                this.createEnemy();
                break;
            case "obstacle":
                this.createObstacle();
                break;
            case "bullet":
                this.createBullet;
                break;
        };
    };
    createPlayer = () => {
        const newPlayer = new Player({
            "name": "player",
            "behaviours":["player1", "move"],
            "hitGroup":["player"],
            "speed":[0, 0],
            "colides":{
                "hWall":["stop"],
                "vWall":["stop"],
                "enemy":["explode"],
                "enemyBullet":["break"],
                "obstacle":["explode"]
            },
            "dimensions": [35, app.view.height / 2, 60, 60] //TODO: Make the dimensions scalable
        });
        this.gameElements.push(newPlayer);
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
            "dimensions": [app.view.width - 30, Math.random() * (app.view.height - 45) + 20, 60, 60]
        });
        this.gameElements.push(newEnemy);
    };
    

    //TODO: createPlayer
    //TODO: createBullet
    //TODO: createObstacle

};