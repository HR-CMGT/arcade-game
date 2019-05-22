class Game {
    private arcade : Arcade

    constructor() {
        // create arcade cabinet with 2 joysticks (with 6 buttons)
        this.arcade = new Arcade()

        this.gameLoop()
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

    private handleButton1Click() {
        console.log('Button 1 fired')
    }

    private jump() {
        console.log('Jump!')
    }
}

window.addEventListener("load", () => new Game())