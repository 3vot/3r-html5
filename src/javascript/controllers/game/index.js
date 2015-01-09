var Layout = require("./layout");

var data = require("../../../htdocs/data/game.json")

var Game = function( container ){
	var _this = this;
	this.lastAudio;

	var sounds = [] ;

	for (var i = data.sounds.length - 1; i >= 0; i--) {
		var sound = data.sounds[i];
		if(sound.level == window.game.level) sounds.push( sound );
	};

	container.innerHTML = Layout( sounds );

	var gameContainer = container.querySelector(".game");

	gameContainer.onclick = function(e){ _this.playAudio(e); }

}

Game.prototype.playAudio = function(e){
	var target = e.target;
	while( target.classList.length == 0 || ( !target.classList.contains("audioBox") && !target.hasClass("container")  ) ) target = target.parentNode
	
	var audio = target.querySelector("audio");
	if(this.lastAudio) this.lastAudio.pause();
	if(audio){
		audio.currentTime = 0;
		audio.play();
		this.lastAudio = audio;
	}

}

module.exports = Game;

