'use strict';

window.game = {};
window.game.path = document.querySelector('link[rel=template]').href.split("/template")[0];
window.game.level = 1;

var Game = require("./controllers/game");
var Home = require("./controllers/home");
var Retry = require("./controllers/retry");
var Win = require("./controllers/win");
var Social = require("./controllers/social");

var ScreenManager = require("./managers/screenManager");
ScreenManager.views= {
	"game": Game,
	"home": Home,
	"retry": Retry,
	"win": Win,
	"social": Social
}

ScreenManager.emit("go", { screen: "home", data: { level: 1 } });
