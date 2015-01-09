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
		if(audio){
			audio.currentTime = 0;
			audio.play();
			lastAudio = audio;
		}

	}

}


module.exports = Game;

