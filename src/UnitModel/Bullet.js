import GameElement from "../GameElement";

export default class Bullet extends GameElement {
    constructor(props) {
        super(props);
        console.log('Bullet Created');
        
        // {
        //     "name": "enemy",
        //     "type": "yellow",
        //     "behaviours":["move", "moveLeft"],
        //     "hitGroup":["enemy"],
        //     "speed":[0,0],
        //     "colides":{
        //         "playerBullet":["break"]
        //     },
        //     "dimensions": [200, 200, 20, 20]
        // },
    };
};