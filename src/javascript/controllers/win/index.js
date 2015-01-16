var ScreenManager = require("../../managers/screenManager");
var Layout = require("./layout");

function Retry(container, header, data ){

	var robot = "";
	this.data = data;
	if(data.level ==1) robot = "fax";
	else if(data.level ==1) robot = "fax";
	else if(data.level == 3) robot = "fax";

	container.innerHTML = Layout( { robot: robot } );
	
	this.container = container.querySelector(".win");

	
	var button = document.querySelector(".btn-next");
	var share = document.querySelector(".btn-share");

	var _this = this;
	button.onclick = function(){
		_this.data.level++;
		ScreenManager.emit( "go", { screen: "game", data: { level: _this.data.level } } );
	}

	share.onclick = function(){
		ScreenManager.emit( "go", { screen: "share", data: { level: _this.data.level } } );
	}

}

module.exports = Retry;