const noop = function() {}

export class TFighterBehaviour {
    constructor() {}
}

TFighter.prototype.lastTick = 0;

TFighter.prototype.lastRender = 0;

TFighter.prototype.tickLength = 60;

TFighter.prototype.setInitialState = noop;

TFighter.prototype.update = noop;

TFighter.prototype.render = noop;