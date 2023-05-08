import { Arcade } from './arcade/arcade'

export class Game {
    #arcade;
    #joystickListener;

    constructor() {
        // this = current game
        // true = multiplayer
        // true = debug
        this.#arcade = new Arcade(this, true, true)
        
        // The game must wait for de joysticks to connect
        console.log("waiting for joysticks to connect")
        this.#joystickListener = (e) => this.#joyStickFound(e)
        document.addEventListener("joystickcreated",  this.#joystickListener)
    }

    #joyStickFound(e) {
        let joystick = this.#arcade.Joysticks[e.detail]
        
        // debug, this shows you the names of the buttons when they are pressed
        for (const buttonEvent of joystick.ButtonEvents) {
            document.addEventListener(buttonEvent, () => console.log(buttonEvent))
        }

        this.update();
    }

    update() {
        for (let joystick of this.#arcade.Joysticks) {
            joystick.update()
        }

        requestAnimationFrame(() => this.update());
    }

    disconnect() {
        document.removeEventListener("joystickcreated", this.#joystickListener)
    }
}

new Game()