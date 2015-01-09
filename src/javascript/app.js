'use strict';

window.game = {};
window.game.path = document.querySelector('link[rel=template]').href.split("/template")[0];
window.game.level = 1;


var Game = require("./controllers/game");

var container = document.querySelector(".container");

var button = document.querySelector(".btn")

button.onclick = function(){
	var gameScreen = new Game(container);	
}

