(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/javascript/app.js":[function(require,module,exports){
'use strict';

var Game = require("./controllers/game");

var container = document.querySelector(".container");

var button = document.querySelector(".btn")

button.onclick = function(){
	Game(container);	
}


},{"./controllers/game":"/Users/roberto/proyectos/fusion/retrosounds/src/javascript/controllers/game/index.js"}],"/Users/roberto/proyectos/fusion/retrosounds/src/htdocs/data/game.json":[function(require,module,exports){
module.exports=module.exports=module.exports=module.exports=module.exports=module.exports=module.exports=module.exports=module.exports=module.exports=module.exports=module.exports=module.exports=module.exports=module.exports=module.exports=module.exports=module.exports=module.exports=module.exports=module.exports=module.exports=module.exports={

	"sounds":[

		{"sound": "", "name": "xerox", "image": "","level":1 },
		{"sound": "", "name": "phone", "image": "","level":1 },
		{"sound": "", "name": "modem", "image": "" ,"level":1 },
		{"sound": "", "name": "vcr", "image": "" ,"level":1 },
		{"sound": "", "name": "modelT", "image": "" ,"level":1 },
		{"sound": "", "name": "pager", "image": "" ,"level":2 },
		{"sound": "", "name": "canOpener", "image": "" ,"level":2 },
		{"sound": "", "name": "hairDryer", "image": "" ,"level":2 },
		{"sound": "", "name": "busyTone", "image": "" ,"level":2 },
		{"sound": "", "name": "floppy", "image": "" ,"level":3 },
		{"sound": "", "name": "nintendo", "image": "" ,"level":3 },
		{"sound": "", "name": "slideProjector", "image": "" ,"level": 3 },
		{"sound": "", "name": "aol", "image": "" ,"level": 3 },
		{"sound": "", "name": "iphoneSMS", "image": "" ,"level": 3 },
	
	]
}
},{}],"/Users/roberto/proyectos/fusion/retrosounds/src/javascript/controllers/game/index.js":[function(require,module,exports){
var Layout = require("./layout");

var data = require("../../../htdocs/data/game.json")

var lastAudio;


function Game( container ){

	container.innerHTML = Layout( data );

	var gameContainer = container.querySelector(".game");

	gameContainer.onclick = function(e){
		var target = e.target;
		while( target.classList.length == 0 || ( !target.classList.contains("audioBox") && !target.hasClass("container")  ) ) target = target.parentNode
		
		var audio = target.querySelector("audio");
		if(lastAudio) lastAudio.pause();
		if(audio) audio.play();
		lastAudio = audio;

	}

}


module.exports = Game;


},{"../../../htdocs/data/game.json":"/Users/roberto/proyectos/fusion/retrosounds/src/htdocs/data/game.json","./layout":"/Users/roberto/proyectos/fusion/retrosounds/src/javascript/controllers/game/layout.eco"}],"/Users/roberto/proyectos/fusion/retrosounds/src/javascript/controllers/game/layout.eco":[function(require,module,exports){
module.exports = function(__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      var sound, _i, _j, _len, _len1, _ref, _ref1;
    
      __out.push('\n<div class="game">\n\t\n\t<div class="soundSlider">\n\n\t');
    
      _ref = this.sounds;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sound = _ref[_i];
        __out.push('\n\n\t<div data-id="');
        __out.push(__sanitize(sound.name));
        __out.push('" class="audioBox">\n\t\t<img src="/images/soundIcon.png"/>\n\t\t\t<audio class="');
        __out.push(__sanitize(sound.name));
        __out.push('" src="/sounds/');
        __out.push(__sanitize(sound.name));
        __out.push('.mp3" type="audio/mpeg"></audio>\n\t\t\n\t</div>\n\n\t');
      }
    
      __out.push('\n\n\t</div>\n\n\t<div class="machineSlider">\n\t\t\n\t');
    
      _ref1 = this.sounds;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        sound = _ref1[_j];
        __out.push('\n\n\t\t\t<div data-id="');
        __out.push(__sanitize(sound.name));
        __out.push('" class="imageBox">\n\t\t\t\t<img src="/images/');
        __out.push(__sanitize(sound.name));
        __out.push('.png"/>\n\t\t\t</div>\n\n\t\t');
      }
    
      __out.push('\n\n\t</div>\t\n\n\n</div>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
},{}]},{},["./src/javascript/app.js"]);
