import scene from './scene.json';

export const onKeyDown = ({ keyCode }, ref) => {
    // console.log('Key Down', keyCode);
    let { keyBindings } = scene;
    let {
      behaviours,
    } = ref;
    ref.gameElements.forEach(el => {
      el.behaviours.forEach(b => {
        if (keyBindings[b] && keyBindings[b][keyCode]) {
          keyBindings[b][keyCode].forEach(bb => {
            behaviours[bb](el)
          })
        }
      })
    })
  };

export const onKeyUp = ({ keyCode }, ref) => {
    // console.log("Key Up", keyCode);
    let { keyBindings } = scene;
    ref.gameElements.forEach(el => {
      el.behaviours.forEach(b => {
        if (keyBindings[b] && keyBindings[b][keyCode]) {
          el.behaviours.push("stop");
        }
      })
    })
  };