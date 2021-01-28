export const commonBehaviours = {
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
      this.gameElements = this.gameElements.filter(ge => ge !== el);
      el.behaviours = el.behaviours.filter(e => e != "hitten");
    },
    "fire": (el) => {
      console.log('FIRE');
    },
    "explode" : (el) => {
      console.log('EXPLODE');
      el.behaviours = el.behaviours.filter(e => e != "explode");
      console.log(el);
    },
    "break" : (el) => {
      console.log('BREAK');
    },
    "debugger" : () => {
      debugger;
    },
  };