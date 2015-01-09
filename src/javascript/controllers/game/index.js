var Layout = require("./layout");

var data = require("../../../htdocs/data/game.json")

var Game = function( container ){
	var _this = this;
	this.lastAudio;

	this.sounds = [] ;

	for (var i = data.sounds.length - 1; i >= 0; i--) {
		var sound = data.sounds[i];
		if(sound.level == window.game.level) this.sounds.push( sound );
	};

	container.innerHTML = Layout( this.sounds );

	this.gameContainer = container.querySelector(".game");

	this.gameContainer.onclick = function(e){ _this.playAudio(e); }

	this.detectSwipe();

	this.currentSoundIndex = 0;

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
          	left -= 280;
            var limit = ( _this.sounds.length -1 ) * 280 * -1
            if( left >= limit ){
              target.style.left = left + "px";
              _this.currentSoundIndex++;
            }

          } else {
          	left += 280;
          	if( left <= 0){
              target.style.left = left + "px";
              _this.currentSoundIndex--;
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
            var sound = _this.sounds[_this.currentSoundIndex];
            var match = false;

            if( target.dataset.name == sound.name) match = true;
            
            function invalidateMatch(target){
              setTimeout( function(){
                lbl_wrong.style.display="none";
                target.classList.remove("active")
              },1000)

            }

            if( !match ){
              lbl_wrong.style.display = "block";
              invalidateMatch(target);
            }

           
            
          }                                                                 
      }
      
      /* reset values */
      xDown = null;
      yDown = null;                                             
  };
}

module.exports = Game;

