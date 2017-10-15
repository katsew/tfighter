import {debug} from "debug"
const log = debug("core:*");

import {TFighter} from "./engine/core/tfighter";
console.log(new TFighter);

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
log("Hello, world");