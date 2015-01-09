var fs = require('fs');
var Layout = fs.readFileSync(__dirname + '/layout.html', 'utf8');
var domify = require("domify");
var $ = require("jquery");

function Title(){
	this.element = domify(Layout);
}

Title.prototype.appendTo = function(selector){
	this.parentNode = document.querySelector(selector);
	this.parentNode.appendChild(this.element);
};

module.exports = Title;