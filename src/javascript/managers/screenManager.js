
	var events = require("events")
	var Screen = new events.EventEmitter();

	var container = document.querySelector(".container");
	var currentView;

	Screen.views;

	Screen.on("go", function( name  ){

		var view = Screen.views[name];
		
		if(currentView){
			if(currentView.off) currentView.off()
			currentView.container.remove()
		}
		
		currentView = new view(container);

	});


	module.exports = Screen;