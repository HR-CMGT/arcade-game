# Arcade Game

![screenshot](./screenshot.png)

Instructions for adding your game to the HR CMGT ARCADE CABINET

- Serving your game
- Game Size
- Joystick controls
- Phaser Gamepad
- Redirecting to the game server

## Serving your game

Your game needs to be hosted online, preferably in the docs folder of your github repository (master branch). Enable github pages to publish the docs folder. 

![screenshot](./cart.png)

If you want, you can photoshop your own cartridge image for display in the server. [Download the base image here](./cart.png) 

## Game Size

The game window is 1440 x 900. If your game is smaller you have several options to display the game:

Use CSS to center the game in the window on a black background.
```
#game {
    width:800px;
    height:600px;
    margin: 0 auto;
}
```
Use CSS Scaling to scale the game up. 
```
#game {
   width:800px;
   height:600px;
   transform:scale(1.4);
}
```
⚠️ Experimental! After upgrading Phaser to 3.17, you can use Phaser's scaling feature. [Read the Phaser blog about all Scaling options](https://phaser.io/phaser3/devlog/136)

## Joystick

Add the example code from this repository to your game. Now you can listen to the arcade buttons and stick for one or two players. Check the example below:

- The position of the stick can be read in the update() function.
- Button presses can be detected with an eventListener. 

```
class Game {
    private arcade : Arcade

    constructor() {
        this.arcade = new Arcade()
        
        document.addEventListener("joystick0button0", () => this.playerOneFire())

        this.gameLoop()
    }
    
    private playerOneFire(){
        console.log("player one fired!")
    }

    private gameLoop() : void {
        for(let joystick of this.arcade.Joysticks){
            joystick.update()
            
            // just log the values
            if(joystick.Left)  console.log('LEFT')
            if(joystick.Right) console.log('RIGHT')
            if(joystick.Up)    console.log('UP')
            if(joystick.Down)  console.log('Down')
            
            // use the values to set X and Y velocity of a player
            playerOne.setVelocityX(joystick.XAxis * 400)
            playerOne.setVelocityY(joystick.YAxis * 400)
        }

        requestAnimationFrame(() => this.gameLoop())
    }
}
```
To see how to control a spaceship with the joystick, you can check the [Ruimtegruis Ship Example](https://github.com/KokoDoko/ruimtegruis/blob/master/src/objects/ship.ts)

You can test this in your own game with one of the available joysticks, or with your own PS4 / XBox controller.

#### Using this joystick class in Phaser

If you use this class in phaser, you have to add `export` and `import` keywords to the classes.

```
export class JoyStick {
}

import { JoyStick } from "./joystick"
```

## Phaser GamePad API

In Phaser, it's probably easier to use [Phaser's GamePad API](http://labs.phaser.io/edit.html?src=src/input\gamepad\twin%20stick%20shooter.js). 

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
       
       
       this.setVelocityX(gamepad.leftStick.x * 400)        // set velocity with joystick
       this.setVelocityY(gamepad.leftStick.y * 400)
    }
}
```

## Redirecting to the game server

Your game needs to redirect to the arcade game server on button press 8 and 9. You can find example code here in the joystick class, or you can build your own redirect:
```
window.location.href = "http://hr-cmgt.github.io/arcade-server"
```
