
export const colide = (rect1, rect2) => {
    return (rect1.x < rect2.x + rect2.width
        && rect1.x + rect1.width > rect2.x
        && rect1.y < rect2.y + rect2.height
        && rect1.y + rect1.height > rect2.y)
};

export const binaryReprezentation = [
    "pad",
    "ball",
    "vWall",
    "hWall",
    "brick"
].reduce((map, key, index) => {
    return {
        ...map,
        [key]: 1 << index,
    }
}, {});

export const defaultGameElement = {
    behaviours: [],
};