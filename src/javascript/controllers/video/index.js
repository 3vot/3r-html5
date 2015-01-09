var fs = require('fs');
var Layout = fs.readFileSync(__dirname + '/layout.html', 'utf8');
var domify = require("domify")

function VideoController(){
	this.element = domify(Layout);
}

VideoController.prototype.appendTo = function(selector){
	this.parentNode = document.querySelector(selector);
	this.parentNode.appendChild( this.element );
	this.name = this.parentNode.dataset.name;
	this.video = this.element;
}

VideoController.prototype.registerParallax = function(parallaxController){
	var _this = this;

	this.parallaxController = parallaxController;
	parallaxController.on("ENTER", function( event ){
		if(event.section.name == _this.name)  _this.onEnter();
	});

	parallaxController.on("EXIT", function( event ){
		if(event.section.name == _this.name)  _this.onExit();
	});
}

VideoController.prototype.onEnter = function(){
	//this.video.play();
}

VideoController.prototype.onExit = function(){
	//this.video.pause();
}

module.exports = VideoController;