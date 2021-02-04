import GameElement from "../GameElement";

export default class Obstacle extends GameElement {
    constructor(props) {
        super(props);
        this.state = "stateless";
    };
};