# Arcade Game

![screenshot](./screenshot.png)

## Adding your game to the Arcade Cabinet

- Example project
- Joystick and gamepad
- Serve your game online
- Game Size

<br>
<br>
<br>

## Example project

Connect your PS4 / XBox controller to your laptop with bluetooth, or connect one of the CMGT arcade sticks. Then try [this online example](https://hr-cmgt.github.io/arcade-game/) or download and run this repository, to see if you can control the box.

<br>
<br>
<br>

## 🕹 🎮 Joystick and Gamepad

The arcade class will detect if you use a gamepad 🎮 or the arcade cabinet joystick 🕹

### Add library to package.json
 ```json
  "dependencies": {
    "arcade-game": "git@github.com:HR-CMGT/arcade-game.git"
  }
 ```

 ### Run NPM install / update
 Run install on new install. If prompted to update this library, please run update.
 ```cli
 npm install
 ```

 ### Usage in game class
 ```javascript
import { Arcade } from "arcade-game"

export class Game {

    #arcade;
    #joystickListener;

    constructor() {
        //TODO: add reference to startGame()
    }

    startGame() {
        this.#arcade = new Arcade(this, false, true);

        this.#joystickListener = (e) => this.#joyStickFound(e)
        document.addEventListener("joystickcreated",  this.#joystickListener)
    }

    #joyStickFound(e) {
        let joystick = this.#arcade.Joysticks[e.detail]
        
        // debug, this shows you the names of the buttons when they are pressed
        for (const buttonEvent of joystick.ButtonEvents) {
            document.addEventListener(buttonEvent, () => console.log(buttonEvent))
        }

        this.update();
    }

    //TODO: incoporate in library game loop, instead of an update with requestAnimationFrame
    update() {
        for (let joystick of this.#arcade.Joysticks) {
            joystick.update()
        }

        requestAnimationFrame(() => this.update());
    }

    disconnect() {
        document.removeEventListener("joystickcreated", this.#joystickListener)
    }
}

new Game()

 ```

### En-/disable Arcade features
When creating an Arcade object, you can change a few settings
```javascript
let arcade = new Arcade(this, false, true);
```
The params are:
* <strong>this</strong>; needs current game class > do <strong>not</strong> change
* <strong>false</strong>; use multiplayer features? Set to true for multiplayer.
* <strong>true</strong>; use debug features? Set to false when done debugging.

<br>
<Br>
<br>

# Serve your docs folder

Your game needs to be hosted online, you can do this by enabling **github pages** and publishing the **docs** folder. 

<br>

## Build your game

In Pixi, Excalibur, or other game libraries, you can execute `npm build` to create your final game build. This will create a `docs` folder that is ready to be hosted. 

<br>

## Add game to arcade cabinet JSON

Your game `name` and `url` need to be listed in the [Games JSON file](https://hr-cmgt.github.io/arcade-server/data/games.json). You can make a Pull Request for the arcade server repository, or ask one of the admins to add your game by sending the below information. You can test the arcade cabinet yourself at:  https://hr-cmgt.github.io/arcade-server/

```json
[
    {
        "name": "Ruimtegruis",
        "url": "https://bpikaar.github.io/ruimtegruis/",
        "genres" : [1,1,1,0,0,0,0,0,0],
        "players" : 2,
        "cover": "cover_ruimtegruis.png"
    }
]
```

<br>

### Add cartridge image

![screenshot](./cart.png)

If you want, you can photoshop your own cartridge image for display in the server. [Download the base image here](./cart.png) 

<br>
<br>
<br>

## Game Size

The arcade cabinet window is 1440 x 900. You can set your game to this size using: 

```typescript
class Game {
    constructor() {
        // excalibur
        super({ width: 1440, height: 900 })
    
        // pixi
        this.pixi = new PIXI.Application({ width: 1440, height: 900})
    }
}
```

If your game is smaller or bigger, you can scale the canvas using CSS. 

```css
canvas {
    width:100vw;
}
```
If your aspect ratio is not `16:9` you can instead use `height:100vh`.

<br>
<br>
<br>

## Known issues

- Certain versions of Chrome on Windows detect extra undefined/unknown Gamepads, which can cause issues with this library.
- Safari on Mac OS seems to miss button clicks?

<br>
<br>
<br>

## Credits

- [Tim Borowy](https://github.com/TimBorowy) and [GrunkHead Dave](https://github.com/Grunkhead) for the first iteration of the Game Arcade
