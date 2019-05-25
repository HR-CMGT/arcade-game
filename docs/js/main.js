"use strict";
class Circle extends HTMLElement {
    constructor(joystick) {
        super();
        this.speed = 3;
        this.x = 0;
        this.y = 0;
        this.joystick = joystick;
        this.style.backgroundColor = "red";
        this.style.width = "100px";
        this.style.height = "100px";
        this.style.borderRadius = "50px";
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
        document.addEventListener(joystick.ButtonEvents[0], () => this.changeColor());
    }
    changeColor() {
        let color = Math.random() * 360;
        this.style.filter = "hue-rotate(" + color + "deg)";
    }
    update() {
        if (this.joystick.Left)
            this.x -= this.speed;
        if (this.joystick.Right)
            this.x += this.speed;
        if (this.joystick.Up)
            this.y -= this.speed;
        if (this.joystick.Down)
            this.y += this.speed;
        this.draw();
    }
    draw() {
        this.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}
window.customElements.define("circle-component", Circle);
class Game {
    constructor() {
        this.circles = [];
        this.arcade = new Arcade();
        document.addEventListener("joystickcreated", (e) => this.initJoystick(e));
        this.gameLoop();
    }
    initJoystick(e) {
        let joystick = this.arcade.Joysticks[e.detail];
        this.circles.push(new Circle(joystick));
        for (const buttonEvent of joystick.ButtonEvents) {
            document.addEventListener(buttonEvent, () => console.log(buttonEvent));
        }
        document.addEventListener(joystick.ButtonEvents[0], () => this.handleJump());
    }
    handleJump() {
        console.log("Jump");
    }
    gameLoop() {
        for (const circle of this.circles) {
            circle.update();
        }
        for (let joystick of this.arcade.Joysticks) {
            joystick.update();
            if (joystick.Left)
                console.log('LEFT');
            if (joystick.Right)
                console.log('RIGHT');
            if (joystick.Up)
                console.log('UP');
            if (joystick.Down)
                console.log('Down');
        }
        requestAnimationFrame(() => this.gameLoop());
    }
}
window.addEventListener("load", () => new Game());
class Arcade {
    constructor(mp = false) {
        this.DEBUG = true;
        this.REDIRECT_URL = "http://hr-cmgt.github.io/arcade-server";
        this.multiplayer = false;
        this.multiplayer = mp;
        this.joysticks = [];
        document.addEventListener("redirect", () => this.onRedirect());
        window.addEventListener("gamepadconnected", (e) => this.onGamePadConnected(e));
        window.addEventListener("gamepaddisconnected", (e) => this.onGamePadDisconnected(e));
    }
    get Joysticks() { return this.joysticks; }
    onRedirect() {
        if (this.DEBUG) {
            console.log('redirect!!');
        }
        window.location.href = this.REDIRECT_URL;
    }
    onGamePadConnected(e) {
        if (this.DEBUG) {
            console.log('Game pad connected');
            console.log("Joystick number: " + e.gamepad.index);
        }
        if ((!this.multiplayer && this.joysticks.length == 0) || this.multiplayer) {
            let joystick = this.createAndAddJoystick(e.gamepad.index, 6);
            joystick.PreviousGamepad = joystick.Gamepad;
            joystick.Gamepad = e.gamepad;
            if (joystick.PreviousGamepad == null) {
                joystick.PreviousGamepad = e.gamepad;
            }
        }
    }
    onGamePadDisconnected(e) {
        if (this.DEBUG) {
            console.log('Game pad disconnected');
        }
        this.removeJoystick(e.gamepad.index);
    }
    createAndAddJoystick(joystickNumber, numOfButtons) {
        let joystickCheck = this.getJoystickByNumber(joystickNumber);
        if (joystickCheck != null) {
            return joystickCheck;
        }
        let joystickNew = new Joystick(joystickNumber, numOfButtons, this.DEBUG);
        this.joysticks[joystickNumber] = joystickNew;
        if (joystickNew)
            document.dispatchEvent(new CustomEvent("joystickcreated", { detail: joystickNumber }));
        return joystickNew;
    }
    removeJoystick(joystickNumber) {
        let joystickCheck = this.getJoystickByNumber(joystickNumber);
        if (joystickCheck == null) {
            return;
        }
        var index = this.joysticks.indexOf(joystickCheck);
        this.joysticks[index].destroy();
        if (index > -1) {
            this.joysticks.splice(index, 1);
        }
    }
    getJoystickByNumber(joystickNumber) {
        for (let joystick of this.joysticks) {
            if (joystick.JoystickNumber == joystickNumber) {
                return joystick;
            }
        }
        return null;
    }
}
class Joystick {
    constructor(joystickNumber, numOfButtons, debug) {
        this.DEBUG = true;
        this.BUT1 = 8;
        this.BUT2 = 9;
        this.joystickNumber = 0;
        this.numberOfBUttons = 0;
        this.buttonEvents = [];
        this.axes = [];
        this.joystickNumber = joystickNumber;
        this.numberOfBUttons = numOfButtons;
        this.DEBUG = debug;
        for (let i = 0; i < this.numberOfBUttons; i++) {
            this.buttonEvents.push('joystick' + this.JoystickNumber + 'button' + (i));
        }
        if (this.DEBUG) {
            this.debugPanel = new DebugPanel(this, this.numberOfBUttons);
        }
    }
    get Left() { return (this.axes[0] == -1); }
    get Right() { return (this.axes[0] == 1); }
    get Up() { return (this.axes[1] == -1); }
    get Down() { return (this.axes[1] == 1); }
    get Y() { return Math.round(this.axes[1]); }
    get X() { return Math.round(this.axes[0]); }
    get JoystickNumber() { return this.joystickNumber; }
    get ButtonEvents() { return this.buttonEvents; }
    get Gamepad() { return this.gamepad; }
    set Gamepad(gamepad) { this.gamepad = gamepad; }
    get PreviousGamepad() { return this.previousGamepad; }
    set PreviousGamepad(previousGamepad) { this.previousGamepad = previousGamepad; }
    update() {
        let gamepad = navigator.getGamepads()[this.gamepad.index];
        if (gamepad) {
            this.readGamepad(gamepad);
        }
    }
    readGamepad(gamepad) {
        for (let index = 0; index < this.numberOfBUttons; index++) {
            if (this.buttonPressed(gamepad.buttons[index]) && !this.buttonPressed(this.previousGamepad.buttons[index])) {
                document.dispatchEvent(new Event(this.buttonEvents[index]));
            }
            if (this.buttonPressed(gamepad.buttons[this.BUT1]) &&
                this.buttonPressed(gamepad.buttons[this.BUT2]) &&
                (!this.buttonPressed(this.previousGamepad.buttons[this.BUT1]) || !this.buttonPressed(this.previousGamepad.buttons[this.BUT2]))) {
                document.dispatchEvent(new Event('redirect'));
            }
        }
        this.axes[0] = Math.round(gamepad.axes[0]);
        this.axes[1] = Math.round(gamepad.axes[1]);
        if (this.DEBUG) {
            this.debugPanel.Axes[0] = this.axes[0];
            this.debugPanel.Axes[1] = this.axes[1];
            this.debugPanel.update();
        }
        this.previousGamepad = gamepad;
    }
    buttonPressed(b) {
        if (typeof (b) == "object") {
            return b.pressed;
        }
        return b == 1.0;
    }
    destroy() {
        if (this.DEBUG)
            this.debugPanel.remove();
    }
}
const template = document.createElement('template');
template.innerHTML = `
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
class DebugPanel extends HTMLElement {
    constructor(joystick, numOfButtons) {
        super();
        this.panelHeight = 120;
        this.panelSpacing = 10;
        this.buttonDivs = [];
        this.Axes = [];
        this.joystick = joystick;
        this.numberOfButtons = numOfButtons;
        let spaceFromTop = this.panelSpacing + (this.joystick.JoystickNumber * (this.panelHeight + this.panelSpacing));
        this.style.top = spaceFromTop + "px";
        this.rootElement = document.createElement('root');
        this.rootElement.style.height = this.panelHeight + "px";
        template.appendChild(this.rootElement);
        let identifier = document.createElement("div");
        identifier.classList.add('identifier');
        identifier.innerHTML = "#" + this.joystick.JoystickNumber;
        this.rootElement.appendChild(identifier);
        this.createHTMLForAxes();
        this.createHTMLForButtons();
        this.createListenersForButtons();
        this.attachShadow({ mode: 'open' });
        if (this.shadowRoot) {
            let temp = template.content.cloneNode(true);
            temp.appendChild(this.rootElement);
            this.shadowRoot.appendChild(temp);
        }
        document.body.appendChild(this);
    }
    createListenersForButtons() {
        for (let i = 0; i < this.numberOfButtons; i++) {
            document.addEventListener(this.joystick.ButtonEvents[i], (e) => this.handleButtonClicks(e, i));
        }
    }
    handleButtonClicks(event, index) {
        this.buttonDivs[index].style.filter =
            'hue-rotate(' + (Math.random() * 360) + 'deg)';
    }
    createHTMLForButtons() {
        let buttonWrapper = document.createElement("div");
        buttonWrapper.className = "button-wrapper";
        for (let index = 0; index < this.numberOfButtons; index++) {
            let buttonDiv = document.createElement("div");
            buttonDiv.className = "button-div";
            buttonWrapper.appendChild(buttonDiv);
            buttonDiv.style.backgroundColor = "blue";
            buttonDiv.innerHTML = "Button " + (index + 1);
            this.buttonDivs.push(buttonDiv);
        }
        this.rootElement.appendChild(buttonWrapper);
    }
    createHTMLForAxes() {
        let axesWrapper = document.createElement("div");
        axesWrapper.className = "axes-wrapper";
        for (let i = 1; i <= 9; i++) {
            let cell = document.createElement('div');
            cell.className = "axes-cell";
            if (i % 2 == 0)
                cell.classList.add("direction");
            if (i == 5)
                cell.classList.add("center");
            axesWrapper.appendChild(cell);
            switch (i) {
                case 2:
                    this.up = cell;
                    break;
                case 4:
                    this.left = cell;
                    break;
                case 6:
                    this.right = cell;
                    break;
                case 8:
                    this.down = cell;
                    break;
            }
        }
        this.rootElement.appendChild(axesWrapper);
    }
    update() {
        if (this.Axes[0] == 0) {
            this.left.classList.remove("active");
            this.right.classList.remove("active");
        }
        else {
            if (this.Axes[0] < 0)
                this.left.classList.add("active");
            else if (this.Axes[0] > 0)
                this.right.classList.add("active");
        }
        if (this.Axes[1] == 0) {
            this.up.classList.remove("active");
            this.down.classList.remove("active");
        }
        else {
            if (this.Axes[1] < 0)
                this.up.classList.add("active");
            else if (this.Axes[1] > 0)
                this.down.classList.add("active");
        }
    }
}
window.customElements.define("debug-panel", DebugPanel);
//# sourceMappingURL=main.js.map