import "pixi.js"
import * as KeyboardJS from "keyboardjs"

const GAME_WIDTH = 800;
const GAME_HEIGHT = 450;
const app = new PIXI.Application(GAME_WIDTH, GAME_HEIGHT);
app.renderer.backgroundColor = 0x000066;

const appElem = document.getElementById("app");
appElem.appendChild(app.view);

let assetPath = process.env.ASSET_PATH ? process.env.ASSET_PATH : "";

const FixRot = Math.PI * 0.5;
const DeathZone = 50;
const HitRange = 30;
const PunchRange = 150;

PIXI.loader
    .add("turtle", `${assetPath}/assets/img/kame.png`)
    .add("marimo", `${assetPath}/assets/img/mariball.png`)
    .add("punch", `${assetPath}/assets/img/punch.png`)
    .add("punchLong", `${assetPath}/assets/img/punchLong.png`)
    .load(function(loader, resources) {

        const punch = new PIXI.Sprite(resources.punch.texture);
        punch.anchor.x = 0.5;
        punch.anchor.y = 0.75;

        const punchLong = new PIXI.Sprite(resources.punchLong.texture);
        punchLong.anchor.x = 0.5;
        punchLong.anchor.y = 0.93;
        punchLong.visible = false;

        const turtle = new PIXI.Sprite(resources.turtle.texture);
        turtle.x = app.renderer.width * 0.85;
        turtle.y = app.renderer.height / 2;
        turtle.rotation = Math.PI * -0.5;
        turtle.anchor.x = 0.5;
        turtle.anchor.y = 0.5;
        turtle.addChild(punch);
        turtle.addChild(punchLong);

        const marimo = new PIXI.Sprite(resources.marimo.texture);
        marimo.anchor.x = 0.5
        marimo.anchor.y = 0.5

        const poison = new PIXI.Graphics();
        poison.beginFill(0x8800FF);
        poison.drawCircle(0, 0, DeathZone);
        poison.endFill();
        poison.x = (app.renderer.width / 4) * Math.random() + (poison.width / 2);
        poison.y = app.renderer.height * Math.random();
        poison.addChild(marimo);

        app.stage.addChild(poison);
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
                IsDestroy(marimo, turtle, punchLong)
            ) {
                ShowWin();
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

        function IsDead(Poison, Turtle) {
            let diffX = Turtle.position.x - Poison.position.x;
            let diffY = Turtle.position.y - Poison.position.y;
            let diff = (diffX * diffX) + (diffY * diffY);
            return (DeathZone * DeathZone) > diff;
        }

        // @todo
        // Destroy if punch point walk through the moss ball point.
        // Fix rotation bug.
        function IsDestroy(M, T, P) {
            let OT = T.getGlobalPosition();
            let OMGlobal = M.getGlobalPosition();
            let OM = {
                x: OMGlobal.x,
                y: OMGlobal.y
            };

            let rot = P.rotation;
            let originalRot = -Math.PI + P.rotation;
            let OP = {
                x: OT.x + Math.cos(originalRot) * PunchRange,
                y: OT.y + Math.sin(originalRot) * PunchRange
            };
            console.log("OM: ", OM);
            console.log("OP: ", OP);

            let MP = {
                x: OP.x - OM.x,
                y: OP.y - OM.y
            };
            console.log("MP: ", MP)

            let AbsMP = Math.sqrt( (MP.x * MP.x) + (MP.y * MP.y) );
            console.log("Length MP: ", AbsMP);

            return HitRange >= AbsMP;
        }

        KeyboardJS.bind("up", function(e) {
            turtle.position.x += 5 * Math.cos( (turtle.rotation - FixRot) );
            turtle.position.y += 5 * Math.sin( (turtle.rotation - FixRot) );
            if (
                IsDead(poison, turtle)
            ) {
                console.log("Hit!!!");
                ShowGameOver();
            }
        });
        KeyboardJS.bind("down", function(e) {
            turtle.position.x -= 5 * Math.cos( (turtle.rotation - FixRot) );
            turtle.position.y -= 5 * Math.sin( (turtle.rotation - FixRot) );

            if (
                IsDead(poison, turtle)
            ) {
                ShowGameOver();
            }
        });

        let hasHit = false;
        function ShowWin() {
            const message = new PIXI.Text("You Win!", {
                fontFamily: "Arial",
                fontSize: 32,
                fill: "white"
            });
            message.position.x = (app.renderer.width / 2) - (message.width / 2);
            message.position.y = (app.renderer.height / 2) - (message.height / 2);
            if (!hasHit) {
                app.stage.addChild(message);
                app.stage.removeChild(poison);
            }
            hasHit = true;
        }
        
        let hasDead = false;
        function ShowGameOver() {
            const message = new PIXI.Text("Game Over", {
                fontFamily: "Arial",
                fontSize: 32,
                fill: "white"
            });
            message.position.x = (app.renderer.width / 2) - (message.width / 2);
            message.position.y = (app.renderer.height / 2) - (message.height / 2);
            if (!hasDead) {
                app.stage.addChild(message);
                app.stage.removeChild(turtle);
            }
            hasDead = true;
        }
    });