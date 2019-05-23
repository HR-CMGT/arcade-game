class Game {
    private arcade : Arcade

    constructor() {
        // create arcade cabinet with 2 joysticks (with 6 buttons)
        this.arcade = new Arcade()

        document.addEventListener("joystick0button0", () => this.playerOneFire())

        this.gameLoop()
    }
    
    private playerOneFire(){
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
}

window.addEventListener("load", () => new Game())
