
export default class CommonBehaviours {
  constructor(gameElements, factory) {
    this.gameElements = gameElements;
    this.factory = factory;

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
        el.behaviours = el.behaviours.filter(e => e != "hitten");
      },
      "fire": (el) => { 
        // console.log('FIRE');
        this.factory.createBullet(el);
      },
      "explode": (el) => { 
        console.log('EXPLODE');
        // const foundIndex = this.gameElements.indexOf(el);
        const foundIndex = this.gameElements.findIndex(i => i === el);
        this.gameElements.splice(foundIndex, 1); //* Maybe this method of filtering causes a slight freezeng during colision
        el.behaviours = el.behaviours.filter(e => e != "explode");
      },
      "break": (el) => {
        console.log('BREAK');
      },
      "debugger": () => {
        debugger;
      },
    };
  }
}