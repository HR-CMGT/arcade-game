# Arcade Game

![screenshot](./screenshot.png)

### Instructions for adding your game to the HR CMGT ARCADE CABINET

- Serving your game
- Game Size
- Audio
- 🕹 Joystick controls
- Phaser Gamepad
- Redirecting to the game server

## Serving your game

Your game needs to be hosted online, preferably in the docs folder of your github repository (master branch). Enable github pages to publish the docs folder. Your game needs to be listed in the [Games JSON file](https://hr-cmgt.github.io/arcade-server/data/games.json).

[You can test the arcade cabinet on your own computer](https://hr-cmgt.github.io/arcade-server/)

![screenshot](./cart.png)

If you want, you can photoshop your own cartridge image for display in the server. [Download the base image here](./cart.png) 

## Game Size

The game window is 1440 x 900. If your game is smaller you have several options to display the game:

Use CSS to center a 800 x 600 game in the window on a black background.
```
#game {
    width:800px;
    height:600px;
    margin: 150px 320px;
}
```
Use CSS `transform` to scale your game up to 1000 pixels wide. For example, if your game is 800 pixels wide, the scale is 1.25 (1000/800)
```
#game {
   width:800px;
   height:600px;
   transform:scale(1.25);
}
```
## Phaser scaling

If you update phaser to 3.17 (`npm install phaser@3.17.0`) you can use the [new scaling options](https://phaser.io/phaser3/devlog/136) in your config file. [Ruimtegruis example code](https://github.com/KokoDoko/ruimtegruis/blob/master/src/game.ts)

GAME.TS
```typescript
const config: Phaser.Types.Core.GameConfig = {
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.Center.CENTER_BOTH
    },
    // @ts-ignore Issue with Typescript definitions in Phaser 3.17.0
    scene: [BootScene, StartScene, GameScene, GameOver],
    ...etc
}
```
⚠️ Don't forget the `@ts-ignore` line in the example above.

⚠️ After installing Phaser 3.17 you can delete the `phaser.d.ts` file in the `src` folder! 

## Audio

In a regular HTML page, you can play audio by creating an Audio tag and calling `play()` on it. 

```
let music : HTMLAudioElement = new Audio()
music.src = "./sound/bgmusic.mp3"
music.play()
```

In Phaser, you can use the built-in audio code:

```
preload() {
    this.load.audio('theme', 'assets/audio/oedipus_wizball_highscore.mp3')
}
create() {
    let music = this.sound.add('theme')
    music.play()
}
```


### ⚠️ Autoplay audio

Note that modern browsers will not autoplay audio! You will need a user interaction on the page first, for example a button click on the loading screen. This button click can then trigger the background music. After this first button click you can use autoplaying audio in the rest of your game.

## 🕹 Joystick

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
            playerOne.setVelocityX(joystick.X * 400)
            playerOne.setVelocityY(joystick.Y * 400)
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
Then, you have to add the `new Arcade()` code in your main game.ts Class. [Check out the example](https://github.com/KokoDoko/ruimtegruis)


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


## Credits

- [Tim Borowy](https://github.com/TimBorowy) and [GrunkHead Dave](https://github.com/Grunkhead) for the first iteration of the Game Arcade
- [Louis](https://github.com/louis-lau) for fixing the game scaling bug.
