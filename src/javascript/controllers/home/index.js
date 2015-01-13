var ScreenManager = require("../../managers/screenManager");

function Home(container){

	var button = document.querySelector(".btn")

	this.container = container.querySelector(".home");

	

	button.onclick = function(){
		ScreenManager.emit("go", { screen: "game", data: {}});
	}

}

module.exports = Home;