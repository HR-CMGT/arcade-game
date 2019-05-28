class Game {
    private arcade : Arcade
    private joystickListener: EventListener

    // example of game objects
    private circles : Circle[] = []

    constructor() {
        // create arcade cabinet with 2 joysticks (with 6 buttons)
        this.arcade = new Arcade(this)
        
        // The game must wait for de joysticks to connect
        this.joystickListener = (e: Event) => this.initJoystick(e as CustomEvent)
        document.addEventListener("joystickcreated",  this.joystickListener)

        this.gameLoop()
    }

    /**
     * 
     * @param gamepadEvent 
     */
    private initJoystick(e:CustomEvent) {

        let joystick = this.arcade.Joysticks[e.detail]
        
        this.circles.push(new Circle(joystick))

        for (const buttonEvent of joystick.ButtonEvents) {
            document.addEventListener(buttonEvent, () => console.log(buttonEvent))
        }
        // alternatively you can handle single buttons
        // Handle button 0 (this is the first button, X-Button on a PS4 controller)
        document.addEventListener(joystick.ButtonEvents[0], () => this.handleJump())
    }

    private handleJump() : void {
        console.log("Jump")
    }

    private gameLoop() : void {
        for (const circle of this.circles) {
            circle.update()
        }

        for(let joystick of this.arcade.Joysticks){
            joystick.update()

            // example: read directions as true / false
            if(joystick.Left)  console.log('LEFT')
            if(joystick.Right) console.log('RIGHT')
            if(joystick.Up)    console.log('UP')
            if(joystick.Down)  console.log('Down')
        }

        requestAnimationFrame(() => this.gameLoop())
    }

    public disconnect() {
        document.removeEventListener("joystickcreated", this.joystickListener)
        for (const circle of this.circles) {
            circle.remove()
        }
        this.circles = []
    }
}

window.addEventListener("load", () => new Game())
