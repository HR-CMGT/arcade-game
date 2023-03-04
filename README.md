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

- Place the arcade folder from this repository in the `src` folder of your game.
- Create an `arcade` property and add `this.arcade = new Arcade()`  to `Game.ts`. 
- Create the event listener that waits for the joysticks connection.

GAME.TS
```typescript
import { Arcade } from "./arcade/arcade"

class Game {

    arcade:Arcade
    joystickListener: EventListener

    constructor() {
        // loader here
    }

    doneLoading() {
        this.arcade = new Arcade(this)

        // The game must wait for the joysticks to connect
        this.joystickListener = (e: Event) => this.joyStickConnected(e as CustomEvent)
        document.addEventListener("joystickcreated", this.joystickListener)
    }
}
```

<br>
<br>
<br>

## The joystick is connected

After the joystick is connected, you can continue with setting up your game.

```typescript
class Game {

    arcade:Arcade
    joystickListener: EventListener
    player:Player

    constructor() {
        // pixi loader here
    }

    doneLoading() {
        // see above
    }

    joyStickConnected(e: CustomEvent) {
        
        let joystick = this.arcade.Joysticks[e.detail]

        // just logging the buttons to check what is available
        for (const buttonEvent of joystick.ButtonEvents) {
            document.addEventListener(buttonEvent, () => console.log(buttonEvent))
        }

        // pass the joystick to the player class
        this.player = new Player(joystick)

        // you can also handle single buttons instead of the whole joystick:
        // button 0 is the first button, X-Button on a PS4 controller
        // document.addEventListener(joystick.ButtonEvents[0], () => this.handleJump())
    }
}
```

<br>
<Br>
<br>

## Using the joystick in the player class

In the above example you can see that the `Game.ts` class passes the joystick to the player : `new Player(joystick)`. The player can now also listen for joystick events. Note that we use a default white texture here for the sprite.

```typescript
import { Joystick } from "./arcade/joystick"

export class Player extends PIXI.Sprite {

    joystick: Joystick

     constructor(joystick: Joystick) {
        super(PIXI.Texture.WHITE)
        
        this.x = 100
        this.y = 100
        this.width = 30
        this.height = 30

        this.joystick = joystick

        document.addEventListener(this.joystick.ButtonEvents[0], () => this.changeColor())
    }

    private changeColor(){
        console.log("controller button pressed")
        this.tint = Math.random() * 0xFFFFFF
    }

    public update() {
        this.x += this.joystick.X
        this.y += this.joystick.Y

        // you can also check the left, right, up, down status individually
        // if(this.joystick.Left)  this.x-=2
        // if(this.joystick.Right) this.x+=2
        // if(this.joystick.Up)    this.y-=2
        // if(this.joystick.Down)  this.y+=2
    }
}
```

<br>
<Br>
<br>

# Serve your game online

Your game needs to be hosted online, you can do this by enabling **github pages** and publishing the **docs** folder. 

<br>

## Build PIXI game

In Pixi, you need to run `npm run build` to create your final game build. This will create a `docs` folder that is ready to be hosted without a live server running. 

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
    constructor(){
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
