
// export default {
    // gameElements: [],
// }

class Model extends EventTarget {
    constructor() {
        super();
        this.gameElements = [];
        this.freeGameElements = [];
    };
};

export default new Model();