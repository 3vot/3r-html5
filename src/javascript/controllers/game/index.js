var Layout = require("./layout");
var Swiper = require("./swiper");

var data = require("../../../htdocs/data/game.json")

var Game = function( container ){
	var _this = this;
	
  this.moveBy = 261;

	this.sounds = [] ;

	for (var i = data.sounds.length - 1; i >= 0; i--) {
		var sound = data.sounds[i];
		if(sound.level == window.game.level) this.sounds.push( sound );
	};

  this.render(container);

	this.gameContainer.onclick = function(e){ _this.playAudio(e); }

	this.currentSoundIndex = 0;
  this.currentMachineIndex = 0;

}

Game.prototype.shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

Game.prototype.render = function(container){
  if(!container) container = this.container.parentNode

  this.sounds.shuffle = this.shuffle;
  container.innerHTML = Layout( this.sounds );

  this.gameContainer = container.querySelector(".game");
  this.container = this.gameContainer;

  this.soundSlider = this.gameContainer.querySelector(".soundSlider");
  this.machineSlider = this.gameContainer.querySelector(".machineSlider");
  this.lbl_wrong = this.gameContainer.querySelector(".lbl_wrong");


  if(!this.swipeDetected) {
    this.soundSwipe();
    this.machineSwipe();
    this.swipeDetected = true;
  }

}

Game.prototype.playAudio = function(e){
	var target = e.target;
	while( target.classList.length == 0 || ( !target.classList.contains("audioBox") && !target.hasClass("container")  ) ) target = target.parentNode
	
	var audio = target.querySelector("audio");
	if(this.lastAudio) this.lastAudio.pause();
	if(audio){
		audio.currentTime = 0;
		audio.play();
		this.lastAudio = audio;
	}
}


Game.prototype.goEast = function(left, slider, index){
  left -= this.moveBy;
  var limit = ( this.sounds.length -1 ) * this.moveBy * -1
  if( left >= limit ){
    slider.style.left = left + "px";
    index++;
  }
  return index;
}

Game.prototype.goWest = function(left, slider, index){
  console.log(left)
  left += this.moveBy;

  if( left <= 50){
    slider.style.left = left + "px";
    index--;
  }
  return index;
}


Game.prototype.machineSwipe = function(){
  var _this = this;
  var swiper = new Swiper( this.machineSlider );
  
  function getPosition(  ){
    var left = _this.machineSlider.style.left.replace("px","");
    return parseInt( left );
  }

  swiper.on("east", function(){
    var left = getPosition();
     _this.currentMachineIndex = _this.goEast(left, _this.machineSlider, _this.currentMachineIndex);
  })

  swiper.on("west", function(){
    var left = getPosition();
     _this.currentMachineIndex  = _this.goWest( left, _this.machineSlider, _this.currentMachineIndex);
  });

}

Game.prototype.soundSwipe = function(){
var _this = this;
  var swiper = new Swiper( this.soundSlider );
  
  function getPosition(  ){
    var left = _this.soundSlider.style.left.replace("px","");
    return parseInt( left );
  }

  function getBox(target){
    while( target.classList.length == 0 && !target.classList.contains(".box") && !target.classList.contains(".game") ) target = target.parentNode
    return target;
  }

  swiper.on("east", function(){
    var left = getPosition();
    _this.currentSoundIndex = _this.goEast(left, _this.soundSlider, _this.currentSoundIndex);
  })

  swiper.on("west", function(){
    var left = getPosition();
    _this.currentSoundIndex = _this.goWest( left, _this.soundSlider, _this.currentSoundIndex );
  });

  swiper.on("south", function(data){
    var box = getBox( data.event.target );
    var sound = _this.sounds[_this.currentMachineIndex];
    var match = false;

    if( box.dataset.name == sound.name) match = true;

    if( !match ){
      _this.lbl_wrong.style.display = "block";
      _this.lbl_wrong.innerHTML= "Wrong :)"
      _this.invalidateMatch(box);
    }
    else{
      _this.lbl_wrong.style.display = "block";
      _this.lbl_wrong.innerHTML= "Correct! " + ( _this.sounds.length - 1 ) + " to go."
      _this.sounds.splice( _this.currentMachineIndex, 1 );
      _this.validateMatch(box, sound, _this);
    }

    box.classList.add("active")
  });

  swiper.on("north", function(data){
    var box = getBox( data.event.target );
    box.classList.remove("active")
  });

}


Game.prototype.invalidateMatch = function(box){
  var _this = this;
  setTimeout( function(){
    _this.lbl_wrong.style.display="none";
    box.classList.remove("active")
  },1000)

}

Game.prototype.validateMatch = function(box, sound, _this){
  setTimeout( function(){
    _this.lbl_wrong.style.display="none";
    box.classList.remove("active")
    box.remove();
    var imageEl = _this.gameContainer.querySelector('.imageBox[data-name="'+ sound.name +'"]');
    imageEl.remove();
   
    if( _this.currentSoundIndex == _this.sounds.length){
      _this.currentSoundIndex--;
      _this.soundSlider.style.left = parseInt( _this.soundSlider.style.left.replace("px","") ) + _this.moveBy + "px"
    }

    if( _this.currentMachineIndex == _this.sounds.length ){                
      _this.currentMachineIndex--;
      _this.machineSlider.style.left = parseInt( _this.machineSlider.style.left.replace("px","") ) + _this.moveBy + "px"
    }
  },1000)

}


 
module.exports = Game;

