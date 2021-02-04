import Rectangle from './Rectangle';
import { getIndex, binaryReprezentation } from "./utils";
import StateMachine from './StateMachine';

export default class GameElement {
    constructor({
        dimensions,
        speed = [],
        hitGroup = [],
        colides = [],
        ...rest
    }) {
        this.state = null;
        this.rect = new Rectangle(...dimensions);
        this.id = getIndex();
        this.speed = { x: speed[0] || 0, y: speed[1] || 0 };
        for (let prop in rest) {
            this[prop] = rest[prop];
        };

        this.hitGroup = hitGroup.reduce((a, e) => //TODO: -> to utils
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
                , { colide: 0, colideMap: {} });             

            this.colides = colide;                             
            this.colideMap = colideMap;                
            
            this.innerStateMachine = new StateMachine({
                strong: {
                  allowedStates: ["weak"],
                  init: () => {
                      this.state = "strong";
                      // this.speed = {x: -3, y: 0}
                  },
                  deInit: () => {
                  },
                },
                weak: {
                  allowedStates: ["falling"],
                  init: () => {
                    this.state = "weak";
                  },
                  deInit: () => {
                  },
                },
                falling: {
                  allowedStates: ["crash"],
                  init: () => {
                    this.state = "falling";
                  },
                  deInit: () => {
                  },
                },
                crash: {
                  init: () => {
                    this.state = "crash";
                  },
                  deInit: () => {
                  },
                }
              },
              "strong");
    };

    testMethod = () => {
        console.log('GameElement testMethod()');
    }
};