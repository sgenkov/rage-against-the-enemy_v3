import scene from './scene.json';
import Enemy from './UnitModel/Enemy';
import Player from './UnitModel/Player';
import Bullet from './UnitModel/Bullet';
import Obstacle from './UnitModel/Obstacle';
import { app } from './index';

export default class GameElementFactory {
    constructor(gameElements) {
        this.gameElements = gameElements;
        this.init();
    };

    init = () => {
        scene.elements.forEach((sceneElement) => {
            this.createUnit(sceneElement.name);
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
            "behaviours": ["player1", "move"],
            "hitGroup": ["player"],
            "speed": [0, 0],
            "colides": {
                "hWall": ["stop"],
                "vWall": ["stop"],
                "enemy": ["explode"],
                "enemyBullet": ["break"],
                "obstacle": ["explode"]
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
            "dimensions": [app.view.width - 30, Math.random() * (app.view.height - 45) + 20, 60, 60] //TODO: Make the dimensions scalable
        });
        this.gameElements.push(newEnemy);
    };

    createBullet = ({ rect: { x, y }, name }) => {
        const bulletParams = (name === "player")
            ? { X: x + 65, speed: 6 }
            : { X: x - 65, speed: - 6 }; //TODO: Make the dimensions scalable
        const newBullet = new Bullet({
            "name": "bullet",
            "behaviours": ["move"],
            "hitGroup": ["bullet"],
            "speed": [bulletParams.speed, 0],
            "colides": {
                "enemy": ["explode"],
                "player": ["explode"]
            },
            "dimensions": [bulletParams.X, y, 30, 10] //TODO: Make the dimensions scalable
        });
        this.gameElements.push(newBullet);
    };

    createObstacle = () => {
        const newObstacle = new Obstacle({
            "name": "obstacle",
            "behaviours": ["move"],
            "hitGroup": ["obstacle"],
            "speed": [-2, 0],
            "colides": {
            },
            "dimensions": [app.view.width, app.view.height - 5, Math.random() * 150, Math.random() * 150] //TODO: Make the dimensions scalable
            // "dimensions": [250 , 250, 60, 60] //TODO: Make the dimensions scalable
        });
        this.gameElements.push(newObstacle);
    }


    //TODO: createPlayer
    //TODO: createObstacle

};