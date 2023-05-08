// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"1jHIt":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "321b2c83e511880c";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"g9e9u":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Game", ()=>Game
);
var _arcade = require("./arcade/arcade");
class Game {
    #arcade;
    #joystickListener;
    constructor(){
        // this = current game
        // true = multiplayer
        // true = debug
        this.#arcade = new _arcade.Arcade(this, true, true);
        // The game must wait for de joysticks to connect
        console.log("waiting for joysticks to connect");
        this.#joystickListener = (e)=>this.#joyStickFound(e)
        ;
        document.addEventListener("joystickcreated", this.#joystickListener);
    }
     #joyStickFound(e) {
        let joystick = this.#arcade.Joysticks[e.detail];
        // debug, this shows you the names of the buttons when they are pressed
        for (const buttonEvent of joystick.ButtonEvents)document.addEventListener(buttonEvent, ()=>console.log(buttonEvent)
        );
        this.update();
    }
    update() {
        for (let joystick of this.#arcade.Joysticks)joystick.update();
        requestAnimationFrame(()=>this.update()
        );
    }
    disconnect() {
        document.removeEventListener("joystickcreated", this.#joystickListener);
    }
}
new Game();

},{"./arcade/arcade":"1TKiB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1TKiB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Arcade", ()=>Arcade
);
var _game = require("../game");
var _joystick = require("./joystick");
class Arcade {
    #DEBUG;
    #joysticks;
    #REDIRECT_URL = "http://hr-cmgt.github.io/arcade-server";
    #multiplayer = false;
    #game;
    // PROPERTIES
    get Joysticks() {
        return this.#joysticks;
    }
    /**
     * Creates an arcade 'cabinet' 
     * @param mp 'true' for 2 joystick multiplayer Arcade (default single player)
     */ constructor(game, mp = false, debug = false){
        this.#game = game;
        this.#multiplayer = mp;
        this.#DEBUG = debug;
        this.#joysticks = [];
        if (this.#DEBUG) this.#showStatus("Gamepad is NOT connected. Press a button to connect");
        document.addEventListener("redirect", ()=>this.#onRedirect()
        );
        window.addEventListener("gamepadconnected", (e)=>this.#onGamePadConnected(e)
        );
        window.addEventListener("gamepaddisconnected", (e)=>this.#onGamePadDisconnected(e)
        );
    }
    /**
     * Handles redirect fired from joystick
     */  #onRedirect() {
        if (this.#DEBUG) console.log('redirect!!');
        window.location.href = this.#REDIRECT_URL;
    }
    /**
     * Handles connecting a joystick
     * @param e Gamepad event
     */  #onGamePadConnected(e) {
        if (this.#DEBUG) {
            console.log('Game pad connected');
            console.log("Joystick number: " + e.gamepad.index);
        }
        if (!this.#multiplayer && this.#joysticks.length == 0 || this.#multiplayer) {
            let joystick = this.createAndAddJoystick(e.gamepad.index, 6);
            joystick.PreviousGamepad = joystick.Gamepad;
            joystick.Gamepad = e.gamepad;
            if (joystick.PreviousGamepad == null) joystick.PreviousGamepad = e.gamepad;
        }
        if (this.#DEBUG) this.#removeStatus();
    }
    /**
     * Handles disconnecting a joystick
     * @param e Gamepad event
     */  #onGamePadDisconnected(e1) {
        if (this.#DEBUG) console.log('Game pad disconnected');
        if (this.#DEBUG) this.#showStatus("Gamepad is NOT connected. Connect the gamepad and press a button.");
        this.removeJoystick(e1.gamepad.index);
        this.#game.disconnect();
    }
    /**
     * Creates an Joystick and adds it to this arcade
     * @param joystickNumber Unique identifier given by the joystick
     * @param numOfButtons Sets number of buttons on joystick
     */ createAndAddJoystick(joystickNumber, numOfButtons) {
        let joystickCheck = this.getJoystickByNumber(joystickNumber);
        if (joystickCheck != null) return joystickCheck;
        let joystickNew = new _joystick.Joystick(joystickNumber, numOfButtons, this.#DEBUG);
        this.#joysticks[joystickNumber] = joystickNew;
        if (joystickNew) {
            document.dispatchEvent(new CustomEvent("joystickcreated", {
                detail: joystickNumber
            }));
            console.log("joystick created");
        }
        return joystickNew;
    }
    /**
     * Removes a Joystick from this arcade
     * @param joystickNumber Unique identifier of the joystick
     */ removeJoystick(joystickNumber) {
        let joystickCheck = this.getJoystickByNumber(joystickNumber);
        if (joystickCheck == null) return;
        var index = this.#joysticks.indexOf(joystickCheck);
        if (typeof this.#joysticks[index].destroy === 'function') this.#joysticks[index].destroy();
        if (index > -1) this.#joysticks.splice(index, 1);
    }
    /**
     * Get a Joystick with its unique identifier
     * @param joystickNumber Unique identifier given by the joystick
     */ getJoystickByNumber(joystickNumber) {
        for (let joystick of this.#joysticks){
            if (joystick.JoystickNumber == joystickNumber) return joystick;
        }
        return null;
    }
     #showStatus(content) {
        let container;
        let p;
        if (!(container = document.getElementsByTagName("status")[0])) {
            container = document.createElement("status");
            document.body.append(container);
        }
        if (container) {
            if (!(p = container.getElementsByTagName("p")[0])) {
                p = document.createElement("p");
                container.appendChild(p);
            }
        }
        if (p) p.innerHTML = content;
    }
     #removeStatus() {
        let status;
        if (status = document.getElementsByTagName("status")[0]) status.remove();
    }
}

},{"../game":"g9e9u","./joystick":"f9WQZ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"f9WQZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Joystick", ()=>Joystick
);
var _debugpanel = require("./debugpanel");
class Joystick {
    #DEBUG = true;
    // BUT1 and BUT2 are the indexes of the redirect function. 
    // When both are pressed, redirect to homepage
    #BUT1 = 8;
    #BUT2 = 9;
    // FIELDS
    #joystickNumber = 0;
    #numberOfBUttons = 0;
    #buttonEvents = [];
    #axes = [];
    #gamepad;
    #previousGamepad;
    #previousJoystickDirection;
    // #debugPanell //DebugPanel
    // PROPERTIES
    // Axes as booleans
    get Left() {
        return this.#axes[0] == -1;
    }
    get Right() {
        return this.#axes[0] == 1;
    }
    get Up() {
        return this.#axes[1] == -1;
    }
    get Down() {
        return this.#axes[1] == 1;
    }
    get Neutral() {
        return this.#axes[0] == 0 && this.#axes[1] == 0;
    }
    // Axes as direction
    // values are -1, 0, 1 because arcade sticks are digital
    get Y() {
        return Math.round(this.#axes[1]);
    }
    get X() {
        return Math.round(this.#axes[0]);
    }
    // Joystick identifier
    get JoystickNumber() {
        return this.#joystickNumber;
    }
    get ButtonEvents() {
        return this.#buttonEvents;
    }
    // Current gamepad
    get Gamepad() {
        return this.#gamepad;
    }
    set Gamepad(gamepad) {
        this.#gamepad = gamepad;
    }
    // previous gamepad
    get PreviousGamepad() {
        return this.#previousGamepad;
    }
    set PreviousGamepad(previousGamepad) {
        this.#previousGamepad = previousGamepad;
    }
    /**
     * Creates a joystick object for one player
     * @param joystickNumber The number of the first joystick (starts at 0)
     * @param numOfButtons The number of buttons needed by your game
     * @param debug true for in browser gamepad info
     */ constructor(joystickNumber, numOfButtons, debug){
        this.#joystickNumber = joystickNumber;
        this.#numberOfBUttons = numOfButtons;
        this.#DEBUG = debug;
        for(let i = 0; i < this.#numberOfBUttons; i++)this.#buttonEvents.push('joystick' + this.JoystickNumber + 'button' + i);
        this.#buttonEvents.push('joystick' + this.JoystickNumber + 'neutral');
        this.#buttonEvents.push('joystick' + this.JoystickNumber + 'left');
        this.#buttonEvents.push('joystick' + this.JoystickNumber + 'right');
        this.#buttonEvents.push('joystick' + this.JoystickNumber + 'up');
        this.#buttonEvents.push('joystick' + this.JoystickNumber + 'down');
        this.#previousJoystickDirection = 'neutral';
        if (this.#DEBUG) this.debugPanel = new _debugpanel.DebugPanel(this, this.#numberOfBUttons);
    }
    update() {
        if (typeof this.#gamepad === 'undefined' || typeof this.#gamepad.index === 'undefined' || typeof navigator.getGamepads()[this.#gamepad.index] === 'undefined') return;
        let gamepad = navigator.getGamepads()[this.#gamepad.index];
        if (gamepad) this.#readGamepad(gamepad);
    }
     #readGamepad(gamepad) {
        for(let index = 0; index < this.#numberOfBUttons; index++){
            if (this.#buttonPressed(gamepad.buttons[index]) && !this.#buttonPressed(this.#previousGamepad.buttons[index])) document.dispatchEvent(new Event(this.#buttonEvents[index]));
            if (this.#buttonPressed(gamepad.buttons[this.#BUT1]) && this.#buttonPressed(gamepad.buttons[this.#BUT2]) && (!this.#buttonPressed(this.#previousGamepad.buttons[this.#BUT1]) || !this.#buttonPressed(this.#previousGamepad.buttons[this.#BUT2]))) document.dispatchEvent(new Event('redirect'));
        }
        // gamepad has 4 axes, first is x, second is y
        // an axe returns a float, only int is needed
        this.#axes[0] = Math.round(gamepad.axes[0]);
        this.#axes[1] = Math.round(gamepad.axes[1]);
        if (this.#DEBUG) {
            // update the axes (x and y)
            this.debugPanel.Axes[0] = this.#axes[0];
            this.debugPanel.Axes[1] = this.#axes[1];
            this.debugPanel.update();
        }
        if (this.Left && this.#previousJoystickDirection !== 'left') {
            this.#previousJoystickDirection = 'left';
            document.dispatchEvent(new Event('joystick' + this.JoystickNumber + 'left'));
        }
        if (this.Right && this.#previousJoystickDirection !== 'right') {
            this.#previousJoystickDirection = 'right';
            document.dispatchEvent(new Event('joystick' + this.JoystickNumber + 'right'));
        }
        if (this.Up && this.#previousJoystickDirection !== 'up') {
            this.#previousJoystickDirection = 'up';
            document.dispatchEvent(new Event('joystick' + this.JoystickNumber + 'up'));
        }
        if (this.Down && this.#previousJoystickDirection !== 'down') {
            this.#previousJoystickDirection = 'down';
            document.dispatchEvent(new Event('joystick' + this.JoystickNumber + 'down'));
        }
        if (this.Neutral && this.#previousJoystickDirection !== 'neutral') {
            this.#previousJoystickDirection = 'neutral';
            document.dispatchEvent(new Event('joystick' + this.JoystickNumber + 'neutral'));
        }
        // console.log(this.#previousJoystickDirection);
        this.#previousGamepad = gamepad;
    }
    /**
     * Helper function to filter some bad input
     * @param b 
     */  #buttonPressed(b) {
        if (typeof b == "object") return b.pressed;
        return b == 1;
    }
    destroy() {
        if (this.#DEBUG) this.debugPanel.remove();
    }
}

},{"./debugpanel":"6rr3b","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6rr3b":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
//#endregion
parcelHelpers.export(exports, "DebugPanel", ()=>DebugPanel
);
var _joystick = require("./joystick");
//#region Template
const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
    position:           absolute;
    top:                10px;
    right:              10px;
}
root {
    top:                10px;
    right:              10px;
    width:              289px; 
    height:             120px;
    display:            block;
    background-color:   #75a8f77a;
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
    background-color:   blue;
}
.axes-cell.active{
    background-color:   red;
}
.identifier{
    position:           absolute;
    top:                5px;
    left:               5px;
    width:              auto;
    font-weight:        bold;
    color:              #fff;
}
</style>`;
class DebugPanel extends HTMLElement {
    #panelHeight = 120;
    #panelSpacing = 10;
    #joystick;
    #numberOfButtons;
    #buttonDivs = [];
    #left;
    #right;
    #up;
    #down;
    #rootElement;
    Axes = [];
    constructor(joystick, numOfButtons){
        super();
        this.#joystick = joystick;
        this.#numberOfButtons = numOfButtons;
        let spaceFromTop = this.#panelSpacing + this.#joystick.JoystickNumber * (this.#panelHeight + this.#panelSpacing);
        this.style.top = spaceFromTop + "px";
        this.#rootElement = document.createElement('root');
        this.#rootElement.style.height = this.#panelHeight + "px";
        template.appendChild(this.#rootElement);
        // identifier
        let identifier = document.createElement("div");
        identifier.classList.add('identifier');
        identifier.innerHTML = "#" + this.#joystick.JoystickNumber;
        this.#rootElement.appendChild(identifier);
        // axes
        this.#createHTMLForAxes();
        // this.buttons = buttons
        this.#createHTMLForButtons();
        this.#createListenersForButtons();
        this.attachShadow({
            mode: 'open'
        });
        if (this.shadowRoot) {
            let temp = template.content.cloneNode(true);
            temp.appendChild(this.#rootElement);
            this.shadowRoot.appendChild(temp);
        }
        document.body.appendChild(this);
    }
     #createListenersForButtons() {
        for(let i = 0; i < this.#numberOfButtons; i++)document.addEventListener(this.#joystick.ButtonEvents[i], (e)=>this.#handleButtonClicks(e, i)
        );
    }
     #handleButtonClicks(event, index) {
        this.#buttonDivs[index].style.filter = 'hue-rotate(' + Math.random() * 360 + 'deg)';
    }
     #createHTMLForButtons() {
        let buttonWrapper = document.createElement("div");
        buttonWrapper.className = "button-wrapper";
        for(let index = 0; index < this.#numberOfButtons; index++){
            let buttonDiv = document.createElement("div");
            buttonDiv.className = "button-div";
            buttonWrapper.appendChild(buttonDiv);
            buttonDiv.style.backgroundColor = "blue";
            buttonDiv.innerHTML = "Button " + (index + 1);
            this.#buttonDivs.push(buttonDiv);
        }
        this.#rootElement.appendChild(buttonWrapper);
    }
     #createHTMLForAxes() {
        let axesWrapper = document.createElement("div");
        axesWrapper.className = "axes-wrapper";
        for(let i = 1; i <= 9; i++){
            let cell = document.createElement('div');
            cell.className = "axes-cell";
            if (i % 2 == 0) cell.classList.add("direction");
            if (i == 5) cell.classList.add("center");
            axesWrapper.appendChild(cell);
            switch(i){
                case 2:
                    this.#up = cell;
                    break;
                case 4:
                    this.#left = cell;
                    break;
                case 6:
                    this.#right = cell;
                    break;
                case 8:
                    this.#down = cell;
                    break;
            }
        }
        this.#rootElement.appendChild(axesWrapper);
    }
    update() {
        // X-axe
        if (this.Axes[0] == 0) {
            this.#left.classList.remove("active");
            this.#right.classList.remove("active");
        } else {
            if (this.Axes[0] < 0) this.#left.classList.add("active");
            else if (this.Axes[0] > 0) this.#right.classList.add("active");
        }
        // Y-axe
        if (this.Axes[1] == 0) {
            this.#up.classList.remove("active");
            this.#down.classList.remove("active");
        } else {
            if (this.Axes[1] < 0) this.#up.classList.add("active");
            else if (this.Axes[1] > 0) this.#down.classList.add("active");
        }
    }
}
window.customElements.define("debug-panel", DebugPanel);

},{"./joystick":"f9WQZ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["1jHIt","g9e9u"], "g9e9u", "parcelRequirea0e5")

//# sourceMappingURL=index.e511880c.js.map
