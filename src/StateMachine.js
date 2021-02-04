export default class StateMachine {
    constructor(states, init) {
        this.states = states;
        this.currentState = null;
        this.setState(init);
        // console.log('from StateMachine', this.currentState);
    };

    setState = (state, nextState) => {
        let {
            states,
            currentState,
        } = this;

        this.selected = states[currentState];
        console.log('s', this.selected);
        
        if (
            currentState == null
            || this.selected.allowedStates.some(s => s == state)
        ) {
            this.selected && this.selected.deInit();
            let newState = states[state];
            newState.init();
            this.currentState = state;
        };
    };

    testMeth = () => {
        console.log('innerStateMachine testMeth()');
    }
};