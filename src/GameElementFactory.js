import Enemy from './UnitModel/Enemy';
import Player from './UnitModel/Player';
import Bullet from './UnitModel/Bullet';
import Obstacle from './UnitModel/Obstacle';
import Model from './Model';
import Rectangle from './Rectangle';
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

    getUnit = (type, el) => {
        const foundElement = Model.freeGameElements.find(freeEl => freeEl.name === type);
        console.log('foundEl : ', foundElement);

        if (foundElement) {
            Model.freeGameElements.filter(EL => EL !== foundElement);
            if (el) {

            } else {




                foundElement.rect = new Rectangle(app.view.width - 30, Math.random() * (app.view.height - 45) + 20, 92.5, 54.5);






                foundElement.speed = { x: -2, y: 0 };
            };

            return foundElement;
        } else {
            return this.createUnit(type, el);
        };
    };
    // if (false && foundElement) {
    //     const bulletParams = (el && el.name === "player") //TODO: Make method for this operation
    //         ? { X: el.rect.x + 99, speed: 8 }
    //         : { X: el.rect.x - 99, speed: - 8 }; //TODO: Make the dimensions scalable
    //     // this.rect = new Rectangle(...dimensions);
    //     // foundElement.rect = (foundElement.name === "enemy")
    //     foundElement.rect = (!el)
    // ? {
    //     height: 45.5,
    //     width: 92.5,
    //     x: app.view.width - 30,
    //     y: Math.random() * (app.view.height - 45) + 20
    // }
    //         : {
    //             height: 10,
    //             width: 20,
    //             x: bulletParams.X,
    //             y: el.rect.y + 29
    //         }

    //     foundElement.speed = { x: 15, y: 0 }
    //     return foundElement;
    // };

    createUnit = (type, el) => {

        return this.unitMap.get(type)(el);
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
                "bullet": ["break"],
                "obstacle": ["explode"]
            },
            "dimensions": [49, app.view.height / 2, 92.5, 45.5] //TODO: Make the dimensions scalable
        });

        return newPlayer;
    };

    createEnemy = () => {
        const newEnemy = new Enemy({
            "name": "enemy",
            "behaviours": ["move"],
            "hitGroup": ["enemy"],
            "speed": [-2, 0],
            "colides": {
                "bullet": ["break"],
                "player": ["explode"]
            },
            "dimensions": [app.view.width - 30, Math.random() * (app.view.height - 45) + 20, 92.5, 45.5] //TODO: Make the dimensions scalable
        });
        console.log('new enemy', newEnemy);
        return newEnemy;
    };

    createBullet = ({ rect: { x, y, width }, name }) => {
        const bulletParams = this.getBulletParams(name, x);

        const newBullet = new Bullet({
            "name": "bullet",
            "owner": name,
            "behaviours": ["move"],
            "hitGroup": ["bullet"],
            "speed": [bulletParams.speed, 0],
            "colides": {
                "enemy": ["explode"],
                "player": ["explode"]
            },
            "dimensions": [bulletParams.X, y + 29, 30, 10] //TODO: Make the dimensions scalable
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
            // "dimensions": [200, 200, 12222, 12222]
        });

        return newObstacle;
    };

    getBulletParams = (name, x) => {
        return (name === "player") //TODO: Make method for this operation
            ? { X: x + 99, speed: 8 }
            : { X: x - 99, speed: - 8 } //TODO: Make the dimensions scalable
    };

};

