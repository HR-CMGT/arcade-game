
import { Joystick } from "./joystick"

export class Arcade {
    #DEBUG; //boolean
    #joysticks; //Joystick[]
    #REDIRECT_URL = "http://hr-cmgt.github.io/arcade-server"
    #multiplayer = false
    #game;

    // PROPERTIES
    get Joysticks() { return this.#joysticks }

    /**
     * Creates an arcade 'cabinet' 
     * @param mp 'true' for 2 joystick multiplayer Arcade (default single player)
     */
    constructor(game, mp = false, debug = false) {
        this.#game = game
        this.#multiplayer = mp
        this.#DEBUG = debug
        this.#joysticks = []

        if (this.#DEBUG) this.#showStatus("Gamepad is NOT connected. Press a button to connect")

        document.addEventListener("redirect", () => this.#onRedirect())
        window.addEventListener("gamepadconnected", (e) => this.#onGamePadConnected(e))
        window.addEventListener("gamepaddisconnected", (e) => this.#onGamePadDisconnected(e))
    }

    /**
     * Handles redirect fired from joystick
     */
    #onRedirect() {
        if (this.#DEBUG) { console.log('redirect!!') }
        window.location.href = this.#REDIRECT_URL
    }

    /**
     * Handles connecting a joystick
     * @param e Gamepad event
     */
    #onGamePadConnected(e) {
        if (this.#DEBUG) {
            console.log('Game pad connected')
            console.log("Joystick number: " + e.gamepad.index)
        }
        if ((!this.#multiplayer && this.#joysticks.length == 0) || this.#multiplayer) {
            let joystick = this.createAndAddJoystick(e.gamepad.index, 6)

            joystick.PreviousGamepad = joystick.Gamepad
            joystick.Gamepad = e.gamepad
            if (joystick.PreviousGamepad == null) {
                joystick.PreviousGamepad = e.gamepad
            }
        }

        if (this.#DEBUG) this.#removeStatus()
    }

    /**
     * Handles disconnecting a joystick
     * @param e Gamepad event
     */
    #onGamePadDisconnected(e) {
        if (this.#DEBUG) { console.log('Game pad disconnected') }
        if (this.#DEBUG) this.#showStatus("Gamepad is NOT connected. Connect the gamepad and press a button.")
        this.removeJoystick(e.gamepad.index)
        this.#game.disconnect()
    }

    /**
     * Creates an Joystick and adds it to this arcade
     * @param joystickNumber Unique identifier given by the joystick
     * @param numOfButtons Sets number of buttons on joystick
     */
    createAndAddJoystick(joystickNumber, numOfButtons) {
        let joystickCheck = this.getJoystickByNumber(joystickNumber)
        if (joystickCheck != null) {
            return joystickCheck
        }

        let joystickNew = new Joystick(joystickNumber, numOfButtons, this.#DEBUG)
        this.#joysticks[joystickNumber] = joystickNew
        if (joystickNew) {
            document.dispatchEvent(new CustomEvent("joystickcreated", { detail: joystickNumber }))
            console.log("joystick created")
        }
        return joystickNew
    }

    /**
     * Removes a Joystick from this arcade
     * @param joystickNumber Unique identifier of the joystick
     */
    removeJoystick(joystickNumber) {
        let joystickCheck = this.getJoystickByNumber(joystickNumber)
        if (joystickCheck == null) {
            return
        }

        var index = this.#joysticks.indexOf(joystickCheck)
        if(typeof this.#joysticks[index].destroy === 'function'){
            this.#joysticks[index].destroy()
        }
        if (index > -1) {
            this.#joysticks.splice(index, 1)
        }
    }

    /**
     * Get a Joystick with its unique identifier
     * @param joystickNumber Unique identifier given by the joystick
     */
    getJoystickByNumber(joystickNumber) {
        for (let joystick of this.#joysticks) {
            if (joystick.JoystickNumber == joystickNumber) {
                return joystick
            }
        }
        return null
    }

    #showStatus(content) {
        let container
        let p
        if (!(container = document.getElementsByTagName("status")[0])) {
            container = document.createElement("status")
            document.body.append(container)
        }
        if (container) {
            if (!(p = container.getElementsByTagName("p")[0])) {
                p = document.createElement("p")
                container.appendChild(p)
            }
        }
        if (p) {
            p.innerHTML = content
        }
    }

    #removeStatus() {
        let status
        if (status = document.getElementsByTagName("status")[0]) {
            status.remove()
        }
    }
}