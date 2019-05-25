class Game {
    private arcade : Arcade
    private fireListener: EventListener

    // example of game objects
    private circles : Circle[] = []

    constructor() {
        // create arcade cabinet with 2 joysticks (with 6 buttons)
        this.arcade = new Arcade()
        
        // The game must wait for de joysticks to connect
        document.addEventListener("joystickcreated", (e: Event) => this.initJoystick(e as CustomEvent) )

        // joystick fire button
        this.fireListener = () => this.handleFireButton()
        document.addEventListener("joystick0button0", this.fireListener)

        this.gameLoop()
    }
    
    private handleFireButton(){
        console.log("player one fired!")
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
        
        // example: read direction axes as -1 to 1 for player one
        if (this.arcade.Joysticks[0]) {
            let xspeed = this.arcade.Joysticks[0].X * 10
            let yspeed = this.arcade.Joysticks[0].Y * 10
        }

        requestAnimationFrame(() => this.gameLoop())
    }
    
    private gameOver(){
        document.removeEventListener("joystick0button0", this.fireListener)
    }
}

window.addEventListener("load", () => new Game())
