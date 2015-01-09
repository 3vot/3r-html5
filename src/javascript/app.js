'use strict';

window.game = {};
window.game.path = document.querySelector('link[rel=template]').href.split("/template")[0];
window.game.level = 1;

	var Game = require("./controllers/game");
	var Home = require("./controllers/home");



var ScreenManager = require("./managers/screenManager");
ScreenManager.views= {
	"game":Game,
	"home": Home
}

ScreenManager.emit("go","home");
