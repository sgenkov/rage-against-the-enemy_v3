
// export default {
    // gameElements: [],
// }

class Model extends EventTarget{
    constructor() {
        super();
        this.gameElements = [];
    }

}

export default new Model();