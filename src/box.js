import * as PIXI from 'pixi.js'
import { Joystick } from './arcade/joystick'

export class Box extends PIXI.Sprite {
    
    #joystick;
    
    constructor(joystick) {
        super(PIXI.Texture.WHITE)
        this.width = 30
        this.height = 30
        this.x = 100
        this.y = 100
        this.anchor.set(0.5)

        this.#joystick = joystick
        document.addEventListener(this.#joystick.ButtonEvents[0], () => this.#changeColor())
    }

    #changeColor(){
        console.log("controller button pressed")
        this.tint = Math.random() * 0xFFFFFF
    }

    update() {
        this.x += this.#joystick.X
        this.y += this.#joystick.Y
    }

}
