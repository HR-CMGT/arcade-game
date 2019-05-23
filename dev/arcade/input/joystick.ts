class Joystick {

    private DEBUG: boolean = true;

    // BUT1 and BUT2 are the indexes of the redirect function. 
    // When both are pressed, redirect to homepage
    private readonly BUT1: number = 8
    private readonly BUT2: number = 9

    // FIELDS
    private joystickNumber  : number    = 0
    private numberOfBUttons : number    = 0
    private axes            : number[]  = []

    private gamepad         : Gamepad
    private previousGamepad : Gamepad

    // private isConnected     : boolean = false
    public isConnected     : boolean = false

    private debugPanel      : DebugPanel

    // PROPERTIES
    // Axes as booleans
    public get Left()   : boolean { return (this.axes[0] == -1) }
    public get Right()  : boolean { return (this.axes[0] == 1)  }
    public get Up()     : boolean { return (this.axes[1] == -1) }
    public get Down()   : boolean { return (this.axes[1] == 1)  }
    
    // Axes as direction
    // values are -1, 0, 1 because arcade sticks are digital
    public get X() : number { return Math.round(this.axes[0]) }
    public get Y() : number { return Math.round(this.axes[1]) }

    // Joystick identifier
    public get JoystickNumber()     : number { return this.joystickNumber }

    // Current gamepad
    public get Gamepad()            : Gamepad { return this.gamepad }
    public set Gamepad(gamepad:Gamepad) { this.gamepad = gamepad; }

    // previous gamepad
    public get PreviousGamepad()    : Gamepad { return this.previousGamepad }
    public set PreviousGamepad(previousGamepad:Gamepad) { this.previousGamepad = previousGamepad; }

    /**
     * Creates a joystick object for one player
     * @param joystickNumber The number of the first joystick starts at 0
     * @param numOfButtons The number of buttons needed by your game
     */
    constructor(joystickNumber : number, numOfButtons: number, debug: boolean) {
        this.joystickNumber = joystickNumber
        this.numberOfBUttons = numOfButtons
        this.DEBUG = debug

        if (this.DEBUG) { this.debugPanel = new DebugPanel(this.joystickNumber, this.numberOfBUttons) }
    }

    public update(): void {
        if (this.isConnected) {
            let gamepad = navigator.getGamepads()[this.gamepad.index];

            if (gamepad) {
                this.readGamepad(gamepad)
            }
        }
    }

    private readGamepad(gamepad: Gamepad) : void {
        for (let index = 0; index < this.numberOfBUttons; index++) {
            if (this.buttonPressed(gamepad.buttons[index]) && !this.buttonPressed(this.previousGamepad.buttons[index])) {
                let eventName = 'joystick'+ this.JoystickNumber +'button' + (index)
                if (this.DEBUG) { console.log("Dispatch event: "+eventName) }
                document.dispatchEvent(new Event(eventName))
            }
            if (this.buttonPressed(gamepad.buttons[this.BUT1]) && this.buttonPressed(gamepad.buttons[this.BUT2]) &&
                (!this.buttonPressed(this.previousGamepad.buttons[this.BUT1]) ||  !this.buttonPressed(this.previousGamepad.buttons[this.BUT2]))) {
                    document.dispatchEvent(new Event('redirect'))
            }
        }

        // gamepad has 4 axes, first is x, second is y
        // an axe returns a float, only int is needed
        this.axes[0] = Math.round(gamepad.axes[0])
        this.axes[1] = Math.round(gamepad.axes[1])
        
        if (this.DEBUG) {
            // update the axes (x and y)
            this.debugPanel.Axes[0] = this.axes[0]
            this.debugPanel.Axes[1] = this.axes[1]

            this.debugPanel.update()
        }

        this.previousGamepad = gamepad
    }
    /**
     * Helper function to filter some bad input
     * @param b 
     */
    private buttonPressed(b: any): any {
        if (typeof (b) == "object") {
            return b.pressed;
        }
        return b == 1.0;
    }

    public destroy() {
        if(this.DEBUG) this.debugPanel.remove()
    }
}

