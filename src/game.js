import * as PIXI from 'pixi.js'
import { Arcade } from './arcade/arcade'
import { Box } from './box'

export class Game {
    #arcade;
    #pixi;
    #joystickListener;
    #box;
    #instructions;

    constructor() {
        this.#pixi = new PIXI.Application({ width: 1440, height: 900, backgroundColor: 0x1099bb })
        document.body.appendChild(this.#pixi.view)

        this.#instructions = new PIXI.Text('Press a button on the controller')
        this.#instructions.x = 10
        this.#instructions.y = 10
        this.#pixi.stage.addChild(this.#instructions)

        // create arcade cabinet with 2 joysticks (with 6 buttons)
        // this.#arcade = new Arcade(this)
        this.#arcade = new Arcade(this, false, true)
        
        // // The game must wait for de joysticks to connect
        console.log("waiting for joysticks to connect")
        this.#joystickListener = (e) => this.#joyStickFound(e)
        document.addEventListener("joystickcreated",  this.#joystickListener)
    }

    #joyStickFound(e) {
        this.#instructions.text = "Move and press x on the controller"
        let joystick = this.#arcade.Joysticks[e.detail]
        
        // debug, this shows you the names of the buttons when they are pressed
        for (const buttonEvent of joystick.ButtonEvents) {
            document.addEventListener(buttonEvent, () => console.log(buttonEvent))
        }

        // pass to a player class
        this.#box = new Box(joystick)
        this.#pixi.stage.addChild(this.#box)

        // alternatively you can handle single buttons
        // Handle button 0 (this is the first button, X-Button on a PS4 controller)
        // document.addEventListener(joystick.ButtonEvents[0], () => this.handleJump())

        // start pixi
        this.#pixi.ticker.add((delta) => this.update())
    }

    update() {
        for (let joystick of this.#arcade.Joysticks) {
            joystick.update()
        }

        this.#box.update()
    }

    disconnect() {
        document.removeEventListener("joystickcreated", this.#joystickListener)
    }
}

new Game()