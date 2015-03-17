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
