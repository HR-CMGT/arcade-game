class Game {
    private joystick : Joystick

    constructor() {
        this.joystick = new Joystick(6)
        
        document.addEventListener("button1", () => this.handleButton1Click())
        document.addEventListener("button2", () => this.jump())
        document.addEventListener("button3", () => console.log('Button 3 fired'))
        document.addEventListener("button4", () => console.log('Button 4 fired'))
        document.addEventListener("button5", () => console.log('Button 5 fired'))
        document.addEventListener("button6", () => console.log('Button 6 fired'))

        this.gameLoop()
    }

    private gameLoop() : void {
        this.joystick.update()

        if(this.joystick.Left)  console.log('LEFT')
        if(this.joystick.Right) console.log('RIGHT')
        if(this.joystick.Up)    console.log('UP')
        if(this.joystick.Down)  console.log('Down')
        
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