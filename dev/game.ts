class Game {
    private arcade : Arcade
    private fireListener: EventListener

    constructor() {
        // create arcade cabinet with 2 joysticks (with 6 buttons)
        this.arcade = new Arcade()

        // joystick fire button
        this.fireListener = () => this.handleFireButton()
        document.addEventListener("joystick0button0", this.fireListener)

        this.gameLoop()
    }
    
    private handleFireButton(){
        console.log("player one fired!")
    }

    private gameLoop() : void {
        for(let joystick of this.arcade.Joysticks){
            joystick.update()

            if(joystick.Left)  console.log('LEFT')
            if(joystick.Right) console.log('RIGHT')
            if(joystick.Up)    console.log('UP')
            if(joystick.Down)  console.log('Down')
        }

        requestAnimationFrame(() => this.gameLoop())
    }
    
    private gameOver(){
        document.removeEventListener("joystick0button0", this.fireListener)
    }
}

window.addEventListener("load", () => new Game())
