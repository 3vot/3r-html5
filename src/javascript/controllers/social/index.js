var ScreenManager = require("../../managers/screenManager");
var SocialManager = require("../../managers/socialManager");

var Layout = require("./layout");

function Social(container, header, data ){

	var robot = "";
	this.data = data;
	
	container.innerHTML = Layout( { robot: robot, level: this.data.level } );
	
	this.container = container.querySelector(".social");
	
	var facebook = document.querySelector(".btn-facebook");
	var twitter = document.querySelector(".btn-twitter");
	var keep = document.querySelector(".btn-keep");	

	var _this = this;

	function keepPlaying(){
		_this.data.level++;
		ScreenManager.emit( "go", { screen: "game", data: { level: _this.data.level } } );
	}

	keep.onclick = keepPlaying

	facebook.onclick = function(){
		SocialManager.facebook("http://interactive.fusion.net/retrosounds", "I am a " + _this.data.robot, "http://interactive.fusion.net/retrosounds/images/" + _this.data.robot + ".png" )
		keepPlaying();
	}

	twitter.onclick = function(){
		SocialManager.twitter("http://interactive.fusion.net/retrosounds", "I am a " + _this.data.robot, "http://interactive.fusion.net/retrosounds/images/" + _this.data.robot + ".png" )
		keepPlaying();
	}

}

module.exports = Social;