import Rectangle from './Rectangle';
import { getIndex, binaryReprezentation, defaultGameElement } from "./utils";

export default class GameElement {
    constructor({
        dimentions,
        speed = [],
        hitGroup = [],
        colides = [],
        ...rest
    }) {
        // console.log('colides = []', colides);
        this.rect = new Rectangle(...dimentions);
        this.id = getIndex();
        this.speed = { x: speed[0] || 0, y: speed[1] || 0 };
        for (let prop in rest) {
            this[prop] = rest[prop];
        };

        this.hitGroup = hitGroup.reduce((a, e) =>
            a | binaryReprezentation[e]
            , 0);

        let { colide, colideMap } = Object.entries(colides)             // suspicious code here
            .reduce(({ colide, colideMap }, [key, value]) => ({         // suspicious code here
                colide: colide | binaryReprezentation[key],             // suspicious code here
                colideMap: {                                            // suspicious code here
                    ...colideMap,                                       // suspicious code here
                    [binaryReprezentation[key]]: value                  // suspicious code here
                }                                                       // suspicious code here

            })                                                          // suspicious code here
                , { colide: 0, colideMap: {} })                         // suspicious code here

            this.colide = colide;                                       // suspicious code here
            this.colideMap = colideMap;    
            // console.log('colideMap : ', colideMap);                             // suspicious code here

                // this.gameElements.push({
            //     ...defaultGameElement,
            //     ...rest,
            //     colideMap,
            //     colides: colide,
            // });
    };
};