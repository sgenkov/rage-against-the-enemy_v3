export default class StateMachine {
    constructor(states, init) {
        this.states = states;
        this.currentState = null;
        this.setState(init);
    };

    setState = (state) => {
        let {
            states,
            currentState,
        } = this;

        let selected = states[currentState];
        
        if (
            currentState == null
            || selected.allowedStates.some(s => s == state)
        ) {
            selected && selected.deInit();
            let newState = states[state];
            newState.init();
            this.currentState = state;
        };
    };

    setNextState = () => {
        let {
            states,
            currentState,
        } = this;
        let selected = states[currentState].allowedStates;
        this.setState(selected);
    };

    testMeth = () => {
        console.log('innerStateMachine testMeth()');
    }
};