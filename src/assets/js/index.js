import "pixi.js"
import * as KeyboardJS from "keyboardjs"

const app = new PIXI.Application();
app.renderer.backgroundColor = 0x000066;
document.body.appendChild(app.view);

const FixRot = Math.PI * 0.5;
const HitRound = 50;
const PunchRange = 150;
PIXI.loader
    .add("turtle", "/assets/img/kame.png")
    .add("marimo", "/assets/img/mariball.png")
    .add("marimoBlue", "/assets/img/mariballBlue.png")
    .add("marimoYellow", "/assets/img/mariballYellow.png")
    .add("marimoPink", "/assets/img/mariballPink.png")
    .add("punch", "/assets/img/punch.png")
    .add("punchLong", "/assets/img/punchLong.png")
    .load(function(loader, resources) {
        const turtle = new PIXI.Sprite(resources.turtle.texture);
        const marimo = new PIXI.Sprite(resources.marimo.texture);
        const marimoBlue = new PIXI.Sprite(resources.marimoBlue.texture);
        marimoBlue.anchor.x = 0.5
        marimoBlue.anchor.y = 0.5
        const marimoPink = new PIXI.Sprite(resources.marimoPink.texture);
        marimoPink.anchor.x = 0.5
        marimoPink.anchor.y = 0.5
        const marimoYellow = new PIXI.Sprite(resources.marimoYellow.texture);
        marimoYellow.anchor.x = 0.5
        marimoYellow.anchor.y = 0.5
        const punch = new PIXI.Sprite(resources.punch.texture);
        punch.anchor.x = 0.5;
        punch.anchor.y = 0.75;

        const punchLong = new PIXI.Sprite(resources.punchLong.texture);
        punchLong.anchor.x = 0.5;
        punchLong.anchor.y = 0.95;
        punchLong.visible = false;

        turtle.x = app.renderer.width * 0.85;
        turtle.y = app.renderer.height / 2;
        turtle.rotation = Math.PI * -0.5;
        turtle.anchor.x = 0.5;
        turtle.anchor.y = 0.5;
        turtle.addChild(punch);
        turtle.addChild(punchLong);

        marimo.anchor.x = 0.5
        marimo.anchor.y = 0.5
        const poison = new PIXI.Graphics();
        poison.beginFill(0x8800FF);
        poison.drawCircle(0, 0, HitRound);
        poison.endFill();
        poison.x = (app.renderer.width / 4) * Math.random() + (poison.width / 2);
        poison.y = app.renderer.height * Math.random();

        const poisonBlue = new PIXI.Graphics();
        poisonBlue.beginFill(0x8800FF);
        poisonBlue.drawCircle(0, 0, HitRound);
        poisonBlue.endFill();
        poisonBlue.x = (app.renderer.width / 4) * Math.random() + (poisonBlue.width / 2);
        poisonBlue.y = app.renderer.height * Math.random();


        const poisonPink = new PIXI.Graphics();
        poisonPink.beginFill(0x8800FF);
        poisonPink.drawCircle(0, 0, HitRound);
        poisonPink.endFill();
        poisonPink.x = (app.renderer.width / 4) * Math.random() + (poisonPink.width / 2);
        poisonPink.y = app.renderer.height * Math.random();

        const poisonYellow = new PIXI.Graphics();
        poisonYellow.beginFill(0x8800FF);
        poisonYellow.drawCircle(0, 0, HitRound);
        poisonYellow.endFill();
        poisonYellow.x = (app.renderer.width / 4) * Math.random() + (poisonYellow.width / 2);
        poisonYellow.y = app.renderer.height * Math.random();

        // poison.addChild(marimo);
        // poisonBlue.addChild(marimoBlue);
        // poisonPink.addChild(marimoPink);
        poisonYellow.addChild(marimoYellow);
        
        // app.stage.addChild(poison, poisonBlue, poisonPink, poisonYellow);
        app.stage.addChild(poisonYellow);
        app.stage.addChild(turtle);
        

        KeyboardJS.bind("shift + left", function(e) {
            punch.rotation -= 0.05;
            punchLong.rotation -= 0.05;
        });
        KeyboardJS.bind("shift + right", function(e) {
            punch.rotation += 0.05;
            punchLong.rotation += 0.05;
        });

        KeyboardJS.bind("space", function(e) {
            e.preventRepeat();
            punch.visible = false;
            punchLong.visible = true;
            if (
                // IsDestroy(marimo, punch) ||
                // IsDestroy(marimoBlue, punch) ||
                // IsDestroy(marimoPink, punch) ||
                IsDestroy(marimoYellow, turtle, punch)
            ) {
                console.log("Destroy!!!");
            }
            setTimeout(function() {
                punch.visible = true;
                punchLong.visible = false;
            }, 600);
        }, function(e) {
            // noop
        });

        KeyboardJS.bind("left", function(e) {
            turtle.rotation -= 0.05;
        });
        KeyboardJS.bind("right", function(e) {
            turtle.rotation += 0.05;
        });

        function IsHit(M, T) {
            let diffX = T.position.x - M.position.x;
            let diffY = T.position.y - M.position.y;
            let diff = (diffX * diffX) + (diffY * diffY);
            return (HitRound * HitRound) > diff;
        }

        function IsDestroy(M, K, P) {
            let diffX = (Math.cos(P.rotation) * PunchRange);
            let diffY = (Math.sin(P.rotation) * PunchRange);
            let diff = (diffX * diffX) + (diffY * diffY);

            console.log("MarimoPos: ", M.getGlobalPosition());
            console.log("PunchPos: ", P.getGlobalPosition());
            console.log("KamePos: ", K.getGlobalPosition());

            let mRound  = M.width / 2;
            console.log(mRound * mRound, diff);
            return (mRound * mRound) > (diff - PunchRange);
        }

        KeyboardJS.bind("up", function(e) {
            turtle.position.x += 5 * Math.cos( (turtle.rotation - FixRot) );
            turtle.position.y += 5 * Math.sin( (turtle.rotation - FixRot) );
            if (
                IsHit(poison, turtle) ||
                IsHit(poisonPink, turtle) ||
                IsHit(poisonBlue, turtle) ||
                IsHit(poisonYellow, turtle)
            ) {
                console.log("Hit!!!");
                ShowHit();
            }
        });
        KeyboardJS.bind("down", function(e) {
            turtle.position.x -= 5 * Math.cos( (turtle.rotation - FixRot) );
            turtle.position.y -= 5 * Math.sin( (turtle.rotation - FixRot) );

            if (
                // IsHit(poison, turtle) ||
                // IsHit(poisonPink, turtle) ||
                // IsHit(poisonBlue, turtle) ||
                IsHit(poisonYellow, turtle)
            ) {
                ShowHit();
            }
        });
        
        let hasHit = false;
        function ShowHit() {
            const message = new PIXI.Text("Game Over", {
                fontFamily: "Arial",
                fontSize: 32,
                fill: "white"
            });
            message.position.x = (app.renderer.width / 2) - (message.width / 2);
            message.position.y = (app.renderer.height / 2) - (message.height / 2);
            if (!hasHit) {
                app.stage.addChild(message);
                app.stage.removeChild(turtle);
            }
            hasHit = true;
        }
    });