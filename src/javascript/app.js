'use strict';

window.app = {};


var code = document.querySelector(".code");
var codeLayout = require("./code");
code.innerHTML = codeLayout();

var contentBlocks = document.querySelectorAll(".content-block");

var codeBlocks = document.querySelectorAll(".code-block");


setTimeout( position, 50 );

function position(){

for (var i = contentBlocks.length - 1; i >= 0; i--) {
	var contentBlock = contentBlocks[i];
	var top = contentBlock.offsetTop ;
	for (var ii = codeBlocks.length - 1; ii >= 0; ii--) {
		var codeBlock = codeBlocks[ii];
		if(codeBlock.dataset.id == contentBlock.dataset.id){
			console.log(codeBlock.dataset.id);
			console.log(top);
			codeBlock.style.top = top + "px";
		}
	};
};
}

var emailInput = document.querySelector(".email-input");
var emailMsg = document.querySelector(".email-msg");
var emailBtn = document.querySelector(".email-btn");
var Request = require("superagent");

emailBtn.onclick = function(){
	var email =  emailInput.value;
	if(email.length < 4 || emailInput.value.indexOf("@") < 2 || emailInput.value.indexOf(".") < 4 ){
		return emailMsg.innerHTML = "Please check your Email Address";
	}

	emailMsg.innerHTML = "Please wait while we send the email...";
	var url = "https://clay.secure.force.com/api/services/apexrest/clay-api?email=" + emailInput.value;

	Request.get( "https://jsonp.nodejitsu.com/?url=" + url )
  .set('Accept', 'application/json')
  .type('application/json')
  .end( function(err, res){
  	if(err || res.status > 304 ) emailMsg.innerHTML = "Sorry - we encountered and error. Please email one@3vot.com";
  	else{
  	//var body = JSON.parse(res.body);
  		emailMsg.innerHTML = "Your code was sent by Email!";
  		emailInput.style.display = "none";
  		emailBtn.style.display = "none";
  	}
  })
  
}

var positions = document.querySelectorAll('h1.noticable');

var positionMap = [];
var positionsArray = [];
for (var i = positions.length - 1; i >= 0; i--) {
	var el = positions[i];
	positionMap[el.offsetTop] = el; 
	positionsArray.push( el.offsetTop );
};

function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

window.addEventListener('scroll', throttle(scrollIT, 250) );


function scrollIT() {
    var y_scroll_pos = window.pageYOffset;
    var current;
    
    for (var i = positionsArray.length - 1; i >= 0; i--) {
    	var position = positionsArray[i];
    	if( position - 400 < y_scroll_pos ) current = positionMap[position]
    };

  var section = current.dataset.section;
  var menuItem = document.querySelector( ".section-" + section )
  
  var items = document.querySelectorAll(".menu .section");
  for (var i = items.length - 1; i >= 0; i--) {
  	items[i].classList.remove("active")
  };

  menuItem.classList.add("active");
  
}

function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

scrollIT();