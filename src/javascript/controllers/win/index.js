var ScreenManager = require("../../managers/screenManager");
var Layout = require("./layout");

function Win(container, header, data ){

	var robot = "";
	this.data = data;
	if(data.level ==1) robot = "fax";
	else if(data.level == 2) robot = "level2";
	else if(data.level == 3) robot = "level3";

	container.innerHTML = Layout( { robot: robot, level: this.data.level } );
	
	this.container = container.querySelector(".win");
	
	var button = document.querySelector(".btn-next");
	var share = document.querySelector(".btn-share");

	var _this = this;
	button.onclick = function(){
		_this.data.level++;
		ScreenManager.emit( "go", { screen: "game", data: { level: _this.data.level } } );
	}

	share.onclick = function(){
		if( _this.data.level < 3 ) ScreenManager.emit( "go", { screen: "share", data: { level: _this.data.level } } );
		else ScreenManager.emit("go", { screen: "home", data: { level: 1 } });
	}

}

module.exports = Win;