//#region Template
const template = document.createElement('template');
template.innerHTML = `
<style>
// :host {
//     position:           absolute;
//     top:                10px;
//     right:              10px;
// }
root {
    top:                10px;
    right:              10px;
    width:              289px; 
    height:             120px;
    display:            block;
    background-color: brown;
}

root * {
    position:           relative;
}

.button-wrapper, .axes-wrapper {
    display:            flex;
    flex-wrap:          wrap;
    float:              left;
}

root .button-div {
    border: solid 1px black;
    width:              60px;
    margin:             5px;
    padding:            5px;
}

.button-wrapper {
    width:              164px;
}

.axes-wrapper {
    width:              115px;
    margin:             5px;
}

.axes-cell {
    width:              25px;  
    height:             25px; 
    margin:             5px;  
    border:             solid 1px transparent;
}

.axes-cell.direction {
    border:             solid 1px black;
}

.axes-cell.center{
    border:             solid 1px black;
    background-color: blue;
}
.axes-cell.active{
    background-color: red;
}
</style>`
//#endregion

class DebugPanel extends HTMLElement{

    // private buttons : boolean[] 
    private numberOfButtons : number
    private buttonDivs : HTMLElement[] = []
    
    private left    : HTMLElement
    private right   : HTMLElement
    private up      : HTMLElement
    private down    : HTMLElement

    public Axes : number[]

    private rootElement : HTMLElement

    
    constructor(axes: number[], numOfButtons : number) {
        super()
        console.log('Debug panel initialized')
        this.numberOfButtons = numOfButtons

        this.rootElement = document.createElement('root')
        template.appendChild(this.rootElement)
        
        // axes
        this.Axes = axes
        this.createHTMLForAxes()
        
        // this.buttons = buttons
        this.createHTMLForButtons()
        this.createListenersForButtons()

        this.attachShadow({mode: 'open'});
        if(this.shadowRoot) {
            let temp = template.content.cloneNode(true)
            temp.appendChild(this.rootElement)
            this.shadowRoot.appendChild(temp);
            
        }

        document.body.appendChild(this)
    }

    private createListenersForButtons() {
        document.addEventListener("button1", (e:Event) => this.handleButtonClicks(e))
        document.addEventListener("button2", (e:Event) => this.handleButtonClicks(e))
        document.addEventListener("button3", (e:Event) => this.handleButtonClicks(e))
        document.addEventListener("button4", (e:Event) => this.handleButtonClicks(e))
        document.addEventListener("button5", (e:Event) => this.handleButtonClicks(e))
        document.addEventListener("button6", (e:Event) => this.handleButtonClicks(e))
    }

    private handleButtonClicks(event:Event) {
        // event.type is something like 'button1'
        let buttonIndex : number = parseInt(event.type.split('button')[1])
        let arrayIndex = buttonIndex - 1
        
        this.buttonDivs[arrayIndex].style.filter =
                    'hue-rotate('+(Math.random() * 360)+'deg)' 
    }

    private createHTMLForButtons() : void {
        let buttonWrapper = document.createElement("div")
        buttonWrapper.className = "button-wrapper"

        for (let index = 0; index < this.numberOfButtons; index++) {
            let buttonDiv = document.createElement("div")
            buttonDiv.className = "button-div"
            buttonWrapper.appendChild(buttonDiv)

            buttonDiv.style.backgroundColor = "blue"
            buttonDiv.innerHTML = "Button "+(index + 1)

            this.buttonDivs.push(buttonDiv)
        }
        this.rootElement.appendChild(buttonWrapper)
    }

    private createHTMLForAxes() : void {
        let axesWrapper = document.createElement("div")
        axesWrapper.className = "axes-wrapper"

        for(let i = 1 ; i <= 9 ; i++) {
            let cell = document.createElement('div')
            cell.className = "axes-cell"
            if(i % 2 == 0) cell.classList.add("direction")
            if(i == 5 ) cell.classList.add("center")
            axesWrapper.appendChild(cell)

            switch (i) {
                case 2:
                    this.up = cell
                    break
                case 4: 
                    this.left = cell
                    break
                case 6:
                    this.right = cell
                    break
                case 8:
                    this.down = cell
                    break
            }
        }

        this.rootElement.appendChild(axesWrapper)
    }

    public update() : void {
        // X-axe
        if (this.Axes[0] == 0)
        {
            this.left.classList.remove("active")
            this.right.classList.remove("active")
        }   
        else {
            if (this.Axes[0] < 0) 
                this.left.classList.add("active")
            else if(this.Axes[0] > 0)
                this.right.classList.add("active")
        } 

        // Y-axe
        if (this.Axes[1] == 0)
        {
            this.up.classList.remove("active")
            this.down.classList.remove("active")
        }   
        else {
            if (this.Axes[1] < 0) 
                this.up.classList.add("active")
            else if(this.Axes[1] > 0)
                this.down.classList.add("active")
        } 
    }
}

window.customElements.define("debug-panel", DebugPanel);