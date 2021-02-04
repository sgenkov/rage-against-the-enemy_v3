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
                  },
                  deInit: () => {
                  },
                },
                weak: {
                  allowedStates: ["miserable"],
                  init: () => {
                    this.state = "weak";
                    this.behaviours.push("hitten");
                  },
                  deInit: () => {
                  },
                },
                miserable: {
                  allowedStates: ["falling"],
                  init: () => {
                    this.state = "miserable";
                    this.behaviours.push("hitten");
                  },
                  deInit: () => {
                  },
                },
                falling: {
                  allowedStates: ["crash"],
                  init: () => {
                    this.state = "falling";
                    this.behaviours.push("hitten");
                  },
                  deInit: () => {
                  },
                },
                crash: {
                  init: () => {
                    this.state = "crash";
                    this.behaviours.push("hitten");
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