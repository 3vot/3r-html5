'use strict';
var EventEmitter =  require('events').EventEmitter;
var inherits     =  require('inherits');
var domify       =  require("domify");
var $            =  require("jquery")


inherits(Load, EventEmitter);
module.exports = Load;

function Load(){
/*
	var _this = this;
	if(document.readyState === 'complete'){
		_this.onLoad();
	}
	else{
		window.addEventListener("load", function onReadyLoad(event){
			_this.onLoad();
	  	window.removeEventListener("load", onReadyLoad, false);
		}, false );
	}
/
*/

}

Load.prototype.handleDeepLink = function(){
	var route = window.location.hash.substr(1);
	if(!route) return;

	var idParts = route.split("/")
	var id;
	if(idParts.length > 0) id = idParts[1];

	if(route.indexOf("mosaic") > -1 && id) window.app.emit("MOSAIC", id);
	else{
		var position = $("section[data-id="+route+"]").position().top 
		console.log( position );
		$("body").scrollTop( position + 150);
	}

}