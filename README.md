# CMGT Arcade Kast

![screenshot](./screenshot.png)

Hieronder vind je de instructies voor het toevoegen van je game aan de arcade kast:

- [Gamepad support](#gamepad)
- [Game size en startbutton](#game-size-en-startbutton)
- [Game toevoegen aan arcade kast](#game-toevoegen-aan-arcade-kast)
- [Makecode Arcade game toevoegen](#makecode-arcade)

<br>
<br>
<br>

## Gamepad

Je kan de [Excalibur Gamepad](https://excaliburjs.com/docs/gamepad) gebruiken om gebruikersinput te lezen. Zie ook de [code snippets van prg4](https://github.com/HR-CMGT/PRG04-2023-2024/blob/main/snippets/gamepad.md).

GAME.JS

```javascript
export class Game extends Engine {

    mygamepad

    constructor() {
        super()
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame(){
        this.input.gamepads.enabled = true
        this.input.gamepads.on('connect', (connectevent) => {
            console.log("gamepad detected")
            this.mygamepad = connectevent.gamepad
        })
    }
}
```
PLAYER.JS 

Als de `engine.mygamepad` niet leeg is, dan kan je in de `onPreUpdate` elk frame kijken wat de positie van de sticks is.

```javascript
export class Player extends Actor {

    onPreUpdate(engine) {
        if (engine.mygamepad === null) {
            console.log("er is geen gamepad")
            return
        }

        // bewegen
        const xValue = engine.mygamepad.getAxes(Axes.LeftStickX)
        const yValue = engine.myamepad.getAxes(Axes.LeftStickY)
        this.vel = new Vector(xValue * 100, yValue * 100)

        // schieten / springen
        if (engine.mygamepad.isButtonPressed(Buttons.Face1)) {
            console.log("jump!")
        }
    }
}
```

<br>
<Br>
<br>

## Game Size en startbutton

De beeldverhouding van de arcade kast is 16/10. Je kan ook een verhouding van 16/9 gebruiken. Door `fitScreen` toe te voegen schaalt je game automatisch omhoog naar de afmeting van het scherm. De startbutton moet je weglaten op de arcadekast, omdat er geen muis is waarmee je op start kan klikken.

```typescript
class Game {
    constructor() {
        super({
            displayMode: DisplayMode.FitScreen,
            width: 800, 
            height: 500,
            suppressPlayButton: true
        });
    }
}
```
Een kleinere resolutie vraagt minder CPU power om de game te draaien. Een aantal voorbeelden:

- 800 x 450 
- 800 x 500
- 640 x 360
- 1280 x 720
- 1440 x 900
 
<br>
<Br>
<br>

## Game toevoegen aan arcade kast

Zet je game live op github pages nadat je `npm run build` hebt gedaan. Daarna kan je aan een docent vragen om je game toe te voegen aan de arcade kast. We hebben dan onderstaande info nodig:

```json
[
    {
        "name": "Ruimtegruis",
        "url": "https://bpikaar.github.io/ruimtegruis/",
        "players" : 1,
        "cover": "cover_ruimtegruis.png",
        "makecode" : false
    }
]
```
Je kan dit ook zelf doen! Ga dan naar https://hr-cmgt.github.io/arcade-server. Klik op `fork`. Je krijgt nu een kopie van de server. In die kopie kan je jouw game (of games) toevoegen aan de [JSON file](https://hr-cmgt.github.io/arcade-server/data/games.json).

Als dat gelukt is klik je op ***Pull Request***. Als je request is goedgekeurd kan je dit testen op de arcade kast of via:  https://hr-cmgt.github.io/arcade-server/

### Cartridge image

![screenshot](./cart.png)

Je kan een eigen cartridge image gebruiken, [gebruik de lege cartridge als basis.](./cart.png) 

<br>
<br>
<br>


# Makecode Arcade

Je kan een link naar je [makecode arcade](https://arcade.makecode.com) game toevoegen aan de arcade kast. Geef de onderstaande info door aan een docent, of maak zelf een pull request (zie instructies hierboven). Zet `makecode` op `true` zodat je de juiste cartridge image krijgt.

![screenshot](./cart-makecode.png)

```json
{
    "name": "Suzy the Witchy",
    "url": "https://arcade.makecode.com/S05263-10706-41937-72354",
    "players" : 1,
    "cover": "",
    "makecode": true
}
```

<br>
<br>
<br>

## Credits

- Leanne and Bob for building the Arcade Stick Controls for PixiJS (now deprecated).
- [Tim Borowy](https://github.com/TimBorowy) and [GrunkHead Dave](https://github.com/Grunkhead) for the first iteration of the Game Arcade
