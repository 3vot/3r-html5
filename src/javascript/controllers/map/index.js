
var fs        =  require('fs');
var Util      =  require("../../managers/utilManager");
var Image     =  fs.readFileSync(__dirname + '/image.html', 'utf8');
var Location  =  fs.readFileSync(__dirname + '/location.html', 'utf8');
var domify    =  require("domify")
var Model     =  require("./model");

Model.load();

function Map(){}

Map.prototype.appendTo = function(selector){
	var _this = this;
	this.element = document.querySelector(selector);

	this.lbl_location  = this.element.querySelector( ".lbl_location" )
	this.lbl_date      = this.element.querySelector( ".lbl_date" )
	this.lbl_caption   = this.element.querySelector( ".lbl_caption" )
	this.div_image     = this.element.querySelector( ".large_image" )
	this.div_video     = this.element.querySelector( ".large_video" )
	this.div_video_wrapper     = this.element.querySelector( ".video-wrapper" )
	this.div_images    = this.element.querySelector( ".images" );
	this.div_locations = this.element.querySelector( ".pointers" );

	this.index_currentLocation = 0;
	this.currentImageIndex = 0;
	this.currentImageCount = 0;

	this.render();

	this.element.querySelector(".locations-view").onclick = function(e){ _this.stopViewClick(e); }
	this.element.querySelector(".caption-view").onclick = function(e){ _this.stopImageClick(e); }

	Util.addEvent( window, "resize", Util.debounce( 
		function(){ 
			_this.render(); _this.renderImage();  
		}, 500
	), false);

	this.detectSwipe();

}

Map.prototype.renderImage = function(imgPath){
	if(imgPath) this.currentImage = imgPath;
	else imgPath = this.currentImage;

	var width = document.documentElement.clientWidth;
	var size = "md";
	if(width > 900) size = "lg";
	if(width < 540) size = "sm";
	this.div_image.style.background = "url(images/map/src/" + imgPath + ")";
	//this.div_image.src = "images/map/dist/" + size + "/" + imgPath ;
}


Map.prototype.render = function(){
	this.pointers = [];

	var width = document.documentElement.clientWidth;

	var position = 3;
	var multiplier = 4;
	if(width > 1100){ position = 4; multiplier = 3.7; }
	else if(width > 900){ position = 7; multiplier = 3.4; }
	else if(width > 700){ position = 8; multiplier = 3.4; }

	this.screenWidth = width;

	var first = Model.list[ 0  ]
	var location = first.location;

	this.lbl_location.innerHTML = first.location.name;
	this.lbl_date.innerHTML = first.location.date + " SEPTEMBER 2014";;
	this.lbl_caption.innerHTML = first.location.caption;

	var pointers = this.div_locations.querySelectorAll(".pointer")
	for (var i = pointers.length - 1; i >= 0; i--) {
		var pointer = pointers[i];
		if( !pointer.classList.contains("small-pointer") ) pointers[i].parentNode.removeChild(pointers[i]);
	};

	for (var i = 0; i< Model.list.length; i++) {
		var model = Model.list[i];
		var location = this.renderSingleLocation( model, i );
		location.style.left = position + "%";
		position+= multiplier;
		this.div_locations.appendChild( location );
		this.pointers.push( location );
	};
	this.pointers[ 0 ].classList.add("active");

	this.renderImages( first );
}

Map.prototype.renderSingleLocation = function(model, index){
	var location = model.location;
	
	var locationDiv = domify( Location );
	
	locationDiv.dataset.index = index;
	locationDiv.dataset.name = location.name;
	//locationDiv.querySelector("span").innerHTML = location.date;
	return locationDiv;
}

Map.prototype.renderSingleImage = function(imageSrc, index){
	var imageDiv = domify( Image );
	imageDiv.dataset.index = index;
	imageDiv.dataset.img = imageSrc
	var thumbnail = imageSrc;
	
	if( imageSrc.indexOf(".mov") > -1 || imageSrc.indexOf(".mp4") > -1){
		imageDiv.classList.add("video")
		thumbnail = thumbnail.replace(".mov", ".jpg");
		thumbnail = thumbnail.replace(".mp4", ".jpg");
	}

	imageDiv.querySelector("img").src = "images/map/dist/xs/" + thumbnail;
	imageDiv.dataset.thumb = "images/map/dist/lg/" + thumbnail;

	return imageDiv;
}

Map.prototype.renderImages = function(model){
	this.thumbs = [];
	this.div_images.innerHTML = "";
	this.currentImageIndex = 0;

	var imageList = model.location.images;
	this.currentImageCount = imageList.length;

	for (var i = 0; i < imageList.length; i++) {
		var imageSrc = imageList[i];
		var image = this.renderSingleImage( imageSrc, i );
		if(i==0) image.classList.add("active")
		this.thumbs.push( image );
		this.div_images.appendChild( image );
	};

	this.currentImages = this.thumbs;

	this.div_images.innerHTML +=  '<div style="clear:both"></div>';
	
	if(this.thumbs.length == 0) return;
	
	this.thumbs[0].classList.add("active");

	this.renderImage(imageList[0]);

	if(this.screenWidth < 420) this.div_images.style.width = imageList.length * 1.1 * 25 + "px";
	else this.div_images.style.width = "auto";
}

Map.prototype.onArrowClick = function(e){
	var target = e.target;
	var move = target.dataset.move;
	if(move == "last" && this.currentSlide > 0) this.currentSlide -=1;
	else if( move=="next" && this.currentSlide < this.slides.length -1 ) this.currentSlide +=1;
	else return;
	this.currentElement.style.right = "210%";
	this.currentElement = this.slides[this.currentSlide];
	this.currentElement.style.right=0;
}

Map.prototype.stopViewClick = function(e){
	var _this = this;
	var target = e.target;

	if( target.classList.contains('arrows') ) return this.onArrowClick(e);

	if( !target.classList.contains('pointer') ) return false;

	for (var i = this.pointers.length - 1; i >= 0; i--) {
		var pointer  = this.pointers[i];
		pointer.classList.remove('active')
	};

	var model = Model.list[target.dataset.index]
	var location =  model.location; 
	
	this.renderImages( model );
	this.lbl_caption.innerHTML = location.caption;
	this.lbl_date.innerHTML = location.date + " SEPTEMBER 2014";
	this.lbl_location.innerHTML = location.name;
	target.classList.add('active')
}

Map.prototype.onArrowClick = function(e){
	var target = e.target;
	var direction = target.dataset.move;
	if( direction == "last" && this.index_currentLocation > 0 ) this.index_currentLocation--;
	else if( direction == "next" && this.index_currentLocation < Model.list.length -1 ) this.index_currentLocation++;
	else return;

	var model = Model.list[ this.index_currentLocation ];
	var location =  model.location; 

	this.renderImages( model );
	this.lbl_caption.innerHTML = location.caption;
	this.lbl_date.innerHTML = location.date + " SEPTEMBER 2014";
	this.lbl_location.innerHTML = location.name;
}

Map.prototype.stopImageClick = function(e){
	var _this = this;
	var target = e.target;
	this.div_image_list  = this.element.querySelectorAll( ".image" );
	if( this.div_video ) this.div_video.pause();
	if( _this.div_video ) _this.div_video.remove();
	
	while( !target.classList.contains('image') && !target.classList.contains('map-component')  )  target = target.parentNode
	if( !target.classList.contains("image") ) return false;
		
		for (var i = this.thumbs.length - 1; i >= 0; i--) this.thumbs[i].classList.remove('active');

	 	for (var i = this.div_image_list.length - 1; i >= 0; i--) this.div_image_list[i].classList.remove("active");

		target.classList.add('active');

		if( target.classList.contains("video") ){
			if( _this.div_video ) _this.div_video.remove();
			_this.div_image.style.display = "none";
			_this.div_video_wrapper.style.display = "block";

			_this.div_video = _this.createVideo(target.dataset.img);
			_this.div_video_wrapper.appendChild(_this.div_video);
			_this.div_video.addEventListener('loadeddata', function() {
				_this.div_video.play();
			}, false);
			//_this.div_video.load();
	}
	else{
		_this.div_video_wrapper.style.display = "none";
		_this.div_image.style.display = "block";
		_this.renderImage(target.dataset.img);
	}	
}


Map.prototype.translateVideoName = function(videoRealSrc, type){
	var base = "http://static.fusion.net/stop-telling-women-to-smile/video/" + type +"/";

	var name = "";
	
	if( videoRealSrc =="Loc1/Loc1_vid1.mov") name = "first"
	else if( videoRealSrc =="Loc2/Loc2_vid1.mov") name = "second"
	else if( videoRealSrc =="Loc3/Loc3_vid1.mov") name = "three"
	else if( videoRealSrc =="Loc5/Loc5_vid1.mov") name = "five"
	else if( videoRealSrc =="Loc6/Loc6_vid1.mov") name = "six"
	else if( videoRealSrc =="Loc7/Loc7_vid1.mov") name = "seven"
	else if( videoRealSrc =="Loc9/Loc9_vid1.mov") name = "nine-first"
	else if( videoRealSrc =="Loc9/Loc9_vid2.mov") name = "nine-second"
	else if( videoRealSrc =="Loc13/Loc13_vid1.mov") name = "thirteen"
	else if( videoRealSrc =="Loc17/Loc17_vid1.mov") name = "seventeen"
	else if( videoRealSrc =="Loc18/Loc18_vid1.mov") name = "eighteen"

	return base  + name + "." + type

}

Map.prototype.createVideo = function(videoName ){
		

		var vttName = videoName.split("/")[1];
		vttName = vttName.replace(".mov","");

		var video = document.createElement("video");

		video.setAttribute('preload', 'auto');
		video.setAttribute('crossorigin', 'anonymous');
		video.setAttribute('autobuffer', 'autobuffer');
		video.setAttribute('controls', 'controls');

		var sourceMp4 = document.createElement('source');
		sourceMp4.setAttribute('type', 'video/mp4');
		sourceMp4.setAttribute('src', this.translateVideoName(videoName,"mp4")); 

		var sourceWebm = document.createElement('source');
		sourceWebm.setAttribute('type', 'video/webm');
		sourceWebm.setAttribute('src', this.translateVideoName(videoName, "webm"));

		video.appendChild(sourceMp4);
		video.appendChild(sourceWebm);

		var track = document.createElement('track');
		track.setAttribute('label', 'English');
		track.setAttribute('srcLang', 'en');
		track.setAttribute('kind', 'subtitles');
		track.setAttribute('type', 'text/webvtt');
		//track.setAttribute('src',  "captions/01.vtt");

		track.setAttribute('src', "captions/" + vttName + ".vtt");
		track.setAttribute('default', 'default');

		video.appendChild(track);

		return video;
}


Map.prototype.detectSwipe = function(container){
  document.addEventListener('touchstart', handleTouchStart, false);        
  document.addEventListener('touchmove', handleTouchMove, false);
  var _this = this;

  var xDown = null;                                                        
  var yDown = null;                                                        

  function handleTouchStart(evt) {                                         
      xDown = evt.touches[0].clientX;                                      
      yDown = evt.touches[0].clientY;                                      
  };                                                

  function moveImages(index){

  }

  function handleTouchMove(evt) {
      if ( ! xDown || ! yDown ) {
          return;
      }

      var xUp = evt.touches[0].clientX;                                    
      var yUp = evt.touches[0].clientY;

      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;

      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
          if ( xDiff > 0 ) {
          	if( _this.currentImageIndex == _this.currentImageCount -1) return;
          	_this.currentImageIndex++;

          	console.log("next", _this.currentImageIndex, _this.currentImages[ _this.currentImageIndex ]);
          	_this.stopImageClick( { target: _this.currentImages[ _this.currentImageIndex ] } );
          } else {
          	if( _this.currentImageIndex == 0 ) return;
          	_this.currentImageIndex--;
          	console.log("back", _this.currentImageIndex, _this.currentImages[ _this.currentImageIndex ]);
          	_this.stopImageClick( { target: _this.currentImages[ _this.currentImageIndex ] } );
          }                       
      } else {
          if ( yDiff > 0 ) {
              /* up swipe */ 
          } else { 
              /* down swipe */
          }                                                                 
      }
      /* reset values */
      xDown = null;
      yDown = null;                                             
  };
}


module.exports = Map;