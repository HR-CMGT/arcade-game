class Joystick {

    private readonly DEBUG : boolean = true;

    // FIELDS
    // Buttons
    private buttons:boolean[]   = []
    private buttonEvents:Event[]= []
    private numberOfBUttons     = 0

    // Axes
    private x: number           = 0
    private y: number           = 0

    private axes: number[]      = []

    private gamepad : Gamepad
    private previousGamepad : Gamepad

    private isConnected : boolean = false

    private debugPanel : DebugPanel

    // PROPERTIES
    // Axes
    public get Left() : boolean {
        if(this.axes[0] == -1) return true
        return false
    }
    public get Right() : boolean {
        if(this.axes[0] == 1) return true
        return false
    }
    public get Up() : boolean {
        if(this.axes[1] == -1) return true
        return false
    }
    public get Down() : boolean {
        if(this.axes[1] == 1) return true
        return false
    }

    
    /**
     * Creates a joystick object for one player
     * @param numOfButtons The number of buttons needed by your game
     */
    constructor(numOfButtons : number) {
        this.numberOfBUttons = numOfButtons
        // add all buttons to an array
        this.buttons.push(false, false, false, false, false, false)
        // add all axes (x:number, y:number) to an array
        this.axes.push(this.x, this.y)

        if(this.DEBUG) { this.debugPanel = new DebugPanel(this.axes, this.numberOfBUttons) }
        
        for(let i = 1; i <= this.numberOfBUttons ; i++) {
            this.buttonEvents.push(new Event('button'+i))
        }
        
        window.addEventListener("gamepadconnected", (e : Event) => this.onGamePadConnected(e as GamepadEvent));
    }

    private onGamePadConnected(e:GamepadEvent) : void {
        if (this.DEBUG) { console.log('Game pad connected') }
        this.gamepad = e.gamepad
        this.previousGamepad = this.gamepad
        this.isConnected = true
    }

    public update() : void {
        if(this.isConnected) {
            let gamepads = navigator.getGamepads()
            
            if (!gamepads) {
                return;
            }

            let gamepad : Gamepad = gamepads[0]!
            
            for (let index = 0; index < this.buttons.length; index++) {
                if (this.buttonPressed(gamepad.buttons[index]) &&
                    !this.buttonPressed(this.previousGamepad.buttons[index])) 
                {
                    document.dispatchEvent(this.buttonEvents[index])
                    this.buttons[index] = true
                } else {
                    this.buttons[index] = false
                }
            }
            
            // gamepad has 4 axes, first is x, second is y
            // an axe returns a float, only int is needed
            this.x = Math.round(gamepad.axes[0])
            this.y = Math.round(gamepad.axes[1])
            
            if (this.DEBUG) { 
                // update the axes (x and y)
                this.debugPanel.Axes[0] = this.x
                this.debugPanel.Axes[1] = this.y

                this.debugPanel.update()
            }

            this.previousGamepad = gamepad
        }
    }

    /**
     * Helper function to filter some bad input
     * @param b 
     */
    private buttonPressed(b:any) : any {
        if (typeof(b) == "object") {
          return b.pressed;
        }
        return b == 1.0;
      }
}

