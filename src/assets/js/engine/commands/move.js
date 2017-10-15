const KEY_ARROW_UP = 38;
const KEY_ARROW_DOWN = 40;
const KEY_ARROW_LEFT = 37;
const KEY_ARROW_RIGHT = 39;
const KEY_SHIFT = 16;

document.onkeydown = (e) => {

    switch (e.keyCode) {
        case KEY_ARROW_UP:
            console.log("Press up");
            break;
        case KEY_ARROW_DOWN:
            console.log("Press down");
            break;
        case KEY_ARROW_RIGHT:
            console.log("Press right");
            break;
        case KEY_ARROW_LEFT:
            console.log("Press left");
            break;
        case KEY_SHIFT:
            console.log("Press shift");
            break;
    }
}

document.onkeyup = (e) => {
    switch (e.keyCode) {
        case KEY_SHIFT:
            console.log(e);
            break;
    }
}