'use strict';
var EventEmitter = require('events').EventEmitter;
var skrollr = require("../lib/skrollr")
var inherits = require('inherits');

inherits(Parallax, EventEmitter);
module.exports = Parallax;

Parallax.options = {
	log: true,
	log_current_position: false,
}

Parallax.TOP_EVENT = ["data--20-top","data-20Top"];
Parallax.BOTTOM_EVENT = ["data--90-bottom-top","data-90BottomTop"];

function Parallax(selector){
	this.registerDefaultsAndEvents();
	this.registerSections(selector);
	this.registerSkrollr();
}

Parallax.prototype.registerDefaultsAndEvents = function(){
	var _this = this;

  this.currentPositions = {}
  this.current = {
  	position: {  },
  	element: null,
  	direction: null
  }
	this.height = 0;
  this.sectionsMap={};
  this.sections = [];
  this.positionsMap = {}
	this.onResize();

	window.addEventListener("resize", function onReadyLoad(e){
		_this.onResize(e);
	});

}

Parallax.prototype.registerSections = function( selector ){
	var sections = document.querySelectorAll(selector);
	for (var i = sections.length - 1; i >= 0; i--) {
		
		var sectionElement = sections[i];
		var sectionName = sectionElement.dataset.name

		sectionElement.setAttribute("data-emit-events",true);
		sectionElement.setAttribute(Parallax.BOTTOM_EVENT[0],"display: block");
		sectionElement.setAttribute(Parallax.TOP_EVENT[0],"display: block");

		this.sections.push(sectionElement);
		var top = sectionElement.parallax_top
		this.sectionsMap[sectionName] = {
			name: sectionName,
			top: top,
			bottom: sectionElement.parallax_bottom, 
			height: sectionElement.parallax_bottom - top, 
			element: sectionElement
		}
	
		sectionElement.endPosition = sectionElement.parallax_bottom - sectionElement.documentOffsetTop;
		this.log("Registered Element " , sectionName, this.sectionsMap[sectionName] );
	};
	if(sections.length == 0 ) throw "Parallax could not found any Sections with selector " + selector
	this.current = sections[0];
}

Parallax.prototype.registerSkrollr = function(){
	var _this = this;

	skrollr.init({
    smoothScrolling: false,
    mobileDeceleration: 0.004,
    keyframe: function(element, name, direction) {
     	_this.changeCurrentElement.apply(_this, arguments);
  	},
  	render: function(data) {
      _this.current.position = {  top: data.curTop };
      if(Parallax.options.log_current_position) _this.log("current position", data);
  	}
  });
}

Parallax.prototype.onResize = function(){
	this.height = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
}

Parallax.prototype.changeCurrentElement = function( element, name, direction ){
	if(this.current) this.last = this.current;
	var section = this.sectionsMap[element.dataset.name];
	this.current = section;
	var eventName = "";
	if( name == Parallax.BOTTOM_EVENT[1] && direction == "down" ) eventName = "ENTER"
	else if( name == Parallax.BOTTOM_EVENT[1] && direction == "up" ) eventName = "EXIT"
	else if(this.last && name == Parallax.TOP_EVENT[1] && direction == "down") eventName = "EXIT"
	else if(this.last && name == Parallax.TOP_EVENT[1] && direction == "up") eventName = "ENTER"

	this.log(eventName, section.name, section.element);
	this.emit(eventName, { section: section } )
}

Parallax.prototype.log = function(){
	if( console.log && Parallax.options.log ) console.log.apply(console, arguments);
}

// This context should not be called from inside this module
// METHOD CALL SHOULD BE VERY VISIBLE;
Parallax.extendDOMElements = function(){

	window.Object.defineProperty( Element.prototype, 'parallax_top', {
    get: function () { 
        return this.getBoundingClientRect().top;
        //return this.offsetTop + ( this.offsetParent ? this.offsetParent.documentOffsetTop : 0 );
    }
	});

	window.Object.defineProperty( Element.prototype, 'parallax_left', {
	    get: function () { 
	        return this.offsetLeft + ( this.offsetParent ? this.offsetParent.documentOffsetLeft : 0 );
	    }
	} );

	window.Object.defineProperty( Element.prototype, 'parallax_bottom', {
	    get: function () { 
	        return this.getBoundingClientRect().bottom;
	    }
	} );
}

module.exports = Parallax;