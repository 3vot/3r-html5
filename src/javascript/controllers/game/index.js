var Layout = require("./layout");

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

Game.prototype.render = function(container){
  if(!container) container = this.container.parentNode

  container.innerHTML = Layout( this.sounds );
  
  this.gameContainer = container.querySelector(".game");
  this.container = this.gameContainer;

   if(!this.swipeDetected) {
    this.detectSwipe();
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

Game.prototype.detectSwipe = function(){
  this.gameContainer.addEventListener('touchstart', handleTouchStart, false);        
  this.gameContainer.addEventListener('touchmove', handleTouchMove, false);
  var _this = this;

  var xDown = null;                                                        
  var yDown = null;                                                        

  function handleTouchStart( evt ) {                                         
      xDown = evt.touches[0].clientX;                                      
      yDown = evt.touches[0].clientY;                                      
  };                                                

  function handleTouchMove( evt ) {
  	
  	var target = evt.target
 
  	function getLeftRight(){
	  	while( !target.classList.contains("machineSlider") && !target.classList.contains("soundSlider")  ){
        if( target.classList.contains("container") ) return false
	  		target = target.parentNode;
	  	}	

	  	return target;
		}

		function getUpDown(){
			while( !target.classList.contains("audioBox")  ){
  			if( target.classList.contains("container") ) return false
  			target = target.parentNode;
  		}	
  		return target;
		}

      if ( ! xDown || ! yDown ) {
          return;
      }

      var xUp = evt.touches[0].clientX;                                    
      var yUp = evt.touches[0].clientY;

      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;

      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
      		target = getLeftRight();
          if (!target ) return false;

          var left = target.style.left.replace("px","");

          left = parseInt(left);
          left = left || 0;

          if ( xDiff > 0 ) {
          	left -= _this.moveBy;
            var limit = ( _this.sounds.length -1 ) * _this.moveBy * -1
            if( left >= limit ){
              target.style.left = left + "px";
              if( target.classList.contains("soundSlider") ) _this.currentSoundIndex++;
              if( target.classList.contains("machineSlider") ) _this.currentMachineIndex++;

            }

          } else {
          	left += _this.moveBy;
            console.log(left)
          	if( left <= 50){
              target.style.left = left + "px";
              if( target.classList.contains("soundSlider") ) _this.currentSoundIndex--;
              if( target.classList.contains("machineSlider") ) _this.currentMachineIndex--;
            }
          }
      } else {
      		target = getUpDown();
          var lbl_wrong = document.querySelector(".game .lbl_wrong");

          if( !target ) return false;
          if ( yDiff > 0 ) {
            target.classList.remove("active")

          } else { 
            target.classList.add("active")
            var sound = _this.sounds[_this.currentMachineIndex];
            var match = false;

            if( target.dataset.name == sound.name) match = true;
            
            function invalidateMatch(target){
              setTimeout( function(){
                lbl_wrong.style.display="none";
                target.classList.remove("active")
              },1000)

            }

            function validateMatch(target, sound, _this){
              setTimeout( function(){
                lbl_wrong.style.display="none";
                target.classList.remove("active")
                target.remove();
                var imageEl = _this.gameContainer.querySelector('.imageBox[data-name="'+ sound.name +'"]');
                imageEl.remove();
               
                if( _this.currentSoundIndex == _this.sounds.length){
                  _this.currentSoundIndex--;
                  var soundSlider = _this.gameContainer.querySelector(".soundSlider");
                  soundSlider.style.left = parseInt( soundSlider.style.left.replace("px","") ) + _this.moveBy + "px"
                }

                if( _this.currentMachineIndex == _this.sounds.length ){                
                  _this.currentMachineIndex--;
                  var machineSlider = _this.gameContainer.querySelector(".machineSlider");
                  machineSlider.style.left = parseInt( machineSlider.style.left.replace("px","") ) + _this.moveBy + "px"
                }
              },1000)

            }

            if( !match ){
              lbl_wrong.style.display = "block";
              lbl_wrong.innerHTML= "Wrong :)"
              invalidateMatch(target);
            }
            else{
              lbl_wrong.style.display = "block";
              lbl_wrong.innerHTML= "Correct! " + _this.sounds.length + " to go."
              _this.sounds.splice( _this.currentMachineIndex, 1 );
              validateMatch(target, sound, _this);

            }

          }                                                                 
      }
      
      /* reset values */
      xDown = null;
      yDown = null;                                             
  };
}

module.exports = Game;

