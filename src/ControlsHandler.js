import scene from './scene.json';
import { gameElements } from './utils';

export const onKeyDown = ({ keyCode }, behaviours) => {
    // console.log('Key Down', keyCode);
    let { keyBindings } = scene;
    gameElements.forEach(el => {
      el.behaviours.forEach(b => {
        if (keyBindings[b] && keyBindings[b][keyCode]) {
          keyBindings[b][keyCode].forEach(bb => {
            behaviours[bb](el)
          })
        }
      })
    })
  };

export const onKeyUp = ({ keyCode }) => {
    // console.log("Key Up", keyCode);
    let { keyBindings } = scene;
    gameElements.forEach(el => {
      el.behaviours.forEach(b => {
        if (keyBindings[b] && keyBindings[b][keyCode] && (keyCode !== 32)) {
          el.behaviours.push("stop");
        }
      })
    })
  };