'use strict';

var Game = require("./controllers/game");

var container = document.querySelector(".container");

var button = document.querySelector(".btn")

button.onclick = function(){
	Game(container);	
}

