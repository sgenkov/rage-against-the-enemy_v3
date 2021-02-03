import Enemy from './UnitModel/Enemy';
import Player from './UnitModel/Player';
import Bullet from './UnitModel/Bullet';
import Obstacle from './UnitModel/Obstacle';
import { app } from './index';

export default class GameElementFactory {
    constructor() {
        this.init();
    };
    
    init = () => {
        this.unitMap = new Map([
            ["enemy", this.createEnemy],
            ["player", this.createPlayer],
            ["bullet", this.createBullet],
            ["obstacle", this.createObstacle]
        ]);
        
        // scene.elements.forEach((sceneElement) => {
        //     this.createUnit(sceneElement.name);
        // });

    };

    createUnit = (type, el) => {
        return this.unitMap.get(type)(el);
    };

    createPlayer = () => {
        const newPlayer = new Player({
            "name": "player",
            "health": 3,
            "behaviours": ["player1", "move"],
            "hitGroup": ["player"],
            "speed": [0, 0],
            "colides": {
                "hWall": ["stop"],
                "vWall": ["stop"],
                "enemy": ["explode"],
                "bullet": ["break"],
                "obstacle": ["explode"]
            },
            "dimensions": [49, app.view.height / 2, 60, 60] //TODO: Make the dimensions scalable
        });
        return newPlayer;
    };

    createEnemy = () => {
        const newEnemy = new Enemy({
            "name": "enemy",
            "health": 3,
            "type": "yellow",
            "behaviours": ["move"],
            "hitGroup": ["enemy"],
            "speed": [-2, 0],
            "colides": {
                // "playerBullet": ["break"],
                "bullet": ["break"],
                "player": ["explode"]
            },
            "dimensions": [app.view.width - 30, Math.random() * (app.view.height - 45) + 20, 60, 60] //TODO: Make the dimensions scalable
        });
        return newEnemy;
    };

    createBullet = ({ rect: { x, y, width }, name }) => {
        const bulletParams = (name === "player")
            ? { X: x + 90, speed: 8 }
            : { X: x - 40, speed: - 8 }; //TODO: Make the dimensions scalable
        const newBullet = new Bullet({
            "name": "bullet",
            "health": 1,
            "owner": name,
            "behaviours": ["move"],
            "hitGroup": ["bullet"],
            "speed": [bulletParams.speed, 0],
            "colides": {
                "enemy": ["explode"],
                "player": ["explode"]
            },
            "dimensions": [bulletParams.X, y, 30, 10] //TODO: Make the dimensions scalable
        });
        return newBullet;
    };

    createObstacle = () => {
        const newObstacle = new Obstacle({
            "name": "obstacle",
            "behaviours": ["move"],
            "hitGroup": ["obstacle"],
            "speed": [-2, 0],
            "dimensions": [app.view.width, app.view.height - 5, Math.random() * 150, Math.random() * 150] //TODO: Make the dimensions scalable
            // "dimensions": [250 , 250, 60, 60] //TODO: Make the dimensions scalable
        });
        return newObstacle;
    };

};