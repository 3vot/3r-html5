var Layout = require("./layout");
var Swiper = require("./swiper");
var ScreenManager = require("../../managers/screenManager");
var data = require("../../../htdocs/data/game.json")

var Game = function( container, header, screenData ){
	var _this = this;
	this.header = header;

  header.style.display = "block";
  this.lifes = 3;
  this.level = screenData.level || 1;
  this.moveBy = 261;
	this.sounds = [] ;

  this.header.querySelector(".hearts").innerHTML = '<span class="heart active"></span><span class="heart active"></span><span class="heart active"></span>';

	for (var i = data.sounds.length - 1; i >= 0; i--) {
		var sound = data.sounds[i];
		if(sound.level == this.level) this.sounds.push( sound );
	};

  this.render(container);

  this.currentMachineIndex=0;
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
  var _this = this;

  this.sounds.shuffle = this.shuffle;
  container.innerHTML = Layout( this.sounds );

  this.gameContainer = container.querySelector(".game");
  this.container = this.gameContainer;

  this.soundSlider = this.gameContainer.querySelector(".soundSlider");
  this.machineSlider = this.gameContainer.querySelector(".machineSlider");
  this.lblInfo = this.gameContainer.querySelector(".lbl-info");
  
  this.lblInfo.onclick = function(){
    _this.lifes = 100;
  }

  if(!this.swipeDetected) {
    this.soundSwipe();
    this.machineSwipe();
    this.swipeDetected = true;
    this.soundSlider.onclick = function(e){ _this.playAudio(e); }
  }

  var cols = this.soundSlider.querySelectorAll('.audioBox');
  [].forEach.call(cols, function(col) {
    col.addEventListener('dragstart', function(e){ _this.handleDragStart(e, this) }, false);
  });

  var cols = this.machineSlider.querySelectorAll('.imageBox .drop-target');
  [].forEach.call(cols, function(col) {
    
    col.addEventListener('dragenter', function(e){ _this.handleDragEnter(e, this) }, false);
    col.addEventListener('dragover', function(e){ _this.handleDragOver(e, this) }, false);
    col.addEventListener('dragleave', function(e){ _this.handleDragLeave(e, this) }, false);

    col.addEventListener('drop', function(e){ _this.handleDrop(e,this) } , false);
    col.addEventListener('dragend', function(e){ _this.handleDragEnd(e,this) } , false);

  });
}

Game.prototype.handleDragStart = function(e) {
  var _this = this;
  var box = e.target.parentNode;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text', JSON.stringify( box.dataset ) );

}

Game.prototype.handleDragOver = function(e, element) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }
  element.classList.add("over")
  
  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}

Game.prototype.handleDragEnter = function(e, element) {
  var target = e.target;
  while( target.classList == null && !target.classList.contains("imageBox") && !target.classList.contains(".game") ) target = target.parentNode
  
  target.classList.add('over');
}

Game.prototype.handleDragLeave = function(e, element) {
  element.classList.remove('over'); 
}

Game.prototype.getSound = function( name ){
  var sound;
  for (var i = this.sounds.length - 1; i >= 0; i--) {
    var snd = this.sounds[i];
    if(snd.name == name) sound = snd;  
  };
  return sound;
}

Game.prototype.removeSound = function( name ){
  var removeIndex;
  for (var i = this.sounds.length - 1; i >= 0; i--) {
    var snd = this.sounds[i];
    if(snd.name == name) removeIndex = i;
  };
  this.sounds.splice( removeIndex, 1 );
}

Game.prototype.handleDrop = function(e, element) {
  if( e.stopPropagation ) e.stopPropagation();

  element.classList.remove("over");

  var data = JSON.parse( e.dataTransfer.getData('text') ) ;

  var audioBox = this.soundSlider.querySelector('.audioBox[data-name="'+data.name+'"]')
  
  var sound = this.getSound( data.name );
  var match = false;

  if( element.dataset.name == sound.name) match = true;  

  if( !match ){
    this.lblInfo.style.display = "block";
    this.lblInfo.innerHTML= "Wrong :)"
    this.invalidateMatch(audioBox,  element.parentNode );
  }
  else{
    this.lblInfo.style.display = "block";
    this.lblInfo.innerHTML= "Correct! " + ( this.sounds.length - 1 ) + " to go."
    this.removeSound( data.name )
    this.validateMatch(audioBox, element.parentNode );
  }

  return false;
}

Game.prototype.handleDragEnd = function(e, element) {
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


Game.prototype.goEast = function(left, slider){
  left -= this.moveBy;
  var limit = ( this.sounds.length -1 ) * this.moveBy * -1
  if( slider === this.machineSlider ) limit = 4  * this.moveBy * -1;
  if( left >= limit ){
    slider.style.left = left + "px";
    return true
  }
  
}

Game.prototype.goWest = function(left, slider){
  
  left += this.moveBy;
  console.log(left);
  if( left <= 50){
    slider.style.left = left + "px";
    return true
  }
  
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
     if ( _this.goEast(left, _this.machineSlider) ) _this.currentMachineIndex++;
     
  })

  swiper.on("west", function(){
    var left = getPosition();
     
     if( _this.goWest( left, _this.machineSlider) ) _this.currentMachineIndex--;
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
    _this.goEast(left, _this.soundSlider);
  })

  swiper.on("west", function(){
    var left = getPosition();
    _this.goWest( left, _this.soundSlider);
  });

  swiper.on("south", function(data){
    var box = getBox( data.event.target );
    
    var sound = _this.getSound( box.dataset.name );
    
    var match = false;

    var imageBox = _this.machineSlider.querySelector( '.imageBox[data-index="'+ _this.currentMachineIndex +'"]' )

    if( imageBox.dataset.name == sound.name) match = true;

    if( !match ){
      _this.lblInfo.style.display = "block";
      _this.lblInfo.innerHTML= "Wrong :)"
      _this.invalidateMatch(box);
    }
    else{
      _this.lblInfo.style.display = "block";
      _this.lblInfo.innerHTML= "Correct! " + ( _this.sounds.length - 1 ) + " to go."
      _this.removeSound( sound.name );
      _this.validateMatch(box, imageBox);
    }

    box.classList.add("active")
  });

  swiper.on("north", function(data){
    var box = getBox( data.event.target );
    box.classList.remove("active")
  });

}


Game.prototype.invalidateMatch = function(box, imageBox){
  var _this = this;
  this.lifes--;
  if(this.lifes < 3){
    var heart = this.header.querySelector(".heart.active")
    heart.classList.remove("active");
  }

  if(imageBox) imageBox.classList.add("wrong");

  setTimeout( function(){
    if( _this.lifes == 0 ) return ScreenManager.emit("go", { screen: "retry", data: { level: _this.level } } );
    _this.lblInfo.innerHTML = "Match the sound!"
    
    if(box) box.classList.remove("active")
    if(imageBox) imageBox.classList.remove("wrong");
  },1000)

}

Game.prototype.validateMatch = function(box, imageBox){
  var _this = this;
  
  imageBox.classList.add("right");
  imageBox.querySelector("img").style.display = "block";

  setTimeout( function(){
    imageBox.classList.remove("right");

    box.remove();

    if(_this.sounds.length == 0) return ScreenManager.emit("go", { screen: "win", data: { level: this.level } } );

  }, 1000)

}


Game.prototype.validateMatchRemove = function(box, sound, _this, imageBox){
  setTimeout( function(){
    _this.lblInfo.style.display="none";
    //box.classList.remove("active");

    imageBox.querySelector("img").style.display = "block";
    
    box.remove();
    
    //var imageEl = _this.gameContainer.querySelector('.imageBox[data-name="'+ sound.name +'"]');
    //imageEl.remove();
   
   // if( _this.currentSoundIndex == _this.sounds.length){
    //  _this.currentSoundIndex--;
    //  _this.soundSlider.style.left = parseInt( _this.soundSlider.style.left.replace("px","") ) + _this.moveBy + "px"
    //}

    /*
    if( _this.currentMachineIndex == _this.sounds.length ){                
      _this.currentMachineIndex--;
      _this.machineSlider.style.left = parseInt( _this.machineSlider.style.left.replace("px","") ) + _this.moveBy + "px"
    }
    */
  
    if(_this.sounds.length == 0) return ScreenManager.emit("go", { screen: "win", data: { level: this.level } } );

  },1000)

}


 
module.exports = Game;

