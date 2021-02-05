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
    this.logging = false; //* delete this later
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
          this.logging && console.log(this.state);
        },
        deInit: () => {
        },
      },
      weak: {
        allowedStates: ["veryWeak"],
        init: () => {
          this.state = "weak";
          this.logging && console.log(this.state);
          this.behaviours.push("hitten");
        },
        deInit: () => {
        },
      },
      veryWeak: {
        allowedStates: ["falling"],
        init: () => {
          this.state = "veryWeak";
          this.logging && console.log(this.state);
          this.behaviours.push("hitten");
        },
        deInit: () => {
        },
      },
      falling: {
        allowedStates: ["crash"],
        init: () => {
          this.state = "falling";
          this.logging && console.log(this.state);
          this.behaviours.push("hitten");
        },
        deInit: () => {
          console.log('========DEINIT');
        },
      },
      crash: {
        init: () => {
          this.state = "crash";
          this.logging && console.log('----------',this.state);
          this.behaviours.push("hitten");
        },
        deInit: () => {
        },
      }
    },
      "strong");

      // console.log('rect', this.rect);
  };

  reset = () => {

  };  
};