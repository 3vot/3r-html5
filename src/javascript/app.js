'use strict';

console.log( document.querySelector( "link" ) );

window.game = {};
window.game.path = document.querySelector('link[rel=template]').href.split("/template.js")[0];


var Game = require("./controllers/game");

var container = document.querySelector(".container");

var button = document.querySelector(".btn")

button.onclick = function(){
	Game(container);	
}

