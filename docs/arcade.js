function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $6f55ef631e4e838b$export$2e2bcd8739ae039);
// import { Arcade } from './arcade/arcade'
// export class Game {
//     #arcade;
//     #joystickListener;
//     constructor() {
//         // this = current game
//         // true = multiplayer
//         // true = debug
//         this.#arcade = new Arcade(this, true, true)
//         // The game must wait for de joysticks to connect
//         console.log("waiting for joysticks to connect")
//         this.#joystickListener = (e) => this.#joyStickFound(e)
//         document.addEventListener("joystickcreated",  this.#joystickListener)
//     }
//     #joyStickFound(e) {
//         let joystick = this.#arcade.Joysticks[e.detail]
//         // debug, this shows you the names of the buttons when they are pressed
//         for (const buttonEvent of joystick.ButtonEvents) {
//             document.addEventListener(buttonEvent, () => console.log(buttonEvent))
//         }
//         this.update();
//     }
//     update() {
//         for (let joystick of this.#arcade.Joysticks) {
//             joystick.update()
//         }
//         requestAnimationFrame(() => this.update());
//     }
//     disconnect() {
//         document.removeEventListener("joystickcreated", this.#joystickListener)
//     }
// }
// new Game()



//#region Template
const $92feafab5ff31739$var$template = document.createElement("template");
$92feafab5ff31739$var$template.innerHTML = `
<style>
:host {
    position:           absolute;
    top:                10px;
    right:              10px;
}
root {
    top:                10px;
    right:              10px;
    width:              289px; 
    height:             120px;
    display:            block;
    background-color:   #75a8f77a;
}
root * {
    position:           relative;
}
.button-wrapper, .axes-wrapper {
    display:            flex;
    flex-wrap:          wrap;
    float:              left;
}
root .button-div {
    border: solid 1px black;
    width:              60px;
    margin:             5px;
    padding:            5px;
}
.button-wrapper {
    width:              164px;
}
.axes-wrapper {
    width:              115px;
    margin:             5px;
}
.axes-cell {
    width:              25px;  
    height:             25px; 
    margin:             5px;  
    border:             solid 1px transparent;
}
.axes-cell.direction {
    border:             solid 1px black;
}
.axes-cell.center{
    border:             solid 1px black;
    background-color:   blue;
}
.axes-cell.active{
    background-color:   red;
}
.identifier{
    position:           absolute;
    top:                5px;
    left:               5px;
    width:              auto;
    font-weight:        bold;
    color:              #fff;
}
</style>`;
class $92feafab5ff31739$export$aa8b56e5f619ede7 extends HTMLElement {
    #panelHeight = 120;
    #panelSpacing = 10;
    #joystick;
    #numberOfButtons;
    #buttonDivs = [];
    #left;
    #right;
    #up;
    #down;
    #rootElement;
    Axes = [];
    constructor(joystick, numOfButtons){
        super();
        this.#joystick = joystick;
        this.#numberOfButtons = numOfButtons;
        let spaceFromTop = this.#panelSpacing + this.#joystick.JoystickNumber * (this.#panelHeight + this.#panelSpacing);
        this.style.top = spaceFromTop + "px";
        this.#rootElement = document.createElement("root");
        this.#rootElement.style.height = this.#panelHeight + "px";
        $92feafab5ff31739$var$template.appendChild(this.#rootElement);
        // identifier
        let identifier = document.createElement("div");
        identifier.classList.add("identifier");
        identifier.innerHTML = "#" + this.#joystick.JoystickNumber;
        this.#rootElement.appendChild(identifier);
        // axes
        this.#createHTMLForAxes();
        // this.buttons = buttons
        this.#createHTMLForButtons();
        this.#createListenersForButtons();
        this.attachShadow({
            mode: "open"
        });
        if (this.shadowRoot) {
            let temp = $92feafab5ff31739$var$template.content.cloneNode(true);
            temp.appendChild(this.#rootElement);
            this.shadowRoot.appendChild(temp);
        }
        document.body.appendChild(this);
    }
    #createListenersForButtons() {
        for(let i = 0; i < this.#numberOfButtons; i++)document.addEventListener(this.#joystick.ButtonEvents[i], (e)=>this.#handleButtonClicks(e, i));
    }
    #handleButtonClicks(event, index) {
        this.#buttonDivs[index].style.filter = "hue-rotate(" + Math.random() * 360 + "deg)";
    }
    #createHTMLForButtons() {
        let buttonWrapper = document.createElement("div");
        buttonWrapper.className = "button-wrapper";
        for(let index = 0; index < this.#numberOfButtons; index++){
            let buttonDiv = document.createElement("div");
            buttonDiv.className = "button-div";
            buttonWrapper.appendChild(buttonDiv);
            buttonDiv.style.backgroundColor = "blue";
            buttonDiv.innerHTML = "Button " + (index + 1);
            this.#buttonDivs.push(buttonDiv);
        }
        this.#rootElement.appendChild(buttonWrapper);
    }
    #createHTMLForAxes() {
        let axesWrapper = document.createElement("div");
        axesWrapper.className = "axes-wrapper";
        for(let i = 1; i <= 9; i++){
            let cell = document.createElement("div");
            cell.className = "axes-cell";
            if (i % 2 == 0) cell.classList.add("direction");
            if (i == 5) cell.classList.add("center");
            axesWrapper.appendChild(cell);
            switch(i){
                case 2:
                    this.#up = cell;
                    break;
                case 4:
                    this.#left = cell;
                    break;
                case 6:
                    this.#right = cell;
                    break;
                case 8:
                    this.#down = cell;
                    break;
            }
        }
        this.#rootElement.appendChild(axesWrapper);
    }
    update() {
        // X-axe
        if (this.Axes[0] == 0) {
            this.#left.classList.remove("active");
            this.#right.classList.remove("active");
        } else {
            if (this.Axes[0] < 0) this.#left.classList.add("active");
            else if (this.Axes[0] > 0) this.#right.classList.add("active");
        }
        // Y-axe
        if (this.Axes[1] == 0) {
            this.#up.classList.remove("active");
            this.#down.classList.remove("active");
        } else {
            if (this.Axes[1] < 0) this.#up.classList.add("active");
            else if (this.Axes[1] > 0) this.#down.classList.add("active");
        }
    }
}
window.customElements.define("debug-panel", $92feafab5ff31739$export$aa8b56e5f619ede7);


class $fed9925aa7e8936d$export$41026bc5091240de {
    #DEBUG = true;
    // BUT1 and BUT2 are the indexes of the redirect function. 
    // When both are pressed, redirect to homepage
    #BUT1 = 8;
    #BUT2 = 9;
    // FIELDS
    #joystickNumber = 0;
    #numberOfBUttons = 0;
    #buttonEvents = [];
    #axes = [];
    #gamepad;
    #previousGamepad;
    #previousJoystickDirection;
    // #debugPanell //DebugPanel
    // PROPERTIES
    // Axes as booleans
    get Left() {
        return this.#axes[0] == -1;
    }
    get Right() {
        return this.#axes[0] == 1;
    }
    get Up() {
        return this.#axes[1] == -1;
    }
    get Down() {
        return this.#axes[1] == 1;
    }
    get Neutral() {
        return this.#axes[0] == 0 && this.#axes[1] == 0;
    }
    // Axes as direction
    // values are -1, 0, 1 because arcade sticks are digital
    get Y() {
        return Math.round(this.#axes[1]);
    }
    get X() {
        return Math.round(this.#axes[0]);
    }
    // Joystick identifier
    get JoystickNumber() {
        return this.#joystickNumber;
    }
    get ButtonEvents() {
        return this.#buttonEvents;
    }
    // Current gamepad
    get Gamepad() {
        return this.#gamepad;
    }
    set Gamepad(gamepad) {
        this.#gamepad = gamepad;
    }
    // previous gamepad
    get PreviousGamepad() {
        return this.#previousGamepad;
    }
    set PreviousGamepad(previousGamepad) {
        this.#previousGamepad = previousGamepad;
    }
    /**
     * Creates a joystick object for one player
     * @param joystickNumber The number of the first joystick (starts at 0)
     * @param numOfButtons The number of buttons needed by your game
     * @param debug true for in browser gamepad info
     */ constructor(joystickNumber, numOfButtons, debug){
        this.#joystickNumber = joystickNumber;
        this.#numberOfBUttons = numOfButtons;
        this.#DEBUG = debug;
        for(let i = 0; i < this.#numberOfBUttons; i++)this.#buttonEvents.push("joystick" + this.JoystickNumber + "button" + i);
        this.#buttonEvents.push("joystick" + this.JoystickNumber + "neutral");
        this.#buttonEvents.push("joystick" + this.JoystickNumber + "left");
        this.#buttonEvents.push("joystick" + this.JoystickNumber + "right");
        this.#buttonEvents.push("joystick" + this.JoystickNumber + "up");
        this.#buttonEvents.push("joystick" + this.JoystickNumber + "down");
        this.#previousJoystickDirection = "neutral";
        if (this.#DEBUG) this.debugPanel = new (0, $92feafab5ff31739$export$aa8b56e5f619ede7)(this, this.#numberOfBUttons);
    }
    update() {
        if (typeof this.#gamepad === "undefined" || typeof this.#gamepad.index === "undefined" || typeof navigator.getGamepads()[this.#gamepad.index] === "undefined") return;
        let gamepad = navigator.getGamepads()[this.#gamepad.index];
        if (gamepad) this.#readGamepad(gamepad);
    }
    #readGamepad(gamepad) {
        for(let index = 0; index < this.#numberOfBUttons; index++){
            if (this.#buttonPressed(gamepad.buttons[index]) && !this.#buttonPressed(this.#previousGamepad.buttons[index])) document.dispatchEvent(new Event(this.#buttonEvents[index]));
            if (this.#buttonPressed(gamepad.buttons[this.#BUT1]) && this.#buttonPressed(gamepad.buttons[this.#BUT2]) && (!this.#buttonPressed(this.#previousGamepad.buttons[this.#BUT1]) || !this.#buttonPressed(this.#previousGamepad.buttons[this.#BUT2]))) document.dispatchEvent(new Event("redirect"));
        }
        // gamepad has 4 axes, first is x, second is y
        // an axe returns a float, only int is needed
        this.#axes[0] = Math.round(gamepad.axes[0]);
        this.#axes[1] = Math.round(gamepad.axes[1]);
        if (this.#DEBUG) {
            // update the axes (x and y)
            this.debugPanel.Axes[0] = this.#axes[0];
            this.debugPanel.Axes[1] = this.#axes[1];
            this.debugPanel.update();
        }
        if (this.Left && this.#previousJoystickDirection !== "left") {
            this.#previousJoystickDirection = "left";
            document.dispatchEvent(new Event("joystick" + this.JoystickNumber + "left"));
        }
        if (this.Right && this.#previousJoystickDirection !== "right") {
            this.#previousJoystickDirection = "right";
            document.dispatchEvent(new Event("joystick" + this.JoystickNumber + "right"));
        }
        if (this.Up && this.#previousJoystickDirection !== "up") {
            this.#previousJoystickDirection = "up";
            document.dispatchEvent(new Event("joystick" + this.JoystickNumber + "up"));
        }
        if (this.Down && this.#previousJoystickDirection !== "down") {
            this.#previousJoystickDirection = "down";
            document.dispatchEvent(new Event("joystick" + this.JoystickNumber + "down"));
        }
        if (this.Neutral && this.#previousJoystickDirection !== "neutral") {
            this.#previousJoystickDirection = "neutral";
            document.dispatchEvent(new Event("joystick" + this.JoystickNumber + "neutral"));
        }
        // console.log(this.#previousJoystickDirection);
        this.#previousGamepad = gamepad;
    }
    /**
     * Helper function to filter some bad input
     * @param b 
     */ #buttonPressed(b) {
        if (typeof b == "object") return b.pressed;
        return b == 1.0;
    }
    destroy() {
        if (this.#DEBUG) this.debugPanel.remove();
    }
}


class $6f55ef631e4e838b$export$2e2bcd8739ae039 {
    #DEBUG;
    #joysticks;
    #REDIRECT_URL = "http://hr-cmgt.github.io/arcade-server";
    #multiplayer = false;
    #game;
    // PROPERTIES
    get Joysticks() {
        return this.#joysticks;
    }
    /**
     * Creates an arcade 'cabinet' 
     * @param mp 'true' for 2 joystick multiplayer Arcade (default single player)
     */ constructor(game, mp = false, debug = false){
        this.#game = game;
        this.#multiplayer = mp;
        this.#DEBUG = debug;
        this.#joysticks = [];
        if (this.#DEBUG) this.#showStatus("Gamepad is NOT connected. Press a button to connect");
        document.addEventListener("redirect", ()=>this.#onRedirect());
        window.addEventListener("gamepadconnected", (e)=>this.#onGamePadConnected(e));
        window.addEventListener("gamepaddisconnected", (e)=>this.#onGamePadDisconnected(e));
    }
    /**
     * Handles redirect fired from joystick
     */ #onRedirect() {
        if (this.#DEBUG) console.log("redirect!!");
        window.location.href = this.#REDIRECT_URL;
    }
    /**
     * Handles connecting a joystick
     * @param e Gamepad event
     */ #onGamePadConnected(e) {
        if (this.#DEBUG) {
            console.log("Game pad connected");
            console.log("Joystick number: " + e.gamepad.index);
        }
        if (!this.#multiplayer && this.#joysticks.length == 0 || this.#multiplayer) {
            let joystick = this.createAndAddJoystick(e.gamepad.index, 6);
            joystick.PreviousGamepad = joystick.Gamepad;
            joystick.Gamepad = e.gamepad;
            if (joystick.PreviousGamepad == null) joystick.PreviousGamepad = e.gamepad;
        }
        if (this.#DEBUG) this.#removeStatus();
    }
    /**
     * Handles disconnecting a joystick
     * @param e Gamepad event
     */ #onGamePadDisconnected(e1) {
        if (this.#DEBUG) console.log("Game pad disconnected");
        if (this.#DEBUG) this.#showStatus("Gamepad is NOT connected. Connect the gamepad and press a button.");
        this.removeJoystick(e1.gamepad.index);
        this.#game.disconnect();
    }
    /**
     * Creates an Joystick and adds it to this arcade
     * @param joystickNumber Unique identifier given by the joystick
     * @param numOfButtons Sets number of buttons on joystick
     */ createAndAddJoystick(joystickNumber, numOfButtons) {
        let joystickCheck = this.getJoystickByNumber(joystickNumber);
        if (joystickCheck != null) return joystickCheck;
        let joystickNew = new (0, $fed9925aa7e8936d$export$41026bc5091240de)(joystickNumber, numOfButtons, this.#DEBUG);
        this.#joysticks[joystickNumber] = joystickNew;
        if (joystickNew) {
            document.dispatchEvent(new CustomEvent("joystickcreated", {
                detail: joystickNumber
            }));
            console.log("joystick created");
        }
        return joystickNew;
    }
    /**
     * Removes a Joystick from this arcade
     * @param joystickNumber Unique identifier of the joystick
     */ removeJoystick(joystickNumber) {
        let joystickCheck = this.getJoystickByNumber(joystickNumber);
        if (joystickCheck == null) return;
        var index = this.#joysticks.indexOf(joystickCheck);
        if (typeof this.#joysticks[index].destroy === "function") this.#joysticks[index].destroy();
        if (index > -1) this.#joysticks.splice(index, 1);
    }
    /**
     * Get a Joystick with its unique identifier
     * @param joystickNumber Unique identifier given by the joystick
     */ getJoystickByNumber(joystickNumber) {
        for (let joystick of this.#joysticks){
            if (joystick.JoystickNumber == joystickNumber) return joystick;
        }
        return null;
    }
    #showStatus(content) {
        let container;
        let p;
        if (!(container = document.getElementsByTagName("status")[0])) {
            container = document.createElement("status");
            document.body.append(container);
        }
        if (container) {
            if (!(p = container.getElementsByTagName("p")[0])) {
                p = document.createElement("p");
                container.appendChild(p);
            }
        }
        if (p) p.innerHTML = content;
    }
    #removeStatus() {
        let status;
        if (status = document.getElementsByTagName("status")[0]) status.remove();
    }
}


//# sourceMappingURL=arcade.js.map
