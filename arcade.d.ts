export class Arcade {
    /**
     * Creates an arcade 'cabinet'
     * @param mp 'true' for 2 joystick multiplayer Arcade (default single player)
     */
    constructor(game: any, mp?: boolean, debug?: boolean);
    get Joysticks(): any[];
    /**
     * Creates an Joystick and adds it to this arcade
     * @param joystickNumber Unique identifier given by the joystick
     * @param numOfButtons Sets number of buttons on joystick
     */
    createAndAddJoystick(joystickNumber: any, numOfButtons: any): any;
    /**
     * Removes a Joystick from this arcade
     * @param joystickNumber Unique identifier of the joystick
     */
    removeJoystick(joystickNumber: any): void;
    /**
     * Get a Joystick with its unique identifier
     * @param joystickNumber Unique identifier given by the joystick
     */
    getJoystickByNumber(joystickNumber: any): any;
    #private;
}
