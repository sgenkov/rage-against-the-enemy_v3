export const commonBehaviours = {
    "move": (el) => {
      el.rect.x += el.speed.x;
      el.rect.y += el.speed.y;
    },
    "moveUp": (el) => {
      el.speed.y = -5;
    },
    "moveDown": (el) => {
      el.speed.y = 5;
    },
    "moveLeft": (el) => {
      el.speed.x = -5;
    },
    "moveRight": (el) => {
      el.speed.x = 5;
    },
    "stop": (el) => {
      el.speed.x = 0;
      el.speed.y = 0;
      el.behaviours = el.behaviours.filter(e => e != "stop");
    },
    "score": (el) => {
      el.name === "brick" && ++this.playerScore && el.behaviours.push("hitten");
      if (el.name === "wall4") {
        console.log(`player score: ${this.playerScore}`);
        console.log("Game Over");
      };
    },
    "hitten": (el) => {
      this.gameElements = this.gameElements.filter(ge => ge !== el);
      el.behaviours = el.behaviours.filter(e => e != "hitten");
    },
    "fire": (el) => {
      console.log('FIRE');
    }
  };