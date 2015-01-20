var ScreenManager = require("../../managers/screenManager");
var Layout = require("./layout");

function Win(container, header, data ){

	var robot = "";
	this.data = data;
	if(data.level ==1) robot = "fax";
	else if(data.level == 2) robot = "number5";
	else if(data.level == 3) robot = "cyclone";

	this.robot = robot;
	container.innerHTML = Layout( { robot: robot, level: this.data.level } );
	
	this.container = container.querySelector(".win");
	
	var button = document.querySelector(".btn-next");
	var share = document.querySelector(".btn-share");

	var _this = this;
	button.onclick = function(){
		_this.data.level++;
		ScreenManager.emit( "go", { screen: "game", data: { level: _this.data.level, robot: this_robot } } );
	}

	share.onclick = function(){
		ScreenManager.emit("go", { screen: "social", data: { level: _this.data.level, robot: _this.robot } });
	}

}

module.exports = Win;