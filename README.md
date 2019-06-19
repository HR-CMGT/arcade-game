# Arcade Game

![screenshot](./screenshot.png)

# Adding your game to the ARCADE CABINET

- 🕹 Joystick 
   - Arcade stick in Phaser
   - Phaser Gamepad
   - From Javascript
- Serving your game
- Game Size
- Audio

# 🕹 Joystick

## Using the joystick class with Phaser

If you use this class in phaser, you have to add `export` and `import` keywords to the classes. 

- Place the arcade folder in the `src` folder
- Add a `new Arcade()` instance to the top-level app class of your game. Mostly this is `app.ts`.
- From other classes (scenes or players) you can then get the Arcade from `app.ts` and read the joysticks.

APP.TS
```
import { Arcade } from "./arcade/arcade"

const config: GameConfig = {
};

export class Neko extends Phaser.Game {
    public arcade:Arcade
    constructor(config: GameConfig) {
        super(config)
        this.arcade = new Arcade()
    }
}
```
EXAMPLE START SCENE WITH START BUTTON
```
import { UI } from "./ui-scene"
import { Arcade } from "../arcade/arcade"
import { Neko } from "../app"

export class StartScene extends Phaser.Scene {

    private arcade : Arcade
    private nextGameListener : EventListener

    constructor() {
        super({key: "StartScene"})
    }

    create(): void {
        let g = this.game as Neko
        this.arcade = g.arcade
        
        this.nextGameListener = () => this.nextGame()
        document.addEventListener("joystick0button0", this.nextGameListener)
    }
    
    private nextGame(){
        document.removeEventListener("joystick0button0", this.nextGameListener)
        this.scene.start('GameScene')
    }
    
    public update(){
        for (let joystick of this.arcade.Joysticks) {
            joystick.update()
        }
    }
}
```
EXAMPLE PLAYER WITH JOYSTICK CONTROLS
```
import { Arcade } from "../arcade/arcade"
import { Neko } from "../app"

export class Player extends Phaser.Physics.Arcade.Sprite {

    private arcade : Arcade

    constructor(scene) {
        super(scene, 0, 500)
        
        let g = this.scene.game as Neko
        this.arcade = g.arcade

        document.addEventListener("joystick0button0", () => this.handleFireButton())
    }
    
    private handleFireButton():void{
        console.log("fire!")
    }
    
    public update(): void {
        this.joystickInput()
    }
    
    private joystickInput():void {
        for (let joystick of this.arcade.Joysticks) {
            joystick.update()
        }
        if (this.arcade.Joysticks[0]) {
            this.setVelocityX(this.arcade.Joysticks[0].X * 400)
            this.setVelocityY(this.arcade.Joysticks[0].Y * 400)
        }
    }
}
```

### Example projects

- [Ruimtegruis](https://github.com/KokoDoko/ruimtegruis)
- [N-3KO](https://github.com/Drelofs/N-3KO)

## Phaser GamePad API

Phaser also has a native [GamePad API](http://labs.phaser.io/edit.html?src=src/input\gamepad\twin%20stick%20shooter.js). 

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
## Using the joystick without Phaser

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

You can test this in your own game with one of the available joysticks, or with your own PS4 / XBox controller.

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

## Known issues

- Certain versions of Chrome on Windows (versions to be defined later) detect extra undefined/unknown Gamepads, which breaks this library.

## Credits

- [Tim Borowy](https://github.com/TimBorowy) and [GrunkHead Dave](https://github.com/Grunkhead) for the first iteration of the Game Arcade
- [Louis](https://github.com/louis-lau) for fixing the game scaling bug.
