
	var events = require("events")
	var Screen = new events.EventEmitter();

	var container = document.querySelector(".container");
	var header = document.querySelector(".header");

	var currentView;

	Screen.views;

	Screen.on("go", function( params  ){

		var name = params.screen;

		var view = Screen.views[name];
		
		if(currentView){
			if(currentView.off) currentView.off()
			currentView.container.remove()
		}
		
		header.style.display = "none";
		currentView = new view(container, header, params.data);

	});


	module.exports = Screen;