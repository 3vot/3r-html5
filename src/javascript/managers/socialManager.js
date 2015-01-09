var domify = require("domify");
var Util   = require("./utilManager")
var $      = require("jquery");


function SocialController(){}


SocialController.content = {
  "mosaic": { TW: "In their own words: 73 short videos spotlight sexual harassment in Mexico City", FB: " In their own words, 73 short videos spotlight sexual harassment in Mexico City.In their own words, 73 short videos spotlight sexual harassment in Mexico City." },
  "tatyana":{ TW: "Artist expands U.S. anti-street harassment installation to Mexico City " , FB: "In their own words, 73 short videos spotlight sexual harassment in Mexico City." },
  "meeting":{ TW: "Video: what is it like to be sexually harassed in Mexico City? " , FB: " In their own words, women discuss their personal experiences with street harassment." },
  "catcalls":{ TW: "Video: Watch 73 women re-enact sexualized obscenities and street harassement " , FB: "Can you imagine how it feels to hear this vulgar comment on the street?" },
  "process":{ TW: "Artist illustrates the faces of women who have been sexually harassed in Mexico City: " , FB: "Art can be used to fight against street harassment." },
  "timelapse":{ TW: "Timelapse: Artist draws portraits to spotlight sexual harassment: " , FB: "In one video, watch how one artist draws portraits to share what it’s like to be harassed." },
  "map":{ TW: "26 streets in Mexico City: mapping portraits as protest against sexual harassment " , FB: "One artist shared real stories of street harassment across the city, one street at a time." },
  "wrapup":{ TW: "" , FB: "" },
  "saytohim":{ TW: "In the artist’s words: using portraits as protest in Mexico City " , FB: "Tatyana Fazlalizadeh shares experiences on expanding her anti-street harassment project to Mexico." },
  "call": { TW: "What’s your experience with street harassment? @ThisIsFusion will share it here: {LINK} #STWTS" , FB: "Share your experience with sexual harassment on Twitter, Facebook, and Instagram using the #STWTS tag."}
}

SocialController.register = function(){

  var facebookShare = document.querySelector('.fusion-facebook').onclick = function(e) {
    e.preventDefault();
    SocialController.share("FB","73 short videos spotlight public sexual harassment on the streets of Mexico City.","http://interactive.fusion.net/stop-telling-women-to-smile/images/social/STWTS_PIC.jpg", "http://fusion.net/stwts");
  };

  var twitterShare = document.querySelector('.fusion-twitter').onclick = function(e) {
    e.preventDefault();
     SocialController.share("TW","Headline of the project","http://interactive.fusion.net/stop-telling-women-to-smile/images/social/STWTS_PIC.jpg","http://fusion.net/stwts");
  };

  var sections = document.querySelectorAll("section.sociable")
  for (var i = 0; i < sections.length ; i++) {
    var section = sections[i];
    var titleBar = section.querySelector(".title-bar");    
    if( titleBar) titleBar.appendChild( domify('<div data-id="'+section.dataset.id+'" class="social-bar"><div class="social-bar-legend">'+section.dataset.name+'</div><div class="social-bar-icons "><div data-type="FB" class="social-bar-icon social-bar-icon__facebook"></div><div data-type="TW" class="social-bar-icon social-bar-icon__twitter"></div></div></div>') );    
  };

  //<div data-type="EM" class="social-bar-icon social-bar-icon__email"></div>

  var sectionBars = document.querySelectorAll(".social-bar");
  for (var i = sectionBars.length - 1; i >= 0; i--) {
    var sectionBar = sectionBars[i];
    sectionBar.onclick = SocialController.onSocialBarClick;
  };


  $(document).bind('scroll', Util.debounce(function(e){
    $('section').each(function(){
      if ( $(this).offset().top < window.pageYOffset + 10 && $(this).offset().top + $(this).height() > window.pageYOffset + 10) {
        window.location.hash = $(this).data('id');
      }
    });
  },500));


};

SocialController.onSocialBarClick = function(e){
  if( !e.target.classList.contains("social-bar-icon")  ) return false;
  var type = e.target.dataset.type;
  var socialBar = e.target.parentNode.parentNode;
  var id = socialBar.dataset.id;
  var image = "http://interactive.fusion.net/stop-telling-women-to-smile/images/social/" + id + ".jpg"
  //console.log( image )
  var url = "http://fusion.net/stwts%23" + id
  var content = SocialController.content[id];
  SocialController.share( type, content[type] , image, url)

}

SocialController.share = function(network, text, image, link){
  
  if(network == "FB") return SocialController.facebook( link, text, image );
  else if(network == "TW") return SocialController.twitter( link, text, image );
  else throw "SOCIAL NETWORK NAME NOT RECOGNIZED " + network;
}

SocialController.facebook = function(link,text, image){
  FB.ui({
    method: 'feed',
    show_error: true,
    name: 'HEADLINE',
    link: link,
    picture: image,
    description: text,
    href: link,
  }, function(response){});
}

SocialController.twitter = function(link, text, image){
  var shareText = text;
  var url = link;
  var w = 550;
  var h = 300;
  var top = (screen.height / 2) - (h / 2);
  var left = (screen.width / 2) - (w / 2);
  var href = "http://twitter.com/share?text=" + encodeURI(shareText) + "&url=" + url + "&via=thisisfusion";
  window.open(href, "tweet", "height=" + h + ",width=" + w + ",top=" + top + ",left=" + left + ",resizable=1");
}

module.exports = SocialController;