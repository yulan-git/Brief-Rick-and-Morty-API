// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
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
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/functions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._fetchData = _fetchData;
exports._fetchDataAll = _fetchDataAll;

function _fetchData(url) {
  return fetch(url).then(function (res) {
    return res.json();
  });
}

function _fetchDataAll(array) {
  return Promise.all(array.map(function (url) {
    return _fetchData(url);
  })).then(function (resp) {
    return Promise.all(resp.map(function (res) {
      return res;
    }));
  });
}
},{}],"js/script_location.js":[function(require,module,exports) {
"use strict";

var _functions = require("/js/functions.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//----------------Partie Flora-----------------
function pageLocation() {
  function pikcTypeInfos() {
    var containerLocation = document.querySelector(".container__location"); // tableau pour récupérer les url de toutes les pages

    var uriS = []; // tableau dans lequel sera insérer les différents types de lieux

    var listTypes = []; //boucles sur les uri de tous les pages qu'on insère dans le tableau uriS

    for (var index = 0; index < 7; index++) {
      uriS.push("https://rickandmortyapi.com/api/location?page=" + index);
    }

    (0, _functions._fetchDataAll)(uriS).then(function (locations) {
      locations.forEach(function (location) {
        location.results.forEach(function (res) {
          listTypes.push(res.type);
        });
      });
      createListType();
    });

    function createListType() {
      var typeArray = _toConsumableArray(new Set(listTypes));

      typeArray.sort();

      for (var i = 0; i < typeArray.length; i++) {
        var radioButton = typeArray[i];
        containerLocation.appendChild(createLabel(radioButton));
      }
    }
  }

  function createLabel(radioButton) {
    var label = document.createElement("label");
    label.setAttribute("class", "type__label");
    label.textContent = radioButton;
    label.appendChild(createInput(radioButton));
    return label;
  }

  function createInput(radioButton) {
    var input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("id", radioButton);
    input.setAttribute("value", radioButton);
    input.setAttribute("name", "typeLocation");
    input.addEventListener("change", showPlanets);
    return input;
  }

  function showPlanets(e) {
    var lieux = document.querySelector(".container__planets");
    lieux.innerHTML = "";
    var type = e.target.value;
    var url = "https://rickandmortyapi.com/api/location?type=" + type;
    fetch(url).then(function (resp) {
      return resp.json();
    }).then(function (planets) {
      var locations = planets.results;
      var str = locations.forEach(function (location) {
        lieux.innerHTML += "<div class=\"planet\">\n                <h2 class=\"planet__name\" data-url=\"".concat(location.url, "\" >").concat(location.name, "</h2>\n                <p class=\"planet__type\">").concat(location.type, "</p>\n                <p class=\"planet__dimension\">").concat(location.dimension, "</p>\n            </div>");
      });
      eventClickTitle();
      return str;
    }).catch(function (error) {
      console.error(error);
    });
  }

  function locations() {
    var url = "https://rickandmortyapi.com/api/location?page=";
    (0, _functions._fetchData)(url).then(function (locations) {
      var results = locations.results;
      createLocations(results);
    });
  }

  function createLocations(locations) {
    var containerPlanets = document.querySelector(".container__planets");
    console.log(locations);
    locations.forEach(function (location) {
      containerPlanets.innerHTML += createLocation(location);
    });
    eventClickTitle();
  }

  function createLocation(location) {
    return "<div class=\"planet\">\n                    <h2 class=\"planet__name\" data-url=\"".concat(location.url, "\" >").concat(location.name, "</h2>\n                    <p class=\"planet__type\">").concat(location.type, "</p>\n                    <p class=\"planet__dimension\">").concat(location.dimension, "</p>\n                </div>");
  }

  function eventClickTitle() {
    var titles = document.querySelectorAll(".container__planets .planet__name");
    titles.forEach(function (title) {
      title.addEventListener("click", showResidents);
    });
  }

  function showResidents(event) {
    console.log(event.target.dataset.url);
    (0, _functions._fetchData)(event.target.dataset.url).then(function (locations) {
      console.log(locations);
      (0, _functions._fetchDataAll)(locations.residents).then(function (residents) {
        var modalResident = document.querySelector(".modal__resident");
        console.log(residents);
        modalResident.innerHTML = createResident(residents);
        var modal = document.querySelector("#myModal");

        if (residents.length == 0) {
          modal.innerHTML = "Aucun habitant sur cette planète";
          var span = document.createElement("span");
          span.setAttribute("class", "close");
          span.innerHTML = "&times;";
          modal.appendChild(span);
        }

        modal.style.display = "block";
        var closeButton = document.querySelector(".close");
        closeButton.addEventListener("click", function () {
          modal.style.display = "none";
        });
      });
    }).catch(function (error) {
      console.error(error);
    });
  }

  function createResident(residents) {
    var str = "\n                    <div id=\"myModal\" class=\"modal\"><span class=\"close\">&times;</span>\n                    <h2 class=\"title__secondaire\"> Les habitants</h2>\n                    <div class=\"modal__content\">";
    residents.forEach(function (resident) {
      str += "<div class=\"modal__container\">\n                                <div class=\"modal__img\">\n                                    <img src=\"".concat(resident.image, "\" alt=\"image\">\n                                </div>\n                                <div class=\"modal__card\">\n                                    <a class=\"card__name\" >Name : ").concat(resident.name, "</a>\n                                    <p>Status : ").concat(resident.status, "</p>\n                                    <p>Species : ").concat(resident.species, "</p>\n                                </div>\n                            </div>");
    });
    str += "</div>\n                    </div>";
    return str;
  }

  function pagination() {
    var pages = document.querySelector(".pagination");
    pages.addEventListener("click", function (e) {
      var lieux = document.querySelector(".container__planets");
      lieux.innerHTML = "";
      var idPage = e.target.getAttribute("id");
      var url = "https://rickandmortyapi.com/api/location?page=" + idPage;
      (0, _functions._fetchData)(url).then(function (locations) {
        var results = locations.results;
        createLocations(results);
      });
    });
  }

  pikcTypeInfos();
  locations();
  pagination();
}

pageLocation();
},{"/js/functions.js":"js/functions.js"}],"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50340" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/script_location.js"], null)
//# sourceMappingURL=/script_location.047fa2c3.js.map