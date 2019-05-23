# Arcade Game

![screenshot](./docs/images/screenshot.png)

Instructions for adding your game to the HR CMGT ARCADE CABINET

## Game Size

The game window is 1440 x 900. If your game is smaller you have several options to display the game:

- Use CSS to center the game in the window on a black background.
```
#game {
    width:800px;
    height:600px;
    margin: 0 auto;
}
```
- Use CSS Scaling to scale the game up. 
```
#game {
   width:800px;
   height:600px;
   transform:scale(1.4);
}
```
- Use Phasers' scaling options to adjust the game size to the monitor size. [Read the Phaser blog about all Scaling options](https://phaser.io/phaser3/devlog/136)

## Joystick

- Add the example code from this repository to your game. Now you can listen to the arcade buttons and stick for one or two players. Check this game example to see how to listen to the buttons and joystick:

```
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
}
```
You can test this in your own game with one of the available joysticks, or with your own PS4 / XBox controller.

### Using this joystick class in Phaser

If you use this class in phaser, you have to add `export` and `import` keywords to the classes.

```
export class JoyStick {
}

import { JoyStick } from "./joystick"
```

### Using Phasers GamePad API

- In Phaser, it's probably easier to use [Phaser's GamePad API](http://labs.phaser.io/edit.html?src=src/input\gamepad\twin%20stick%20shooter.js). 

CONFIG
```
var config = {
    input: {
        gamepad: true
    }
}
```
GAME
```
class Ship {
   create() {
      this.input.gamepad.on('down', function (pad, button, index) {
         console.log("gamepad connected!")
      }
    }

    update() {
       console.log(gamepad.leftStick.x)       // x axis of joystick
       console.log(gamepad.A)                 // button A
    }
}
```

*NOTE* make sure to add code that redirects gamepad button 8 and 9 back to the arcade server!
```
window.location.href = "http://hr-cmgt.github.io/arcade-server"
```
