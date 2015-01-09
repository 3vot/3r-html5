var fs = require('fs');
var Layout = fs.readFileSync(__dirname + '/layout.html', 'utf8');
var domify = require("domify")

function Story(){
	this.element = domify(Layout);
}

Story.prototype.appendTo = function(selector){
	this.parentNode = document.querySelector(selector);
	this.parentNode.appendChild(this.element);
}

module.exports = Story;