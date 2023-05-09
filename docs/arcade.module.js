function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,"symbol"==typeof(r=function(t,e){if("object"!=typeof t||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var i=n.call(t,"string");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(i.key))?r:String(r),i)}var r}function e(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),Object.defineProperty(e,"prototype",{writable:!1}),e}function n(t){return n=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},n(t)}function i(t,e){return i=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},i(t,e)}function r(t,e,n){return r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}()?Reflect.construct.bind():function(t,e,n){var r=[null];r.push.apply(r,e);var o=new(Function.bind.apply(t,r));return n&&i(o,n.prototype),o},r.apply(null,arguments)}function o(t){var e="function"==typeof Map?new Map:void 0;return o=function(t){if(null===t||-1===Function.toString.call(t).indexOf("[native code]"))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,o)}function o(){return r(t,arguments,n(this).constructor)}return o.prototype=Object.create(t.prototype,{constructor:{value:o,enumerable:!1,writable:!0,configurable:!0}}),i(o,t)},o(t)}function s(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}var c=0;function u(t){return"__private_"+c+++"_"+t}function d(t,e){if(!Object.prototype.hasOwnProperty.call(t,e))throw new TypeError("attempted to use private field on non-instance");return t}var l=document.createElement("template");l.innerHTML="\n<style>\n:host {\n    position:           absolute;\n    top:                10px;\n    right:              10px;\n}\nroot {\n    top:                10px;\n    right:              10px;\n    width:              289px; \n    height:             120px;\n    display:            block;\n    background-color:   #75a8f77a;\n}\nroot * {\n    position:           relative;\n}\n.button-wrapper, .axes-wrapper {\n    display:            flex;\n    flex-wrap:          wrap;\n    float:              left;\n}\nroot .button-div {\n    border: solid 1px black;\n    width:              60px;\n    margin:             5px;\n    padding:            5px;\n}\n.button-wrapper {\n    width:              164px;\n}\n.axes-wrapper {\n    width:              115px;\n    margin:             5px;\n}\n.axes-cell {\n    width:              25px;  \n    height:             25px; \n    margin:             5px;  \n    border:             solid 1px transparent;\n}\n.axes-cell.direction {\n    border:             solid 1px black;\n}\n.axes-cell.center{\n    border:             solid 1px black;\n    background-color:   blue;\n}\n.axes-cell.active{\n    background-color:   red;\n}\n.identifier{\n    position:           absolute;\n    top:                5px;\n    left:               5px;\n    width:              auto;\n    font-weight:        bold;\n    color:              #fff;\n}\n</style>";var h=/*#__PURE__*/u("panelHeight"),p=/*#__PURE__*/u("panelSpacing"),f=/*#__PURE__*/u("joystick"),v=/*#__PURE__*/u("numberOfButtons"),b=/*#__PURE__*/u("buttonDivs"),y=/*#__PURE__*/u("left"),m=/*#__PURE__*/u("right"),g=/*#__PURE__*/u("up"),w=/*#__PURE__*/u("down"),j=/*#__PURE__*/u("rootElement"),k=/*#__PURE__*/u("createListenersForButtons"),O=/*#__PURE__*/u("handleButtonClicks"),P=/*#__PURE__*/u("createHTMLForButtons"),x=/*#__PURE__*/u("createHTMLForAxes"),E=/*#__PURE__*/function(t){var e,n;function r(e,n){var i;i=t.call(this)||this,Object.defineProperty(s(i),x,{value:A}),Object.defineProperty(s(i),P,{value:J}),Object.defineProperty(s(i),O,{value:L}),Object.defineProperty(s(i),k,{value:N}),Object.defineProperty(s(i),h,{writable:!0,value:120}),Object.defineProperty(s(i),p,{writable:!0,value:10}),Object.defineProperty(s(i),f,{writable:!0,value:void 0}),Object.defineProperty(s(i),v,{writable:!0,value:void 0}),Object.defineProperty(s(i),b,{writable:!0,value:[]}),Object.defineProperty(s(i),y,{writable:!0,value:void 0}),Object.defineProperty(s(i),m,{writable:!0,value:void 0}),Object.defineProperty(s(i),g,{writable:!0,value:void 0}),Object.defineProperty(s(i),w,{writable:!0,value:void 0}),Object.defineProperty(s(i),j,{writable:!0,value:void 0}),i.Axes=[],d(s(i),f)[f]=e,d(s(i),v)[v]=n;var r=d(s(i),p)[p]+d(s(i),f)[f].JoystickNumber*(d(s(i),h)[h]+d(s(i),p)[p]);i.style.top=r+"px",d(s(i),j)[j]=document.createElement("root"),d(s(i),j)[j].style.height=d(s(i),h)[h]+"px",l.appendChild(d(s(i),j)[j]);var o=document.createElement("div");if(o.classList.add("identifier"),o.innerHTML="#"+d(s(i),f)[f].JoystickNumber,d(s(i),j)[j].appendChild(o),d(s(i),x)[x](),d(s(i),P)[P](),d(s(i),k)[k](),i.attachShadow({mode:"open"}),i.shadowRoot){var a=l.content.cloneNode(!0);a.appendChild(d(s(i),j)[j]),i.shadowRoot.appendChild(a)}return document.body.appendChild(s(i)),i}return n=t,(e=r).prototype=Object.create(n.prototype),e.prototype.constructor=e,i(e,n),r.prototype.update=function(){0==this.Axes[0]?(d(this,y)[y].classList.remove("active"),d(this,m)[m].classList.remove("active")):this.Axes[0]<0?d(this,y)[y].classList.add("active"):this.Axes[0]>0&&d(this,m)[m].classList.add("active"),0==this.Axes[1]?(d(this,g)[g].classList.remove("active"),d(this,w)[w].classList.remove("active")):this.Axes[1]<0?d(this,g)[g].classList.add("active"):this.Axes[1]>0&&d(this,w)[w].classList.add("active")},r}(/*#__PURE__*/o(HTMLElement));function N(){for(var t=this,e=function(e){document.addEventListener(d(t,f)[f].ButtonEvents[e],function(n){return d(t,O)[O](n,e)})},n=0;n<d(this,v)[v];n++)e(n)}function L(t,e){d(this,b)[b][e].style.filter="hue-rotate("+360*Math.random()+"deg)"}function J(){var t=document.createElement("div");t.className="button-wrapper";for(var e=0;e<d(this,v)[v];e++){var n=document.createElement("div");n.className="button-div",t.appendChild(n),n.style.backgroundColor="blue",n.innerHTML="Button "+(e+1),d(this,b)[b].push(n)}d(this,j)[j].appendChild(t)}function A(){var t=document.createElement("div");t.className="axes-wrapper";for(var e=1;e<=9;e++){var n=document.createElement("div");switch(n.className="axes-cell",e%2==0&&n.classList.add("direction"),5==e&&n.classList.add("center"),t.appendChild(n),e){case 2:d(this,g)[g]=n;break;case 4:d(this,y)[y]=n;break;case 6:d(this,m)[m]=n;break;case 8:d(this,w)[w]=n}}d(this,j)[j].appendChild(t)}window.customElements.define("debug-panel",E);var B=/*#__PURE__*/u("DEBUG"),G=/*#__PURE__*/u("BUT1"),T=/*#__PURE__*/u("BUT2"),C=/*#__PURE__*/u("joystickNumber"),M=/*#__PURE__*/u("numberOfBUttons"),R=/*#__PURE__*/u("buttonEvents"),S=/*#__PURE__*/u("axes"),_=/*#__PURE__*/u("gamepad"),U=/*#__PURE__*/u("previousGamepad"),D=/*#__PURE__*/u("previousJoystickDirection"),H=/*#__PURE__*/u("readGamepad"),F=/*#__PURE__*/u("buttonPressed"),I=/*#__PURE__*/function(){function t(t,e,n){Object.defineProperty(this,F,{value:Y}),Object.defineProperty(this,H,{value:X}),Object.defineProperty(this,B,{writable:!0,value:!0}),Object.defineProperty(this,G,{writable:!0,value:8}),Object.defineProperty(this,T,{writable:!0,value:9}),Object.defineProperty(this,C,{writable:!0,value:0}),Object.defineProperty(this,M,{writable:!0,value:0}),Object.defineProperty(this,R,{writable:!0,value:[]}),Object.defineProperty(this,S,{writable:!0,value:[]}),Object.defineProperty(this,_,{writable:!0,value:void 0}),Object.defineProperty(this,U,{writable:!0,value:void 0}),Object.defineProperty(this,D,{writable:!0,value:void 0}),d(this,C)[C]=t,d(this,M)[M]=e,d(this,B)[B]=n;for(var i=0;i<d(this,M)[M];i++)d(this,R)[R].push("joystick"+this.JoystickNumber+"button"+i);d(this,R)[R].push("joystick"+this.JoystickNumber+"neutral"),d(this,R)[R].push("joystick"+this.JoystickNumber+"left"),d(this,R)[R].push("joystick"+this.JoystickNumber+"right"),d(this,R)[R].push("joystick"+this.JoystickNumber+"up"),d(this,R)[R].push("joystick"+this.JoystickNumber+"down"),d(this,D)[D]="neutral",d(this,B)[B]&&(this.debugPanel=new E(this,d(this,M)[M]))}var n=t.prototype;return n.update=function(){if(void 0!==d(this,_)[_]&&void 0!==d(this,_)[_].index&&void 0!==navigator.getGamepads()[d(this,_)[_].index]){var t=navigator.getGamepads()[d(this,_)[_].index];t&&d(this,H)[H](t)}},n.destroy=function(){d(this,B)[B]&&this.debugPanel.remove()},e(t,[{key:"Left",get:function(){return-1==d(this,S)[S][0]}},{key:"Right",get:function(){return 1==d(this,S)[S][0]}},{key:"Up",get:function(){return-1==d(this,S)[S][1]}},{key:"Down",get:function(){return 1==d(this,S)[S][1]}},{key:"Neutral",get:function(){return 0==d(this,S)[S][0]&&0==d(this,S)[S][1]}},{key:"Y",get:function(){return Math.round(d(this,S)[S][1])}},{key:"X",get:function(){return Math.round(d(this,S)[S][0])}},{key:"JoystickNumber",get:function(){return d(this,C)[C]}},{key:"ButtonEvents",get:function(){return d(this,R)[R]}},{key:"Gamepad",get:function(){return d(this,_)[_]},set:function(t){d(this,_)[_]=t}},{key:"PreviousGamepad",get:function(){return d(this,U)[U]},set:function(t){d(this,U)[U]=t}}]),t}();function X(t){for(var e=0;e<d(this,M)[M];e++)d(this,F)[F](t.buttons[e])&&!d(this,F)[F](d(this,U)[U].buttons[e])&&document.dispatchEvent(new Event(d(this,R)[R][e])),!d(this,F)[F](t.buttons[d(this,G)[G]])||!d(this,F)[F](t.buttons[d(this,T)[T]])||d(this,F)[F](d(this,U)[U].buttons[d(this,G)[G]])&&d(this,F)[F](d(this,U)[U].buttons[d(this,T)[T]])||document.dispatchEvent(new Event("redirect"));d(this,S)[S][0]=Math.round(t.axes[0]),d(this,S)[S][1]=Math.round(t.axes[1]),d(this,B)[B]&&(this.debugPanel.Axes[0]=d(this,S)[S][0],this.debugPanel.Axes[1]=d(this,S)[S][1],this.debugPanel.update()),this.Left&&"left"!==d(this,D)[D]&&(d(this,D)[D]="left",document.dispatchEvent(new Event("joystick"+this.JoystickNumber+"left"))),this.Right&&"right"!==d(this,D)[D]&&(d(this,D)[D]="right",document.dispatchEvent(new Event("joystick"+this.JoystickNumber+"right"))),this.Up&&"up"!==d(this,D)[D]&&(d(this,D)[D]="up",document.dispatchEvent(new Event("joystick"+this.JoystickNumber+"up"))),this.Down&&"down"!==d(this,D)[D]&&(d(this,D)[D]="down",document.dispatchEvent(new Event("joystick"+this.JoystickNumber+"down"))),this.Neutral&&"neutral"!==d(this,D)[D]&&(d(this,D)[D]="neutral",document.dispatchEvent(new Event("joystick"+this.JoystickNumber+"neutral"))),d(this,U)[U]=t}function Y(t){return"object"==typeof t?t.pressed:1==t}var $=/*#__PURE__*/u("DEBUG"),q=/*#__PURE__*/u("joysticks"),z=/*#__PURE__*/u("REDIRECT_URL"),K=/*#__PURE__*/u("multiplayer"),Q=/*#__PURE__*/u("game"),V=/*#__PURE__*/u("onRedirect"),W=/*#__PURE__*/u("onGamePadConnected"),Z=/*#__PURE__*/u("onGamePadDisconnected"),tt=/*#__PURE__*/u("showStatus"),et=/*#__PURE__*/u("removeStatus"),nt=/*#__PURE__*/function(){function t(t,e,n){var i=this;void 0===e&&(e=!1),void 0===n&&(n=!1),Object.defineProperty(this,et,{value:at}),Object.defineProperty(this,tt,{value:st}),Object.defineProperty(this,Z,{value:ot}),Object.defineProperty(this,W,{value:rt}),Object.defineProperty(this,V,{value:it}),Object.defineProperty(this,$,{writable:!0,value:void 0}),Object.defineProperty(this,q,{writable:!0,value:void 0}),Object.defineProperty(this,z,{writable:!0,value:"http://hr-cmgt.github.io/arcade-server"}),Object.defineProperty(this,K,{writable:!0,value:!1}),Object.defineProperty(this,Q,{writable:!0,value:void 0}),d(this,Q)[Q]=t,d(this,K)[K]=e,d(this,$)[$]=n,d(this,q)[q]=[],d(this,$)[$]&&d(this,tt)[tt]("Gamepad is NOT connected. Press a button to connect"),document.addEventListener("redirect",function(){return d(i,V)[V]()}),window.addEventListener("gamepadconnected",function(t){return d(i,W)[W](t)}),window.addEventListener("gamepaddisconnected",function(t){return d(i,Z)[Z](t)})}var n=t.prototype;return n.createAndAddJoystick=function(t,e){var n=this.getJoystickByNumber(t);if(null!=n)return n;var i=new I(t,e,d(this,$)[$]);return d(this,q)[q][t]=i,i&&(document.dispatchEvent(new CustomEvent("joystickcreated",{detail:t})),console.log("joystick created")),i},n.removeJoystick=function(t){var e=this.getJoystickByNumber(t);if(null!=e){var n=d(this,q)[q].indexOf(e);"function"==typeof d(this,q)[q][n].destroy&&d(this,q)[q][n].destroy(),n>-1&&d(this,q)[q].splice(n,1)}},n.getJoystickByNumber=function(t){for(var e,n=function(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(n)return(n=n.call(t)).next.bind(n);if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return a(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(t,e):void 0}}(t))){n&&(t=n);var i=0;return function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(d(this,q)[q]);!(e=n()).done;){var i=e.value;if(i.JoystickNumber==t)return i}return null},e(t,[{key:"Joysticks",get:function(){return d(this,q)[q]}}]),t}();function it(){d(this,$)[$]&&console.log("redirect!!"),window.location.href=d(this,z)[z]}function rt(t){if(d(this,$)[$]&&(console.log("Game pad connected"),console.log("Joystick number: "+t.gamepad.index)),!d(this,K)[K]&&0==d(this,q)[q].length||d(this,K)[K]){var e=this.createAndAddJoystick(t.gamepad.index,6);e.PreviousGamepad=e.Gamepad,e.Gamepad=t.gamepad,null==e.PreviousGamepad&&(e.PreviousGamepad=t.gamepad)}d(this,$)[$]&&d(this,et)[et]()}function ot(t){d(this,$)[$]&&console.log("Game pad disconnected"),d(this,$)[$]&&d(this,tt)[tt]("Gamepad is NOT connected. Connect the gamepad and press a button."),this.removeJoystick(t.gamepad.index),d(this,Q)[Q].disconnect()}function st(t){var e,n;(e=document.getElementsByTagName("status")[0])||(e=document.createElement("status"),document.body.append(e)),e&&((n=e.getElementsByTagName("p")[0])||(n=document.createElement("p"),e.appendChild(n))),n&&(n.innerHTML=t)}function at(){var t;(t=document.getElementsByTagName("status")[0])&&t.remove()}export{nt as Arcade};
//# sourceMappingURL=arcade.module.js.map
