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
