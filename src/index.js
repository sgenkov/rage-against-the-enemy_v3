import registerServiceWorker from './registerServiceWorker';

import { Application } from 'pixi.js';


export const app = new Application({
    width: 500,
    height: 300,
    backgroundColor: 0xDDDDDD,
});

document.body.appendChild(app.view);



registerServiceWorker();

