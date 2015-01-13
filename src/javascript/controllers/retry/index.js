var ScreenManager = require("../../managers/screenManager");
var Layout = require("./layout");

function Retry(container, header, data){

	container.innerHTML = Layout();
	
	this.container = container.querySelector(".retry");

	var button = document.querySelector(".btn")

	button.onclick = function(){
		ScreenManager.emit("go", { screen: "game", data: { level: data.level } });
	}

}

module.exports = Retry;