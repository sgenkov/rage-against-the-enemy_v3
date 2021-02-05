import Model from "./Model";


export default class CommonBehaviours {
  constructor(factory) {
    // this.gameElements = Model.gameElements;
    // this.factory = factory;

    this.commonBehaviours = {
      "move": (el) => {
        el.rect.x += el.speed.x;
        el.rect.y += el.speed.y;
      },
      "moveUp": (el) => {
        el.speed.y = -4;
      },
      "moveDown": (el) => {
        el.speed.y = 4;
      },
      "moveLeft": (el) => {
        el.speed.x = -4;
      },
      "moveRight": (el) => {
        el.speed.x = 4;
      },
      "stop": (el) => {
        el.speed.x = 0;
        el.speed.y = 0;
        el.behaviours = el.behaviours.filter(e => e != "stop");
      },
      "score": (el) => {
        console.log('SCORE');
        el.name === "brick" && ++this.playerScore && el.behaviours.push("hitten");
        if (el.name === "wall4") {
          console.log(`player score: ${this.playerScore}`);
          console.log("Game Over");
        };
      },
      "hitten": (el) => {
        console.log('HITTEN');
        // console.log(el);
        if (el.state !== 'falling') {
          el.speed.x += (el.name === "player") ? -0.5 : 0.5;
          el.behaviours = el.behaviours.filter(e => e != "hitten")
        } else {
          el.speed.y += 0.5;
        }
      },
      "fire": (el) => {
        // console.log('FIRE'); //^ FLOW
        Model.gameElements.push(factory.createUnit("bullet", el));
        el.behaviours = el.behaviours.filter(e => e != "fire");
      },
      "explode": (el) => {
        console.log('EXPLODE');
        Model.gameElements = Model.gameElements.filter(ge => ge !== el);
        el.behaviours = el.behaviours.filter(e => e != "explode");
      },
      "break": (el) => {
        console.log('BREAK');
        el.innerStateMachine.setNextState(null, true);

        if (el.state === "crash") el.behaviours.push("explode");

        el.behaviours = el.behaviours.filter(e => e != "break");
      },
      "debugger": () => {
        debugger;
      },
    };
  }
}