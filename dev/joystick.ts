class Joystick {

    private readonly DEBUG: boolean = true;
    // BUT1 and BUT2 are the indexes of the redirect function. 
    // When both are pressed, redirect to homepage
    private readonly BUT1: number = 1
    private readonly BUT2: number = 2
    private readonly REDIRECT_URL: string = "http://hr-cmgt.github.io/arcade-server"

    // FIELDS
    private numberOfBUttons = 0
    private axes: number[]  = []

    private gamepad: Gamepad
    private previousGamepad: Gamepad

    private isConnected: boolean = false

    private debugPanel: DebugPanel

    // PROPERTIES
    // Axes
    public get Left()   : boolean { return (this.axes[0] == -1) }
    public get Right()  : boolean { return (this.axes[0] == 1)  }
    public get Up()     : boolean { return (this.axes[1] == -1) }
    public get Down()   : boolean { return (this.axes[1] == 1)  }

    /**
     * Creates a joystick object for one player
     * @param numOfButtons The number of buttons needed by your game
     */
    constructor(numOfButtons: number) {
        this.numberOfBUttons = numOfButtons

        if (this.DEBUG) { this.debugPanel = new DebugPanel(this.numberOfBUttons) }

        window.addEventListener("gamepadconnected", (e: Event) => this.onGamePadConnected(e as GamepadEvent))
        window.addEventListener("gamepaddisconnected", (e: Event) => this.onGamePadDisconnected(e as GamepadEvent))
    }

    private onGamePadConnected(e: GamepadEvent): void {
        if (this.DEBUG) { console.log('Game pad connected') }
        this.gamepad = e.gamepad
        this.previousGamepad = this.gamepad
        this.isConnected = true
    }
    private onGamePadDisconnected(e: GamepadEvent): void {
        if (this.DEBUG) { console.log('Game pad connected') }
        this.isConnected = false
    }

    public update(): void {
        if (this.isConnected) {
            let gamepads = navigator.getGamepads()

            if (!gamepads) {
                return;
            }

            let gamepad: Gamepad | null = gamepads[0]

            if (gamepad) {
                for (let index = 0; index < this.numberOfBUttons; index++) {
                    if (this.buttonPressed(gamepad.buttons[index]) &&
                        !this.buttonPressed(this.previousGamepad.buttons[index])) {
                        document.dispatchEvent(new Event('button' + (index + 1)))
                    }
                    if (this.buttonPressed(gamepad.buttons[this.BUT1]) &&
                        this.buttonPressed(gamepad.buttons[this.BUT2]) &&
                        (!this.buttonPressed(this.previousGamepad.buttons[this.BUT1]) ||
                            !this.buttonPressed(this.previousGamepad.buttons[this.BUT2]))) {
                        window.location.href = this.REDIRECT_URL
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
        }
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
}

