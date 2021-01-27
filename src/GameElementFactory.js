import scene from './scene.json';
import Rectangle from './Rectangle';
import { getIndex, binaryReprezentation, defaultGameElement } from "./utils";

export default class GameElementFactory {
    constructor(gameElements) {
        this.gameElements = gameElements;
        this.init();
    };

    init = () => {
        scene.elements.forEach(({
            dimentions,
            speed = [],
            hitGroup = [],
            colides = [],
            ...rest
        }, index) => {
            let rect = new Rectangle(...dimentions);

            hitGroup = hitGroup.reduce((a, e) =>
                a | binaryReprezentation[e]
                , 0);

            let { colide, colideMap } = Object.entries(colides)
                .reduce(({ colide, colideMap }, [key, value]) => ({
                    colide: colide | binaryReprezentation[key],
                    colideMap: {
                        ...colideMap,
                        [binaryReprezentation[key]]: value
                    }

                })
                    , { colide: 0, colideMap: {} })

            this.gameElements.push({
                ...defaultGameElement,
                ...rest,
                id: index,
                rect,
                speed: { x: speed[0] || 0, y: speed[1] || 0 },
                colideMap,
                hitGroup,
                colides: colide,
            });
        });
    };
};