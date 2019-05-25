class Circle extends HTMLElement{
    
    private speed    : number   = 3
    private x        : number   = 0
    private y        : number   = 0
    private joystick : Joystick
    
    constructor(joystick: Joystick) {
       super() 
       this.joystick = joystick

       this.style.backgroundColor   = "red"
       this.style.width             = "100px"
       this.style.height            = "100px"
       this.style.borderRadius      = "50px"

       let game = document.getElementsByTagName("game")[0]
       game.appendChild(this)

       document.addEventListener(joystick.ButtonEvents[0], () => this.changeColor())
    }

    /**
     * Change color of the circle (on a button press)
     */
    private changeColor(){
        let color = Math.random() * 360
        this.style.filter = "hue-rotate("+color+"deg)";
    }

    public update() {
        if(this.joystick.Left)  this.x -= this.speed
        if(this.joystick.Right) this.x += this.speed
        if(this.joystick.Up)    this.y -= this.speed
        if(this.joystick.Down)  this.y += this.speed

        this.draw()
    }

    private draw() {
        this.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}

window.customElements.define("circle-component", Circle)