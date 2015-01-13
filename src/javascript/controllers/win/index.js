var ScreenManager = require("../../managers/screenManager");
var Layout = require("./layout");

function Retry(container, header, data ){

	var robot = "";
	if(data.level ==1) robot = "fax";

	container.innerHTML = Layout( { robot: robot } );
	this.container = container;
	
	var button = document.querySelector(".btn")

	button.onclick = function(){
		data.level++;
		ScreenManager.emit( "go", { screen: "game", data: { level: data.level } } );
	}

}

module.exports = Retry;